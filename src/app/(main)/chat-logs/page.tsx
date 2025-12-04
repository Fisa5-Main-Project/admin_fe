import React, { Suspense } from 'react';
import ChatLogClient from '@/components/chat/ChatLogClient';
import { getChatLogs, getAiOverviewData } from '@/api/ai';
import type { ChatLog as ApiChatLog } from '@/types/ai';
import type { ChatUserStats } from '@/store/chat-logs-store';

// StatCardData 타입을 서버 컴포넌트 내에서 정의.
interface StatCardData {
  title: string;
  value: string;
  changeInfo: string;
  changeColor: 'gray' | 'green' | 'red';
  icon: 'MessageSquare' | 'User' | 'Clock' | 'Calendar';
  iconBgColor: string;
  iconColor: string;
}

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-[calc(100vh-200px)]">
    <p>데이터를 불러오는 중입니다...</p>
  </div>
);

/**
 * 챗봇 대화 로그 페이지의 서버 컴포넌트입니다.
 * 페이지에 필요한 초기 데이터를 서버 사이드에서 미리 가져옵니다.
 * 데이터 페칭 후, 클라이언트 컴포넌트인 ChatLogClient를 렌더링하여 UI를 표시합니다.
 * 대시보드 페이지의 구현 패턴에 따라, API 호출 실패 시 빈 배열을 전달합니다.
 */
export default async function ChatLogsPage() {
  const [overviewResponse, logsResponse] = await Promise.all([
    getAiOverviewData(),
    getChatLogs(1, 100), // 페이지네이션은 추후 구현, 우선 100개 로드
  ]);

  // 1. 통계 카드 데이터 처리 (실패 시 빈 배열)
  const initialStats: StatCardData[] = (overviewResponse.isSuccess && overviewResponse.data)
    ? [
        { title: '총 대화 로그', value: overviewResponse.data.total_chats.toLocaleString(), changeInfo: '전체 기록', changeColor: 'gray', icon: 'MessageSquare', iconBgColor: 'var(--light)', iconColor: 'var(--primary)' },
        { title: '활성 사용자', value: overviewResponse.data.active_users.toLocaleString(), changeInfo: '오늘', changeColor: 'gray', icon: 'User', iconBgColor: 'var(--info-bg)', iconColor: 'var(--info)' },
        { title: '오늘 대화', value: '128', changeInfo: '실시간 업데이트', changeColor: 'gray', icon: 'Calendar', iconBgColor: 'var(--warning-bg)', iconColor: 'var(--warning)' },
      ]
    : [];

  // 2. 사용자 로그 요약 데이터 처리 (실패 시 빈 배열)
  const initialUserSummaries: ChatUserStats[] = (logsResponse.isSuccess && logsResponse.data)
    ? logsResponse.data.logs.map((log: ApiChatLog) => ({
        id: String(log.user_id),
        name: log.name,
        chatCount: log.total_messages,
        lastChatTime: new Date(log.last_active).toLocaleString('ko-KR', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        avgDuration: 0, // 현재 API에서 제공하지 않음
      }))
    : [];

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ChatLogClient
        initialStats={initialStats}
        initialUserSummaries={initialUserSummaries}
      />
    </Suspense>
  );
}