// src/components/common/StatCard.tsx
'use client';

import { ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';
import clsx from 'clsx';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  description: string;
}

export default function StatCard({ title, value, change, changeType, description }: StatCardProps) {
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

      {/* 값: 명세에 따라 h1 스타일(32px, 500)을 span에 적용 */}
      <div className="mb-3">
        <span className="text-gray-900 text-2xl font-medium">{value}</span>
      </div>

      {/* 변화율 */}
      <div className="flex items-center gap-2">
        <div
          className={clsx(
            'flex items-center gap-1 px-2 py-1 rounded-lg',
            isIncrease ? 'badge-increase' : 'badge-decrease'
          )}
        >
          {isIncrease ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span className="text-xs font-medium">{change}</span>
        </div>
        <span className="text-xs text-gray-500">{description}</span>
      </div>
    </div>
  );
}
