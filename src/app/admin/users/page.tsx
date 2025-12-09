// src/app/(main)/users/page.tsx
import React from 'react';
import UserStats from '@/components/users/UserStats';
import UserFilterSearch from '@/components/users/UserFilterSearch';
import UserTable from '@/components/users/UserTable';
import UserHeader from '@/components/users/UserHeader';
import UserEditModal from '@/components/users/UserEditModal'; 
import type { User } from '@/types/user';
import { getUsers } from '@/api/users';
import { getStatCardsData } from '@/api/dashboard'; // 대시보드 API 임포트
import type { StatCardData } from '@/types/dashboard';

export default async function UsersPage() {
  const [usersRes, statCardsRes] = await Promise.all([
    getUsers(),
    getStatCardsData(), // 통계 카드 데이터 API 호출
  ]);
  
  const users: User[] = usersRes.isSuccess && usersRes.data ? usersRes.data : [];
  const usersError = usersRes.isSuccess ? null : usersRes.error;
  
  const statCards: StatCardData[] = statCardsRes.isSuccess && statCardsRes.data ? statCardsRes.data : [];

  return (
    <div className="flex flex-col gap-8">
      {/* 1. 헤더 영역 */}
      <UserHeader />

      {/* 2. 통계 카드 (StatCard 4개) */}
      <UserStats stats={statCards} />

      {/* 3. 필터 및 검색 영역 */}
      <UserFilterSearch />

      {/* 4. 사용자 테이블 */}
      <UserTable users={users} error={usersError} />

      {/* 5. 편집 모달 */}
      <UserEditModal />
    </div>
  );
}
