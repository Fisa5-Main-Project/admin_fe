// 대시보드 > 자산 타입별 분포 (Pie Chart)
// src/components/dashboard/charts/AssetDistributionChart.tsx
'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { AssetDistributionData } from '@/types/dashboard';
import { getAssetTypeColor, getAssetTypeDisplayName } from '@/utils/dashboardHelpers';

interface AssetDistributionChartProps {
  data: AssetDistributionData[];
  totalAssetValue: number; // 총 자산 규모를 prop으로 받음
}

// 커스텀 범례(Legend) 컴포넌트
const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col justify-center space-y-3">
        {payload.map((entry: any, index: number) => (
          <li key={entry.name} className="flex items-center">
            {/* 색상 점 - getAssetTypeColor 함수 사용 */}
            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: getAssetTypeColor(entry.name) }} />
            {/* 이름 및 퍼센트 */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-900">{getAssetTypeDisplayName(entry.name)}</span>
              {/* 평균 자산 표시 */}
              <span className="text-xs text-gray-500">평균: {entry.average.toLocaleString()} ₩</span>
            </div>
          </li>
        ))}
      </ul>
    );
};


export default function AssetDistributionChart({ data, totalAssetValue }: AssetDistributionChartProps) {
  // 데이터가 없거나 로딩 중일 때 표시할 UI
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full flex justify-center items-center">
        <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 파이 차트 데이터 (비율 계산)
  const pieChartData = data.map(item => ({
    name: item.name,
    value: item.value, // BigDecimal을 number로 변환 (recharts용)
    average: item.average, // 평균도 number로 변환
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full focus:outline-none">
      {/* 헤더 */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900">자산 타입별 분포</h3>
        <p className="text-sm text-gray-500">총 자산 {totalAssetValue.toLocaleString()} ₩</p>
      </div>

      {/* 차트와 커스텀 범례 영역 */}
      <div className="grid grid-cols-2">
        {/* 파이 차트 */}
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getAssetTypeColor(entry.name)} stroke={getAssetTypeColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props: any) => [`${value.toLocaleString()} ₩`, getAssetTypeDisplayName(name)]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--gray-200)',
                borderRadius: '8px',
                fontSize: 'var(--text-sm)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* 커스텀 범례 */}
        <div className="flex items-center justify-center">
            <CustomLegend payload={pieChartData} />
        </div>
      </div>
    </div>
  );
}