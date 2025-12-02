// src/app/(main)/users/page.tsx
import React from 'react';
import UserStats from '@/components/users/UserStats';
import UserFilterSearch from '@/components/users/UserFilterSearch';
import UserTable from '@/components/users/UserTable';
import UserHeader from '@/components/users/UserHeader';
import UserEditModal from '@/components/users/UserEditModal';
import type { User } from '@/types/user';
import { getUsers } from '@/api/users';

export default async function UsersPage() {
  const usersRes = await getUsers();
  
  const users: User[] = usersRes.isSuccess ? usersRes.data : [];

  return (
    <div className="flex flex-col gap-8">
      {/* 1. 헤더 영역 */}
      <UserHeader />

      {/* 2. 통계 카드 (StatCard 4개) */}
      <UserStats users={users} />

      {/* 3. 필터 및 검색 영역 */}
      <UserFilterSearch />

      {/* 4. 사용자 테이블 */}
      <UserTable users={users} />

      {/* 5. 편집 모달 */}
      <UserEditModal />
    </div>
  );
}
