// src/components/chat/ChatFilterSearch.tsx
'use client';

import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import clsx from 'clsx';
import useChatLogsStore from '@/store/chat-logs-store';

export default function ChatFilterSearch() {
  const {
    selectedUserId,
    searchQuery,
    setSearchQuery,
    filterDateRange,
    setFilterDateRange,
    filterSortBy,
    setFilterSortBy,
    toggleFilterModal,
    resetFilters,
  } = useChatLogsStore();

  const isFilterActive = filterDateRange !== 'all' || filterSortBy !== 'newest';

  // 날짜 범위 배지 텍스트 맵핑
  const dateRangeText: { [key: string]: string } = {
    all: '전체',
    today: '오늘',
    week: '최근 7일',
    month: '최근 30일',
  };

  // 정렬 기준 배지 텍스트 맵핑
  const sortByText: { [key: string]: string } = {
    newest: '최신 순',
    oldest: '오래된 순',
    fastest: '빠른 응답순',
    slowest: '느린 응답순',
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* 검색창 */}
        <div className="flex-1 relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={
              selectedUserId ? '대화 내용으로 검색...' : '사용자 ID, 이름으로 검색...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            style={{ '--tw-ring-color': 'var(--primary)' } as React.CSSProperties}
          />
        </div>

        {/* 필터 버튼 (대화 로그 뷰에서만 표시) */}
        {selectedUserId && (
          <button
            onClick={toggleFilterModal}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors relative"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden md:inline">필터</span>
            {isFilterActive && (
              <span
                className="absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--primary)' }}
              ></span>
            )}
          </button>
        )}
      </div>

      {/* 활성 필터 배지 영역 (필터가 적용되었을 때만 표시) */}
      {selectedUserId && isFilterActive && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          {/* 날짜 범위 배지 */}
          {filterDateRange !== 'all' && (
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--light)', color: 'var(--primary-dark)' }}
            >
              <span>{dateRangeText[filterDateRange]}</span>
              <button
                onClick={() => setFilterDateRange('all')}
                className="text-current"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {/* 정렬 기준 배지 */}
          {filterSortBy !== 'newest' && (
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--light)', color: 'var(--primary-dark)' }}
            >
              <span>{sortByText[filterSortBy]}</span>
              <button
                onClick={() => setFilterSortBy('newest')}
                className="text-current"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {/* 필터 초기화 버튼 */}
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            초기화
          </button>
        </div>
      )}
    </div>
  );
}
