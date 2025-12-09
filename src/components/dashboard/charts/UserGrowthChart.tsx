// 대시보드 > 사용자 증가 추이 (Area Chart)
// src/components/dashboard/charts/UserGrowthChart.tsx
'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { UserGrowthData } from '@/types/dashboard';

interface UserGrowthChartProps {
  data: UserGrowthData[];
}

export default function UserGrowthChart({ data }: UserGrowthChartProps) {
  // 데이터가 없거나 로딩 중일 때 표시할 UI
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full flex justify-center items-center">
        <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full focus:outline-none" tabIndex={-1}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">사용자 증가 추이</h3>
          <p className="text-sm text-gray-500">총 가입자 및 신규 가입자</p>
        </div>
        {/* Select 옵션 명세에 맞게 수정 */}
        <select className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All accounts</option>
          <option>Active only</option>
        </select>
      </div>

      {/* 차트 */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            {/* 총 가입자 수 그라데이션 (ID 및 색상 헥스 코드로 수정) */}
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0099ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0099ff" stopOpacity={0} />
            </linearGradient>
            {/* 신규 가입자 수 그라데이션 (ID 및 색상 헥스 코드로 수정) */}
            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} /> {/* 색상 초록색으로 변경 */}
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} /> {/* 색상 초록색으로 변경 */}
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
          <XAxis dataKey="month" stroke="var(--gray-400)" fontSize="var(--text-xs)" />
          <YAxis stroke="var(--gray-400)" fontSize="var(--text-xs)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid var(--gray-200)',
              borderRadius: '8px', // 명세서에는 8px, 코드에는 12px였음. 8px로 수정
              fontSize: 'var(--text-sm)',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="users" // dataKey를 'users'로 수정
            name="총 가입자"
            stroke="#0099ff" // 색상을 헥스 코드로 수정
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUsers)"
          />
          <Area
            type="monotone"
            dataKey="newUsers"
            name="신규 가입자"
            stroke="#10B981" // 색상을 초록색으로 변경
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorNew)"
          />        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
