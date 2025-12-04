// src/components/chat/ChatUserCardView.tsx
'use client';

import React, { useMemo } from 'react';
import useChatLogsStore from '@/store/chat-logs-store';
import { ChatUserStats } from '@/store/chat-logs-store';
import type { ApiError } from '@/types/api';

interface ChatUserCardViewProps {
  users: ChatUserStats[];
  error: ApiError | null;
}

export default function ChatUserCardView({ users, error }: ChatUserCardViewProps) {
  const { searchQuery, setSelectedUserId } = useChatLogsStore();

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchQuery) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center text-red-500">
        데이터를 불러오는 데 실패했습니다: {error.message}
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center text-gray-500">
        {searchQuery ? '검색 결과가 없습니다.' : '표시할 사용자가 없습니다.'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredUsers.map(user => (
        <div
          key={user.id}
          onClick={() => setSelectedUserId(user.id)}
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
        >
          {/* 상단: 아바타 + 정보 */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: 'linear-gradient(to bottom right, var(--primary), var(--primary-dark))' }}>
              <span className="text-lg">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="text-gray-900 font-medium">{user.name}</div>
              <div className="text-xs text-gray-500">ID: {user.id}</div>
            </div>
          </div>
          {/* 하단: 통계 그리드 */}
          <div className="grid grid-cols-2 gap-3"> {/* 3컬럼에서 2컬럼으로 변경 */}
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-1">대화 건수</div>
              <div className="text-gray-900 font-medium">{user.chatCount}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-1">마지막</div>
              <div className="text-gray-900 font-medium text-xs">{user.lastChatTime.split(' ')[1]?.substring(0, 5) ?? ''}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}