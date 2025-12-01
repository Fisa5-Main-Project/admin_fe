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

// DESIGN_SPECIFICATION_CHARTS.md에 명시된 목업 데이터
const assetDistributionData = [
  { name: '예금', value: 37.5, color: '#0099ff' },      // 메인 파란색
  { name: '투자', value: 26.7, color: '#43b4ff' },      // 보조 파란색
  { name: '부동산', value: 23.3, color: '#c7e8ff' },     // 밝은 파란색
  { name: '가상자산', value: 12.5, color: '#0064ff' },  // 진한 파란색
];

// 커스텀 범례(Legend) 컴포넌트
const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col justify-center space-y-3">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center">
            {/* 색상 점 */}
            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: entry.color }} />
            {/* 이름 및 퍼센트 */}
            <div className="flex flex-col">
              {/* 수정: entry.payload.name 대신 entry.name을 직접 사용합니다. */}
              <span className="text-sm text-gray-900">{entry.name}</span>
              <span className="text-xs text-gray-500">{entry.value.toFixed(1)}%</span>
            </div>
          </li>
        ))}
      </ul>
    );
};


export default function AssetDistributionChart() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
      {/* 헤더 */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900">자산 타입별 분포</h3>
        <p className="text-sm text-gray-500">총 자산 120,000,000,000 ₩</p>
      </div>

      {/* 차트와 커스텀 범례 영역 */}
      <div className="grid grid-cols-2">
        {/* 파이 차트 */}
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={assetDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {assetDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `${value.toFixed(1)}%`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--gray-200)',
                borderRadius: '8px',
                fontSize: 'var(--text-sm)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* 커스텀 범례 (수정: payload에 원본 데이터를 직접 전달) */}
        <div className="flex items-center justify-center">
            <CustomLegend payload={assetDistributionData} />
        </div>
      </div>
    </div>
  );
}