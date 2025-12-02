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
import { AssetByAgeData } from '@/types/dashboard';

interface AverageAssetByAgeChartProps {
  data: AssetByAgeData[];
}

export default function AverageAssetByAgeChart({ data }: AverageAssetByAgeChartProps) {
  // 데이터가 없거나 로딩 중일 때 표시할 UI
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full flex justify-center items-center">
        <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  // Y축과 툴팁의 금액을 '억' 단위로 포맷하는 함수
  const formatCurrency = (value: number) => {
    if (value === 0) return '0';
    return `${(value / 100000000).toFixed(1)}억`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full focus:outline-none">
      {/* 헤더 */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900">연령대별 평균 자산</h3>
        <p className="text-sm text-gray-500">연령대별 자산 분포 현황</p>
      </div>

      {/* 차트 */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data.map(item => ({
            ...item,
            averageAsset: item.averageAsset, 
          }))}
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
            cursor={{ fill: 'rgba(0,0,0,0.05)' }} 
          />
          <Legend />
          <Bar
            dataKey="averageAsset"
            name="평균 자산"
            fill="#0099ff"
            radius={[8, 8, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
