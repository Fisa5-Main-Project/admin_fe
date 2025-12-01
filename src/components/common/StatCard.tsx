// src/components/common/StatCard.tsx
'use client';

import { ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';
import clsx from 'clsx';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  change?: string; // (옵션) 변화율 값 (e.g., '+14.2%')
  changeType?: 'increase' | 'decrease'; // (옵션) 변화 타입
  descriptionColor?: 'gray' | 'green' | 'red'; // (옵션) 설명 텍스트 색상
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  description, 
  descriptionColor = 'gray' // 기본값은 회색
}: StatCardProps) {
  const isIncrease = changeType === 'increase';

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">{title}</span>
        <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* 값 */}
      <div className="mb-3">
        <span className="text-gray-900 text-2xl font-medium">{value}</span>
      </div>

      {/* 하단 설명: 'change' prop의 존재 여부에 따라 조건부 렌더링 */}
      {change ? (
        // 변화율 배지 모드 (대시보드 페이지용)
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              'flex items-center gap-1 px-2 py-1 rounded-lg',
              isIncrease ? 'badge-increase' : 'badge-decrease'
            )}
          >
            {isIncrease ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs font-medium">{change}</span>
          </div>
          <span className="text-xs text-gray-500">{description}</span>
        </div>
      ) : (
        // 단순 텍스트 설명 모드 (사용자 관리 페이지용)
        <div
          className={clsx(
            "text-xs font-medium",
            {
              'text-gray-500': descriptionColor === 'gray',
              'text-green-600': descriptionColor === 'green',
              'text-red-600': descriptionColor === 'red',
            }
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
