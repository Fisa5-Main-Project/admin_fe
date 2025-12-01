// 대시보드 > 연령대별 평균 자산 (Bar Chart)
// src/components/dashboard/charts/AverageAssetByAgeChart.tsx
'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// PAGES_DOCUMENTATION.md에 명시된 목업 데이터
const averageAssetData = [
  { ageGroup: '20대', averageAsset: 40000000 },
  { ageGroup: '30대', averageAsset: 75000000 },
  { ageGroup: '40대', averageAsset: 120000000 },
  { ageGroup: '50대', averageAsset: 90000000 },
  { ageGroup: '60대+', averageAsset: 60000000 },
];

export default function AverageAssetByAgeChart() {
  // Y축과 툴팁의 금액을 '억' 단위로 포맷하는 함수
  const formatCurrency = (value: number) => {
    if (value === 0) return '0';
    return `${(value / 100000000).toFixed(1)}억`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
      {/* 헤더 */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900">연령대별 평균 자산</h3>
        <p className="text-sm text-gray-500">연령대별 자산 분포 현황</p>
      </div>

      {/* 차트 */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={averageAssetData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
          <XAxis dataKey="ageGroup" stroke="var(--gray-400)" fontSize="var(--text-xs)" />
          <YAxis
            stroke="var(--gray-400)"
            fontSize="var(--text-xs)"
            tickFormatter={formatCurrency}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), '평균 자산']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid var(--gray-200)',
              borderRadius: '8px',
              fontSize: 'var(--text-sm)',
            }}
            cursor={{ fill: 'var(--gray-50)' }}
          />
          <Legend />
          <Bar
            dataKey="averageAsset"
            name="평균 자산"
            fill="#0099ff"
            radius={[8, 8, 0, 0]} // 상단 모서리만 둥글게
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
