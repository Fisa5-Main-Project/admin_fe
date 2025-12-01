// 대시보드 > 일일 활성 사용자 (DAU) (Bar Chart)
// src/components/dashboard/charts/DauChart.tsx
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
// UserGrowthChart에서 사용하는 동일한 목업 데이터를 가져옵니다.
import { userGrowthData } from './UserGrowthChart'; // userGrowthData는 AreaChart에서 내보내야 합니다.

export default function DauChart() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full focus:outline-none">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">일일 활성 사용자 (DAU)</h3>
          <p className="text-sm text-gray-500">월별 평균 활성 사용자</p>
        </div>
        {/* Select 옵션 명세에 맞게 추가 */}
        <select className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
          <option>This year</option>
          <option>Last year</option>
        </select>
      </div>

      {/* 차트 */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={userGrowthData} // UserGrowthChart와 동일한 데이터 사용
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
          <XAxis dataKey="month" stroke="var(--gray-400)" fontSize="var(--text-xs)" />
          <YAxis stroke="var(--gray-400)" fontSize="var(--text-xs)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid var(--gray-200)',
              borderRadius: '8px', // 명세에 맞게 8px로 수정
              fontSize: 'var(--text-sm)',
            }}
            cursor={{ fill: 'var(--gray-50)' }}
          />
          <Legend />
          <Bar
            dataKey="dau" // dataKey는 'dau' 사용
            name="DAU"
            fill="#0099ff" // 명세에 맞게 헥스 코드로 수정
            radius={[8, 8, 0, 0]} // 상단 모서리만 둥글게
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
