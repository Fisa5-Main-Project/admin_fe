// src/components/chat/ChatUserProfile.tsx
'use client';

import React from 'react';
import useChatLogsStore from '@/store/chat-logs-store';
import { ChatUserStats } from '@/store/chat-logs-store';

interface ChatUserProfileProps {
  userStats: ChatUserStats;
}

export default function ChatUserProfile({ userStats }: ChatUserProfileProps) {
  const { setSelectedUserId } = useChatLogsStore();

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => setSelectedUserId(null)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors self-start mb-4"
      >
        <span>←</span>
        <span>사용자 목록으로 돌아가기</span>
      </button>

      {/* 사용자 정보 영역 */}
      <div className="flex items-center gap-4">
        {/* 아바타 */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-medium" style={{ background: 'linear-gradient(to bottom right, var(--primary), var(--primary-dark))' }}>
          {userStats.name.charAt(0)}
        </div>
        {/* 이름 & ID */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{userStats.name}</h2>
          <p className="text-sm text-gray-500">User ID: {userStats.id}</p>
        </div>
        {/* 통계 3개 */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500 mb-1">총 대화</div>
            <div className="text-lg font-medium text-gray-900">{userStats.chatCount}건</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">평균 응답</div>
            <div className="text-lg font-medium text-gray-900">{userStats.avgDuration.toFixed(1)}초</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">마지막 대화</div>
            <div className="text-lg font-medium text-gray-900 text-xs">{userStats.lastChatTime.split(' ')[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
