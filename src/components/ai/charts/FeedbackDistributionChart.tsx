// src/components/ai/charts/FeedbackDistributionChart.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// DESIGN_SPECIFICATION_AI.md 기반 목업 데이터
const feedbackDistribution = [
  { name: '매우 좋음', value: 45, color: 'var(--primary)' },
  { name: '좋음', value: 35, color: 'var(--secondary)' },
  { name: '보통', value: 15, color: 'var(--light)' },
  { name: '나쁨', value: 5, color: '#adb5bd' }, // Tailwind gray-400
];

export default function FeedbackDistributionChart() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">피드백 분포</h3>
        <p className="text-sm text-gray-500">사용자 만족도 현황</p>
      </div>
      <div className="flex items-center justify-between">
        <ResponsiveContainer width="50%" height={250}>
          <PieChart>
            <Pie
              data={feedbackDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {feedbackDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `${value}%`}
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
        <div className="w-1/2 flex flex-col items-start justify-center space-y-3 pl-4">
          {feedbackDistribution.map((item, index) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex flex-col">
                <div className="text-sm text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">{item.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
