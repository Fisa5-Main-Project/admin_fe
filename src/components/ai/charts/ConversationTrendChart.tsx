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
import type { AiTrend } from '@/types/ai'; // AiTrend 타입 임포트

// 월 이름을 변환하기 위한 헬퍼 함수
const formatMonth = (dateString: string) => {
  const date = new Date(`${dateString}-01`);
  return date.toLocaleString('en-US', { month: 'short' });
};

interface ConversationTrendChartProps {
  data: AiTrend[];
}

export default function ConversationTrendChart({ data }: ConversationTrendChartProps) {
  // API 데이터를 Recharts에 맞게 변환
  const chartData = data.map(item => ({
    month: formatMonth(item.date),
    chats: item.user_chats,
    apis: item.api_calls,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">대화 및 API 요청 추이</h3>
        <p className="text-sm text-gray-500">월별 사용량 통계</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
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
