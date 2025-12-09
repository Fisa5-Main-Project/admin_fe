// src/components/users/UserStats.tsx
import React from 'react';
import StatCard from '@/components/common/StatCard';
import type { StatCardData } from '@/types/dashboard'; // 대시보드 타입 임포트
import { formatCurrency, formatPercentage } from '@/utils/dashboardHelpers';

interface UserStatsProps {
  stats: StatCardData[]; // props를 StatCardData 배열로 변경
}

export default function UserStats({ stats }: UserStatsProps) {
  // 클라이언트 측 계산 로직 제거

  // API에서 받은 데이터를 직접 사용
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={
            // 대시보드와 동일한 포맷팅 로직 적용
            stat.title === '총 자산 규모'
              ? formatCurrency(stat.value)
              : stat.value.toLocaleString()
          }
          change={formatPercentage(stat.change)}
          changeType={stat.changeType}
          description={stat.description}
        />
      ))}
    </div>
  );
}
