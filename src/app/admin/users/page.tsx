// src/app/(main)/users/page.tsx
import React from 'react';
import UserStats from '@/components/users/UserStats';
import UserFilterSearch from '@/components/users/UserFilterSearch';
import UserTable from '@/components/users/UserTable';
import UserHeader from '@/components/users/UserHeader';
import UserEditModal from '@/components/users/UserEditModal'; 
import type { User } from '@/types/user'; // 중앙 관리되는 User 타입 import
import { getUsers } from '@/api/users';

export default async function UsersPage() {
  const usersRes = await getUsers();
  
  // --- 디버깅 로그 추가 ---
  // console.log("사용자 API 응답:", JSON.stringify(usersRes, null, 2));
  
  const users: User[] = usersRes.isSuccess && usersRes.data ? usersRes.data : [];
  const usersError = usersRes.isSuccess ? null : usersRes.error;

  return (
    <div className="flex flex-col gap-8">
      {/* 1. 헤더 영역 */}
      <UserHeader />

      {/* 2. 통계 카드 (StatCard 4개) */}
      <UserStats users={users} />

      {/* 3. 필터 및 검색 영역 */}
      <UserFilterSearch />

      {/* 4. 사용자 테이블 */}
      <UserTable users={users} error={usersError} />

      {/* 5. 편집 모달 */}
      <UserEditModal />
    </div>
  );
}
