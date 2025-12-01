import React from 'react';
import ChatStatCards from '@/components/chat/ChatStatCards';
import ChatFilterSearch from '@/components/chat/ChatFilterSearch';
import ChatLogViewWrapper from '@/components/chat/ChatLogViewWrapper';
import ChatDetailModal from '@/components/chat/ChatDetailModal';
import ChatFilterModal from '@/components/chat/ChatFilterModal';
import { MessageSquare, User, Clock, Calendar } from 'lucide-react';

interface ChatLog {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  userMessage: string;
  botResponse: string;
  duration: number;
}

interface ChatUserStats {
  id: string;
  name: string;
  chatCount: number;
  avgDuration: number;
  lastChatTime: string;
}

const mockChatLogs: ChatLog[] = [
    { id: '1', userId: '1', userName: '김민수', timestamp: '2025-11-29 14:23:45', userMessage: '이번 달 지출 내역을 보여줘', botResponse: '이번 달 총 지출은 2,450,000원입니다. 주요 지출 항목은 식비 850,000원, 교통비 320,000원, 쇼핑 680,000원입니다.', duration: 2.3 },
    { id: '2', userId: '2', userName: '이지은', timestamp: '2025-11-29 14:18:20', userMessage: '저축 목표 달성 여부를 알려줘', botResponse: '현재 저축 목표 달성률은 75%입니다. 목표까지 500,000원 남았습니다.', duration: 1.8 },
    { id: '3', userId: '1', userName: '김민수', timestamp: '2025-11-29 13:55:10', userMessage: '투자 포트폴리오를 추천해줘', botResponse: '고객님의 투자 성향을 고려하여 안정적인 포트폴리오를 추천합니다. 주식 40%, 채권 40%, 예금 20%로 구성하는 것을 고려해보세요.', duration: 3.1 },
    { id: '4', userId: '3', userName: '박준호', timestamp: '2025-11-29 12:34:00', userMessage: '이번 달 예산 범위 내에서 여행 계획을 세워줘', botResponse: '이번 달 예산 1,000,000원 내에서 제주도 2박 3일 여행을 추천합니다. 항공권과 숙박은 예약되었으며, 렌터카와 식비 예산이 포함되어 있습니다.', duration: 2.7 },
    { id: '5', userId: '2', userName: '이지은', timestamp: '2025-11-29 11:05:30', userMessage: '보험 가입 상담을 하고 싶어', botResponse: '네, 보험 전문가와 연결해드리겠습니다. 고객님께 맞는 보험 상품을 안내해드릴 것입니다.', duration: 1.5 },
    { id: '6', userId: '4', userName: '최서연', timestamp: '2025-11-29 10:15:00', userMessage: '대출 상품 정보를 알려줘', botResponse: '다양한 대출 상품이 있습니다. 고객님의 조건에 맞는 최적의 대출 상품을 찾아드리겠습니다.', duration: 2.0 },
    { id: '7', userId: '5', userName: '정우진', timestamp: '2025-11-29 09:45:00', userMessage: '계좌 잔액을 확인해줘', botResponse: '현재 계좌 잔액은 15,200,000원입니다. 최근 거래 내역은 다음과 같습니다.', duration: 2.9 },
    { id: '8', userId: '6', userName: '강나영', timestamp: '2025-11-29 09:12:00', userMessage: '신용 점수 변동 내역을 확인하고 싶어', botResponse: '최근 신용 점수 변동 내역입니다. 지난 달 대비 5점 상승했습니다.', duration: 3.4 },
];

export default function ChatLogsPage() {
    const userStatsMap = new Map<string, { id: string; name: string; chatCount: number; totalDuration: number; lastChatTime: string }>();

    mockChatLogs.forEach(log => {
        if (!userStatsMap.has(log.userId)) {
            userStatsMap.set(log.userId, {
                id: log.userId,
                name: log.userName,
                chatCount: 0,
                totalDuration: 0,
                lastChatTime: log.timestamp,
            });
        }
        const currentUserStats = userStatsMap.get(log.userId)!;
        currentUserStats.chatCount++;
        currentUserStats.totalDuration += log.duration;
        if (new Date(log.timestamp) > new Date(currentUserStats.lastChatTime)) {
            currentUserStats.lastChatTime = log.timestamp;
        }
    });

    const calculatedUserStats: ChatUserStats[] = Array.from(userStatsMap.values()).map(stats => ({
        id: stats.id,
        name: stats.name,
        chatCount: stats.chatCount,
        avgDuration: stats.chatCount > 0 ? stats.totalDuration / stats.chatCount : 0,
        lastChatTime: stats.lastChatTime,
    }));

    const totalLogs = mockChatLogs.length;
    const activeUsersCount = calculatedUserStats.length;
    const avgResponseTime = (mockChatLogs.reduce((acc, log) => acc + log.duration, 0) / totalLogs).toFixed(1);
    const todayChatsCount = mockChatLogs.length;

    const chatStatCardsData = [
      { title: '총 대화 로그', value: totalLogs.toLocaleString(), changeInfo: '전체 기록', changeColor: 'gray' as const, icon: 'MessageSquare' as const, iconBgColor: 'var(--light)', iconColor: 'var(--primary)' },
      { title: '활성 사용자', value: activeUsersCount.toLocaleString(), changeInfo: '오늘', changeColor: 'gray' as const, icon: 'User' as const, iconBgColor: 'var(--info-bg)', iconColor: 'var(--info)' },
      { title: '평균 응답 시간', value: `${avgResponseTime}초`, changeInfo: '-0.3초 개선', changeColor: 'green' as const, icon: 'Clock' as const, iconBgColor: 'var(--success-bg)', iconColor: 'var(--success)' },
      { title: '오늘 대화', value: todayChatsCount.toLocaleString(), changeInfo: '실시간 업데이트', changeColor: 'gray' as const, icon: 'Calendar' as const, iconBgColor: 'var(--warning-bg)', iconColor: 'var(--warning)' },
    ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">챗봇 대화 로그</h1>
        <p className="text-sm text-gray-500">사용자별 AI 챗봇 대화 내역 조회</p>
      </div>
      <ChatStatCards stats={chatStatCardsData} />
      <ChatFilterSearch />
      <ChatLogViewWrapper mockChatLogs={mockChatLogs} calculatedUserStats={calculatedUserStats} />
      <ChatDetailModal />
      <ChatFilterModal />
    </div>
  );
}
