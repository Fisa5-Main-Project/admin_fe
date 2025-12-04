// src/components/users/UserFilterSearch.tsx
'use client';

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import clsx from 'clsx';
import useUserStore from '@/store/user-store'; // Zustand 스토어 임포트

const filterTabs = ['전체', '활성', '비활성'];

export default function UserFilterSearch() {
  // 로컬 useState 대신 Zustand 스토어에서 상태와 액션을 가져옵니다.
  const { searchQuery, setSearchQuery, filterStatus, setFilterStatus } = useUserStore();

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col md:flex-row items-center gap-4">
      {/* 검색창 */}
      <div className="flex-1 relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="사용자 이름 또는 ID로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      {/* 필터 버튼 */}
      <div className="flex items-center gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={clsx(
              'px-4 py-3 rounded-xl font-medium transition-colors',
              filterStatus === tab
                ? 'bg-[var(--primary)] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            )}
          >
            {tab}
          </button>
        ))}
        <button className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
