// src/app/(main)/users/page.tsx
import React from 'react';
import UserStats from '@/components/users/UserStats';
import UserFilterSearch from '@/components/users/UserFilterSearch';
import UserTable from '@/components/users/UserTable';
import UserHeader from '@/components/users/UserHeader';
import UserEditModal from '@/components/users/UserEditModal'; // UserEditModal 임포트
import type { User } from '@/types/user'; // 중앙 관리되는 User 타입 import

// 목업 데이터
const mockUsers: User[] = [
  { id: 1, name: '김민수', email: 'minsu.kim@example.com', age: 28, totalAsset: 12500000, joinDate: '2024-01-15', lastActive: '2025-11-28', status: 'active' },
  { id: 2, name: '이지은', email: 'jieun.lee@example.com', age: 34, totalAsset: 34000000, joinDate: '2023-05-20', lastActive: '2025-11-29', status: 'active' },
  { id: 3, name: '박준호', email: 'junho.park@example.com', age: 41, totalAsset: 78000000, joinDate: '2022-11-10', lastActive: '2025-11-27', status: 'inactive' },
  { id: 4, name: '최서연', email: 'seoyeon.choi@example.com', age: 25, totalAsset: 8900000, joinDate: '2024-03-01', lastActive: '2025-11-29', status: 'active' },
  { id: 5, name: '정우진', email: 'woojin.jeong@example.com', age: 39, totalAsset: 51000000, joinDate: '2023-01-05', lastActive: '2025-11-28', status: 'active' },
  { id: 6, name: '강나영', email: 'nayoung.kang@example.com', age: 31, totalAsset: 22000000, joinDate: '2024-02-14', lastActive: '2025-11-26', status: 'inactive' },
  { id: 7, name: '윤동혁', email: 'donghyuk.yoon@example.com', age: 47, totalAsset: 95000000, joinDate: '2022-07-07', lastActive: '2025-11-29', status: 'active' },
  { id: 8, name: '임수진', email: 'sujin.lim@example.com', age: 30, totalAsset: 18000000, joinDate: '2023-09-12', lastActive: '2025-11-28', status: 'active' },
];


export default function UsersPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. 헤더 영역 */}
      <UserHeader />

      {/* 2. 통계 카드 (StatCard 4개) */}
      <UserStats users={mockUsers} />

      {/* 3. 필터 및 검색 영역 */}
      <UserFilterSearch />

      {/* 4. 사용자 테이블 */}
      <UserTable users={mockUsers} />

      {/* 5. 편집 모달 */}
      <UserEditModal />
    </div>
  );
}
