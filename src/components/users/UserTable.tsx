'use client';

import React, { useMemo } from 'react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import useUserStore from '@/store/user-store'; // Zustand 스토어 임포트
import type { User } from '@/types/user'; // 중앙 관리되는 User 타입 import

interface UserTableProps {
  users: User[]; // mockUsers를 props로 받음
}

export default function UserTable({ users }: UserTableProps) {
  // Zustand 스토어에서 검색어, 필터 상태, 모달 액션을 가져옵니다.
  const { searchQuery, filterStatus, openEditModal } = useUserStore();

  // 검색어와 필터 상태에 따라 사용자 목록을 필터링합니다.
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const statusMap: { [key: string]: User['status'] | '전체' } = {
        '전체': '전체',
        '활성': 'active',
        '비활성': 'inactive'
      };

      const matchesStatus = filterStatus === '전체' || user.status === statusMap[filterStatus];

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, filterStatus]); // users가 변경될 때도 다시 필터링

  // 사용자 삭제 처리 함수
  const handleDelete = (userId: number) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      console.log('Deleting user:', userId);
      // TODO: 실제 API 호출 및 UI 업데이트 로직 추가
      alert(`사용자 ID ${userId} 삭제 (개발 모드)`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
      <table className="w-full">
        {/* 테이블 헤더 */}
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">사용자</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">연령</th>
            <th className="text-right py-4 px-6 text-sm font-medium text-gray-600">총 자산</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">가입일</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">최근 활동</th>
            <th className="text-center py-4 px-6 text-sm font-medium text-gray-600">상태</th>
            <th className="text-center py-4 px-6 text-sm font-medium text-gray-600">작업</th>
          </tr>
        </thead>
        {/* 테이블 바디 */}
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
              {/* 사용자 정보 */}
              <td className="py-4 px-6">
                <div className="flex flex-col">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </td>
              {/* 연령 */}
              <td className="py-4 px-6 text-gray-700">{user.age}세</td>
              {/* 총 자산 */}
              <td className="py-4 px-6 text-right font-medium text-gray-900">
                {user.totalAsset ? user.totalAsset.toLocaleString() : '0'} ₩
              </td>
              {/* 가입일 */}
              <td className="py-4 px-6 text-gray-700">{user.joinDate}</td>
              {/* 최근 활동 */}
              <td className="py-4 px-6 text-gray-700">{user.lastActive}</td>
              {/* 상태 배지 */}
              <td className="py-4 px-6 text-center">
                <span
                  className={clsx(
                    'inline-flex px-3 py-1 rounded-full text-xs font-medium',
                    user.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  )}
                >
                  {user.status === 'active' ? '활성' : '비활성'}
                </span>
              </td>
              {/* 작업 버튼 */}
              <td className="py-4 px-6">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                    title="상세보기"
                    // TODO: 상세보기 모달/페이지 연결
                    onClick={() => console.log('View user:', user.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-primary hover:bg-light transition-colors"
                    title="수정"
                    onClick={() => openEditModal(user)} // 모달 열기 액션 연결
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    title="삭제"
                    onClick={() => handleDelete(user.id)} // 삭제 액션 연결
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
