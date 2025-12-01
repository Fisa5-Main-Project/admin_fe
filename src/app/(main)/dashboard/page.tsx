// src/app/(main)/dashboard/page.tsx
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCard from '@/components/common/StatCard';
import UserGrowthChart from '@/components/dashboard/charts/UserGrowthChart';
import DauChart from '@/components/dashboard/charts/DauChart';
import AssetDistributionChart from '@/components/dashboard/charts/AssetDistributionChart';
import AverageAssetByAgeChart from '@/components/dashboard/charts/AverageAssetByAgeChart';
import DetailedAssetTable from '@/components/dashboard/DetailedAssetTable';

export default function DashboardPage() {
  // StatCard 컴포넌트에 전달할 목업 데이터
  const statCardsData = [
    {
      title: '총 가입자 수',
      value: '3,900',
      change: '+14.2%',
      changeType: 'increase' as const,
      description: 'vs 지난 달',
    },
    {
      title: '일일 활성 사용자',
      value: '2,100',
      change: '+8.3%',
      changeType: 'increase' as const,
      description: 'vs 지난 달',
    },
    {
      title: '신규 가입자 (이번 달)',
      value: '550',
      change: '+12.1%',
      changeType: 'increase' as const,
      description: 'vs 지난 달',
    },
    {
      title: '총 자산 규모',
      value: '120,000,000,000 ₩', // 디자인 명세의 데이터 포맷 규칙 적용
      change: '+5.7%',
      changeType: 'increase' as const,
      description: 'vs 지난 달',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* 대시보드 헤더 컴포넌트 */}
      <DashboardHeader />

      

      {/* 주요 지표 - StatCard 4개 */}
      {/* DESIGN_SPECIFICATION.md의 Grid 레이아웃 (1열 -> 2열 -> 4열) 적용 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCardsData.map((data, index) => (
          <StatCard
            key={index}
            title={data.title}
            value={data.value}
            change={data.change}
            changeType={data.changeType}
            description={data.description}
          />
        ))}
      </div>

      {/* TODO: DESIGN_SPECIFICATION.md에 따라 차트 및 테이블 컴포넌트 추가 */}
      {/* 차트 영역 (행 1): 사용자 증가 추이 및 DAU 차트 */}
      {/* DESIGN_SPECIFICATION.md의 Grid 레이아웃 (1열 -> 2열) 적용 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UserGrowthChart />
        <DauChart />
      </div>

      {/* 차트 영역 (행 2): 자산 타입별 분포 및 연령대별 평균 자산 */}
      {/* DESIGN_SPECIFICATION.md의 Grid 레이아웃 (1열 -> 2열) 적용 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AssetDistributionChart />
        <AverageAssetByAgeChart />
      </div>

      {/* 자산 타입별 상세 통계 테이블 */}
      <DetailedAssetTable />
    </div>
  );
}