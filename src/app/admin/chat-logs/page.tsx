import React, { Suspense } from 'react';
import ChatLogClient from '@/components/chat/ChatLogClient';
import { getChatLogs } from '@/api/ai';
import type { ChatLog as ApiChatLog } from '@/types/ai';
import type { ChatUserStats } from '@/store/chat-logs-store';
import type { ApiError } from '@/types/api';

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-[calc(100vh-200px)]">
    <p>데이터를 불러오는 중입니다...</p>
  </div>
);

/**
 * 챗봇 대화 로그 페이지의 서버 컴포넌트입니다.
 * 페이지에 필요한 초기 데이터를 서버 사이드에서 미리 가져옵니다.
 * 데이터 페칭 후, 클라이언트 컴포넌트인 ChatLogClient를 렌더링하여 UI를 표시합니다.
 * 대시보드 페이지의 구현 패턴에 따라, API 호출 실패 시 에러 객체를 전달합니다.
 */
export default async function ChatLogsPage() {
  const [logsResponse] = await Promise.all([
    getChatLogs(1, 100),
  ]);

  const initialUserSummaries: ChatUserStats[] = (logsResponse.isSuccess && logsResponse.data)
    ? logsResponse.data.logs.map((log: ApiChatLog) => ({
        id: String(log.user_id),
        name: log.name,
        chatCount: log.total_messages,
        lastChatTime: new Date(log.last_active).toLocaleString('ko-KR', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      }))
    : [];
  
  const logsError: ApiError | null = logsResponse.isSuccess ? null : logsResponse.error;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ChatLogClient
        initialUserSummaries={initialUserSummaries}
        error={logsError}
      />
    </Suspense>
  );
}