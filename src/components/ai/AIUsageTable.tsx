// src/components/ai/AIUsageTable.tsx
'use client';

import React, { useMemo } from 'react';
import { Search, ThumbsUp, ThumbsDown } from 'lucide-react';
import clsx from 'clsx';
import useAIAnalyticsStore from '@/store/ai-analytics-store';

// UserAIStats 인터페이스 (page.tsx에서 복사)
interface UserAIStats {
  userId: string;
  userName: string;
  chatCount: number;
  apiRequests: number;
  likes: number;
  dislikes: number;
  feedbackRatio: number;
}

interface AIUsageTableProps {
  users: UserAIStats[];
}

export default function AIUsageTable({ users }: AIUsageTableProps) {
  const { searchQuery, setSearchQuery } = useAIAnalyticsStore();

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId.includes(searchQuery)
    );
  }, [users, searchQuery]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      {/* 테이블 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* 좌측: 제목 + 설명 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">사용자별 AI 사용 통계</h3>
            <p className="text-sm text-gray-500">개별 사용자의 챗봇 이용 현황</p>
          </div>
          {/* 우측: 검색창 */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="사용자 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 text-sm"
              style={{ '--tw-ring-color': 'var(--primary)' } as React.CSSProperties} // CSS 변수 사용
            />
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">사용자 ID</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">이름</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-600">대화 건수</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-600">API 요청</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-600">좋아요</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-600">싫어요</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-600">만족도</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.userId} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-600">#{user.userId}</td>
                <td className="py-4 px-6 text-gray-900">{user.userName}</td>
                <td className="py-4 px-6 text-right text-gray-900">{user.chatCount.toLocaleString()}</td>
                <td className="py-4 px-6 text-right text-gray-900">{user.apiRequests.toLocaleString()}</td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900">{user.likes}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <ThumbsDown className="w-4 h-4 text-red-600" />
                    <span className="text-gray-900">{user.dislikes}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span
                    className={clsx(
                      'inline-flex px-3 py-1 rounded-full text-xs font-medium',
                      user.feedbackRatio >= 85
                        ? 'bg-green-100 text-green-700'
                        : user.feedbackRatio >= 75
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    )}
                  >
                    {user.feedbackRatio}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
