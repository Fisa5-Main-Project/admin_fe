// src/components/chat/ChatFilterModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import useChatLogsStore from '@/store/chat-logs-store';

type DateRange = 'all' | 'today' | 'week' | 'month';
type SortBy = 'newest' | 'oldest' | 'fastest' | 'slowest';

export default function ChatFilterModal() {
  const { isFilterModalOpen, filterDateRange, filterSortBy, setFilterDateRange, setFilterSortBy, toggleFilterModal, resetFilters: storeResetFilters } = useChatLogsStore();

  const [localDateRange, setLocalDateRange] = useState<DateRange>(filterDateRange);
  const [localSortBy, setLocalSortBy] = useState<SortBy>(filterSortBy);

  // 스토어 상태 변경 시 로컬 상태 업데이트
  useEffect(() => {
    setLocalDateRange(filterDateRange);
    setLocalSortBy(filterSortBy);
  }, [filterDateRange, filterSortBy]);

  // 모달이 열려있지 않으면 아무것도 렌더링하지 않습니다.
  if (!isFilterModalOpen) return null;

  const handleApplyFilters = () => {
    setFilterDateRange(localDateRange);
    setFilterSortBy(localSortBy);
    toggleFilterModal();
  };

  const handleResetFilters = () => {
    setLocalDateRange('all');
    setLocalSortBy('newest');
    // 스토어 상태도 초기화 (적용 버튼 클릭 시 반영)
    storeResetFilters();
  };

  const dateRangeOptions: { value: DateRange; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'today', label: '오늘' },
    { value: 'week', label: '최근 7일' },
    { value: 'month', label: '최근 30일' },
  ];

  const sortByOptions: { value: SortBy; label: string }[] = [
    { value: 'newest', label: '최신 순' },
    { value: 'oldest', label: '오래된 순' },
    { value: 'fastest', label: '빠른 응답 순' },
    { value: 'slowest', label: '느린 응답 순' },
  ];

  return (
    // 오버레이
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={toggleFilterModal}
    >
      {/* 모달 카드 */}
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 이벤트 전파 중단
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">필터 설정</h2>
          <button
            onClick={toggleFilterModal}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 날짜 범위 필터 */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-3 block">날짜 범위</label>
          <div className="grid grid-cols-2 gap-3">
            {dateRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLocalDateRange(option.value)}
                className={clsx(
                  'px-4 py-3 rounded-xl transition-colors font-medium',
                  localDateRange === option.value
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 정렬 기준 필터 */}
        <div className="mb-8">
          <label className="text-sm text-gray-600 mb-3 block">정렬 기준</label>
          <div className="space-y-2">
            {sortByOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLocalSortBy(option.value)}
                className={clsx(
                  'w-full text-left px-4 py-3 rounded-xl transition-colors font-medium',
                  localSortBy === option.value
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleResetFilters}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
          >
            초기화
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 px-4 py-3 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-dark))' }}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
