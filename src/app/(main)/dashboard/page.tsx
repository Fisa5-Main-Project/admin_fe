// src/app/(main)/dashboard/page.tsx
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCard from '@/components/common/StatCard';
import UserGrowthChart from '@/components/dashboard/charts/UserGrowthChart';
import DauChart from '@/components/dashboard/charts/DauChart';
import AssetDistributionChart from '@/components/dashboard/charts/AssetDistributionChart';
import AverageAssetByAgeChart from '@/components/dashboard/charts/AverageAssetByAgeChart';
import DetailedAssetTable from '@/components/dashboard/DetailedAssetTable';
import {
  getStatCardsData,
  getUserGrowthData,
  getDauData,
  getAssetDistributionData,
  getAverageAssetByAgeData,
  getDetailedAssetData,
} from '@/api/dashboard';
import { formatCurrency, formatPercentage } from '@/utils/dashboardHelpers';
import {
  StatCardData,
  UserGrowthData,
  AssetDistributionData,
  AssetByAgeData,
  DetailedAssetData,
} from '@/types/dashboard';

export default async function DashboardPage() {
  // 서버 컴포넌트에서 직접 데이터 페칭
  const [
    statCardsRes,
    userGrowthRes,
    dauRes,
    assetDistributionRes,
    averageAssetByAgeRes,
    detailedAssetRes,
  ] = await Promise.all([
    getStatCardsData(),
    getUserGrowthData(),
    getDauData(),
    getAssetDistributionData(),
    getAverageAssetByAgeData(),
    getDetailedAssetData(),
  ]);

  // API 응답 처리: isSuccess가 true이면 data를, 아니면 빈 배열을 사용
  const statCardsData: StatCardData[] = statCardsRes.isSuccess ? statCardsRes.data : [];
  const userGrowthData: UserGrowthData[] = userGrowthRes.isSuccess ? userGrowthRes.data : [];
  const dauData: UserGrowthData[] = dauRes.isSuccess ? dauRes.data : [];
  const assetDistributionData: AssetDistributionData[] = assetDistributionRes.isSuccess ? assetDistributionRes.data : [];
  const averageAssetByAgeData: AssetByAgeData[] = averageAssetByAgeRes.isSuccess ? averageAssetByAgeRes.data : [];
  const detailedAssetData: DetailedAssetData[] = detailedAssetRes.isSuccess ? detailedAssetRes.data : [];

  // 총 자산 규모를 AssetDistributionChart에 전달하기 위해 찾음
  const totalAssetCard = statCardsData.find(card => card.title === '총 자산 규모');
  const totalAssetValue = totalAssetCard ? totalAssetCard.value : 0;

  return (
    <div className="flex flex-col gap-8">
      {/* 대시보드 헤더 컴포넌트 */}
      <DashboardHeader />

      {/* 주요 지표 - StatCard 4개 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCardsData.map((data, index) => (
          <StatCard
            key={data.title}
            title={data.title}
            value={formatCurrency(data.value)}
            change={formatPercentage(data.change)}
            changeType={data.changeType}
            description={data.description}
          />
        ))}
      </div>

      {/* 차트 영역 (행 1): 사용자 증가 추이 및 DAU 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UserGrowthChart data={userGrowthData} />
        <DauChart data={dauData} />
      </div>

      {/* 차트 영역 (행 2): 자산 타입별 분포 및 연령대별 평균 자산 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AssetDistributionChart data={assetDistributionData} totalAssetValue={totalAssetValue} />
        <AverageAssetByAgeChart data={averageAssetByAgeData} />
      </div>

      {/* 자산 타입별 상세 통계 테이블 */}
      <DetailedAssetTable data={detailedAssetData} />
    </div>
  );
}