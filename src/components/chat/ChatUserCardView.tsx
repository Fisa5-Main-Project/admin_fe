// src/components/chat/ChatUserCardView.tsx
'use client';

import React, { useMemo } from 'react';
import useChatLogsStore from '@/store/chat-logs-store';
import { ChatUserStats } from '@/store/chat-logs-store'; // ChatUserStats 임포트

interface ChatUserCardViewProps {
  users: ChatUserStats[];
}

export default function ChatUserCardView({ users }: ChatUserCardViewProps) {
  const { searchQuery, setSelectedUserId } = useChatLogsStore();

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

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
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-1">대화 건수</div>
              <div className="text-gray-900 font-medium">{user.chatCount}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-1">평균 응답</div>
              <div className="text-gray-900 font-medium">{user.avgDuration.toFixed(1)}초</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-1">마지막</div>
              <div className="text-gray-900 font-medium text-xs">{user.lastChatTime.split(' ')[1].substring(0, 5)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}