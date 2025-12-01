// src/components/chat/ChatConversationView.tsx
'use client';

import React, { useMemo } from 'react';
import useChatLogsStore from '@/store/chat-logs-store';
import { ChatLog, ChatUserStats } from '@/store/chat-logs-store'; // ChatLog, ChatUserStats 인터페이스 임포트

import ChatUserProfile from './ChatUserProfile'; // ChatUserProfile 임포트
import ChatLogCard from './ChatLogCard'; // ChatLogCard 임포트
import { MessageSquare } from 'lucide-react'; // 메시지 아이콘 임포트

interface ChatConversationViewProps {
  userId: string;
  mockChatLogs: ChatLog[]; // 전체 로그 데이터
  calculatedUserStats: ChatUserStats[]; // page.tsx에서 계산된 사용자 통계 데이터
}

export default function ChatConversationView({ userId, mockChatLogs, calculatedUserStats }: ChatConversationViewProps) {
  const { setSelectedUserId, filterDateRange, filterSortBy, searchQuery } = useChatLogsStore();

  const userLogs = useMemo(() => {
    // 1. 선택된 사용자의 로그만 필터링
    let logs = mockChatLogs.filter(log => log.userId === userId);

    // 2. 날짜 범위 필터링
    const now = new Date();
    logs = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      if (filterDateRange === 'today') {
        return logDate.toDateString() === now.toDateString();
      } else if (filterDateRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return logDate >= weekAgo;
      } else if (filterDateRange === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return logDate >= monthAgo;
      }
      return true; // 'all' 또는 다른 값일 경우 필터링 없음
    });

    // 3. 메시지 내용 검색
    if (searchQuery) {
      logs = logs.filter(log =>
        log.userMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.botResponse.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 4. 정렬
    logs.sort((a, b) => {
      if (filterSortBy === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (filterSortBy === 'oldest') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (filterSortBy === 'fastest') {
        return a.duration - b.duration;
      } else if (filterSortBy === 'slowest') {
        return b.duration - a.duration;
      }
      return 0;
    });

    return logs;
  }, [userId, mockChatLogs, filterDateRange, filterSortBy, searchQuery]);

  // 선택된 사용자의 통계 정보 찾기
  const selectedUserStats = calculatedUserStats.find(stats => stats.id === userId);

  if (!selectedUserStats) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
        <p className="text-gray-500">사용자 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">


      {/* 사용자 프로필 */}
      <ChatUserProfile userStats={selectedUserStats} />

      {/* 대화 로그 목록 */}
      <div className="space-y-4">
        {userLogs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">선택한 필터에 해당하는 대화가 없습니다</p>
          </div>
        ) : (
          userLogs.map(log => (
            <ChatLogCard key={log.id} log={log} />
          ))
        )}
      </div>
    </div>
  );
}
