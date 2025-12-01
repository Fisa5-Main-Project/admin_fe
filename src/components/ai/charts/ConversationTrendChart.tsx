// src/components/ai/charts/ConversationTrendChart.tsx
'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// DESIGN_SPECIFICATION_AI.md 기반 목업 데이터
const chatTrendData = [
  { month: 'Jun', chats: 1200, apis: 7500 },
  { month: 'Jul', chats: 1450, apis: 8900 },
  { month: 'Aug', chats: 1680, apis: 10200 },
  { month: 'Sep', chats: 1890, apis: 11500 },
  { month: 'Oct', chats: 2100, apis: 12800 },
  { month: 'Nov', chats: 2380, apis: 14300 },
];

export default function ConversationTrendChart() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">대화 및 API 요청 추이</h3>
        <p className="text-sm text-gray-500">월별 사용량 통계</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chatTrendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
          <XAxis dataKey="month" stroke="var(--gray-400)" fontSize="var(--text-xs)" />
          <YAxis stroke="var(--gray-400)" fontSize="var(--text-xs)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid var(--gray-200)',
              borderRadius: '8px',
              fontSize: 'var(--text-sm)',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 'var(--text-sm)' }} />
          <Line
            type="monotone"
            dataKey="chats"
            stroke="var(--primary)"
            strokeWidth={2}
            name="대화 건수"
          />
          <Line
            type="monotone"
            dataKey="apis"
            stroke="var(--secondary)"
            strokeWidth={2}
            name="API 요청"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
