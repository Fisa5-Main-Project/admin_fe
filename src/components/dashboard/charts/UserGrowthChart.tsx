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

// DESIGN_SPECIFICATION_CHARTS.md에 명시된 목업 데이터
export const userGrowthData = [
  { month: 'Jan', users: 1200, newUsers: 150, dau: 800 },
  { month: 'Feb', users: 1450, newUsers: 250, dau: 920 },
  { month: 'Mar', users: 1850, newUsers: 400, dau: 1100 },
  { month: 'Apr', users: 2300, newUsers: 450, dau: 1350 },
  { month: 'May', users: 2800, newUsers: 500, dau: 1600 },
  { month: 'Jun', users: 3350, newUsers: 550, dau: 1850 },
  { month: 'Jul', users: 3900, newUsers: 550, dau: 2100 },
];

export default function UserGrowthChart() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
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
          data={userGrowthData}
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
              <stop offset="5%" stopColor="#43b4ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#43b4ff" stopOpacity={0} />
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
            stroke="#43b4ff" // 색상을 헥스 코드로 수정
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorNew)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
