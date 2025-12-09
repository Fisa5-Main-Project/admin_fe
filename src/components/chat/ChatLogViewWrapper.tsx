// src/components/chat/ChatLogViewWrapper.tsx
'use client';

import React from 'react';
import useChatLogsStore from '@/store/chat-logs-store';
import type { ChatUserStats } from '@/store/chat-logs-store';
import type { ApiError } from '@/types/api';

import ChatUserCardView from '@/components/chat/ChatUserCardView';
import ChatConversationView from '@/components/chat/ChatConversationView';

interface ChatLogViewWrapperProps {
  calculatedUserStats: ChatUserStats[];
  error: ApiError | null;
}

export default function ChatLogViewWrapper({ calculatedUserStats, error }: ChatLogViewWrapperProps) {
  const { selectedUserId } = useChatLogsStore();

  return (
    <>
      {selectedUserId ? (
        // 대화 로그 뷰
        <ChatConversationView userId={selectedUserId} calculatedUserStats={calculatedUserStats} />
      ) : (
        // 사용자 목록 뷰
        <ChatUserCardView users={calculatedUserStats} error={error} />
      )}
    </>
  );
}
