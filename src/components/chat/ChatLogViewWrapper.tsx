// src/components/chat/ChatLogViewWrapper.tsx
'use client';

import React from 'react';
import useChatLogsStore from '@/store/chat-logs-store';
import { ChatLog, ChatUserStats } from '@/store/chat-logs-store'; // 인터페이스 임포트

import ChatUserCardView from '@/components/chat/ChatUserCardView';
import ChatConversationView from '@/components/chat/ChatConversationView'; // ChatConversationView 임포트

interface ChatLogViewWrapperProps {
  mockChatLogs: ChatLog[]; // 전체 로그 데이터
  calculatedUserStats: ChatUserStats[]; // 계산된 사용자 통계 데이터
}

export default function ChatLogViewWrapper({ mockChatLogs, calculatedUserStats }: ChatLogViewWrapperProps) {
  const { selectedUserId } = useChatLogsStore();

  return (
    <>
      {selectedUserId ? (
        // 대화 로그 뷰
        <ChatConversationView userId={selectedUserId} mockChatLogs={mockChatLogs} calculatedUserStats={calculatedUserStats} />
      ) : (
        // 사용자 목록 뷰
        <ChatUserCardView users={calculatedUserStats} />
      )}
    </>
  );
}
