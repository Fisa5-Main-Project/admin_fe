// src/components/users/UserStats.tsx
import React from 'react';
import StatCard from '@/components/common/StatCard';
import type { User } from '@/types/user';

interface UserStatsProps {
  users: User[];
}

export default function UserStats({ users }: UserStatsProps) {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = totalUsers - activeUsers;
  const totalAssets = users.reduce((acc, user) => acc + user.totalAsset, 0);
  const averageAsset = totalUsers > 0 ? Math.round(totalAssets / totalUsers) : 0;

  const stats = [
    {
      title: '전체 사용자',
      value: totalUsers.toLocaleString(),
      description: '총 가입자',
      descriptionColor: 'gray' as const,
    },
    {
      title: '활성 사용자',
      value: activeUsers.toLocaleString(),
      description: 'Active',
      descriptionColor: 'green' as const,
    },
    {
      title: '비활성 사용자',
      value: inactiveUsers.toLocaleString(),
      description: 'Inactive',
      descriptionColor: 'red' as const,
    },
    {
      title: '평균 자산',
      value: `${averageAsset.toLocaleString()} ₩`,
      description: '사용자당',
      descriptionColor: 'gray' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          descriptionColor={stat.descriptionColor}
        />
      ))}
    </div>
  );
}
