'use client';

import React, { useMemo } from 'react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import useUserStore from '@/store/user-store';
import type { User } from '@/types/user';
import type { ApiError } from '@/types/api'; // ApiError 타입 임포트

interface UserTableProps {
  users: User[];
  error: ApiError | null; // 에러 객체 또는 null을 받도록 수정
}

export default function UserTable({ users, error }: UserTableProps) {
  const { searchQuery, filterStatus, openEditModal } = useUserStore();

  const filteredUsers = useMemo(() => {
    if (!users) return []; // users가 null 또는 undefined일 경우 빈 배열 반환
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const statusMap: { [key: string]: User['status'] | '전체' } = { '전체': '전체', '활성': 'active', '비활성': 'inactive' };
      const matchesStatus = filterStatus === '전체' || user.status === statusMap[filterStatus];
      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, filterStatus]);

  const handleDelete = (userId: number) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      console.log('Deleting user:', userId);
      alert(`사용자 ID ${userId} 삭제 (개발 모드)`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
      <table className="w-full">
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
        <tbody>
          {error ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-red-500">
                데이터를 불러오는 데 실패했습니다: {error.message}
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                {searchQuery ? '검색 결과가 없습니다.' : '표시할 사용자가 없습니다.'}
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-700">{user.age}세</td>
                <td className="py-4 px-6 text-right font-medium text-gray-900">
                  {user.totalAsset ? user.totalAsset.toLocaleString() : '0'} ₩
                </td>
                <td className="py-4 px-6 text-gray-700">{user.joinDate}</td>
                <td className="py-4 px-6 text-gray-700">{user.lastActive}</td>
                <td className="py-4 px-6 text-center">
                  <span className={clsx('inline-flex px-3 py-1 rounded-full text-xs font-medium', user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700')}>
                    {user.status === 'active' ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" title="상세보기" onClick={() => console.log('View user:', user.id)}>
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-primary hover:bg-light transition-colors" title="수정" onClick={() => openEditModal(user)}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-50 transition-colors" title="삭제" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
