// admin_FE/src/components/chat/ChatLogClient.tsx
'use client';

import React from 'react';
import ChatFilterSearch from '@/components/chat/ChatFilterSearch';
import ChatLogViewWrapper from '@/components/chat/ChatLogViewWrapper';
import ChatDetailModal from '@/components/chat/ChatDetailModal';
import ChatFilterModal from '@/components/chat/ChatFilterModal';
import type { ChatUserStats } from '@/store/chat-logs-store';
import type { ApiError } from '@/types/api';

interface ChatLogClientProps {
  initialUserSummaries: ChatUserStats[];
  error: ApiError | null;
}

/**
 * 챗봇 대화 로그 페이지의 클라이언트 측 UI를 렌더링하고 상호작용을 처리하는 컴포넌트입니다.
 * 서버 컴포넌트로부터 초기 데이터를 props로 받아 UI를 구성합니다.
 * 모달, 필터링 등 모든 동적 사용자 인터랙션은 Zustand 스토어를 통해 관리됩니다.
 * @param {ChatLogClientProps} props - 서버에서 미리 가져온 초기 데이터 (사용자 요약 및 에러 상태)
 * @returns {JSX.Element}
 */
export default function ChatLogClient({ initialUserSummaries, error }: ChatLogClientProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">챗봇 대화 로그</h1>
        <p className="text-sm text-gray-500">사용자별 AI 챗봇 대화 내역 조회</p>
      </div>


      {/* 검색 및 필터 UI (내부 로직은 Zustand 스토어와 연동) */}
      <ChatFilterSearch />

      {/* 
        ChatLogViewWrapper에는 서버에서 가져온 초기 사용자 목록과 에러 상태를 전달합니다.
      */}
      <ChatLogViewWrapper
        calculatedUserStats={initialUserSummaries}
        mockChatLogs={[]} // 상세 대화 내역은 추후 별도 API 호출을 통해 가져올 예정입니다.
        error={error}
      />

      {/* 모달 컴포넌트들 (Zustand 스토어에 의해 전역적으로 상태가 관리됨) */}
      <ChatDetailModal />
      <ChatFilterModal />
    </div>
  );
}
