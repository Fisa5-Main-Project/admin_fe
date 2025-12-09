// src/components/ai/charts/FeedbackDistributionChart.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { AiFeedbackData } from '@/types/ai'; // AiFeedbackData 타입 임포트

interface FeedbackDistributionChartProps {
  data: AiFeedbackData;
}

export default function FeedbackDistributionChart({ data }: FeedbackDistributionChartProps) {
  const totalFeedback = data.like + data.dislike;

  const chartData = [
    { name: '좋아요', value: data.like, color: 'var(--primary)' },
    { name: '싫어요', value: data.dislike, color: '#adb5bd' }, 
  ].filter(item => item.value > 0); // 값이 0보다 큰 항목만 필터링하여 렌더링 (차트 오작동 방지)

  // 툴팁 포맷터: 백분율로 표시
  const tooltipFormatter = (value: number, name: string, props: any) => {
    if (totalFeedback === 0) return [`0%`, name];
    const percentage = ((value / totalFeedback) * 100).toFixed(1);
    return [`${percentage}%`, name];
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">피드백 분포</h3>
        <p className="text-sm text-gray-500">사용자 만족도 현황</p>
      </div>
      <div className="flex items-center justify-between">
        {chartData.length > 0 ? (
          <>
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={tooltipFormatter}
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
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      {totalFeedback === 0 ? '0%' : `${((item.value / totalFeedback) * 100).toFixed(1)}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-[250px] text-gray-500">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
