// src/app/(main)/ai-analytics/page.tsx
import React from 'react';
import AIStatCards from '@/components/ai/AIStatCards';
import ConversationTrendChart from '@/components/ai/charts/ConversationTrendChart';
import FeedbackDistributionChart from '@/components/ai/charts/FeedbackDistributionChart';
import AIUsageTable from '@/components/ai/AIUsageTable';

// UserAIStats 인터페이스 (나중에 types/로 이동)
interface UserAIStats {
  userId: string;
  userName: string;
  chatCount: number;
  apiRequests: number;
  likes: number;
  dislikes: number;
  feedbackRatio: number;
}

// 목업 데이터 (DESIGN_SPECIFICATION_AI.md 기반)
const mockUserStats: UserAIStats[] = [
  { userId: '1', userName: '김민수', chatCount: 145, apiRequests: 892, likes: 120, dislikes: 25, feedbackRatio: 82.8 },
  { userId: '2', userName: '이지은', chatCount: 287, apiRequests: 1543, likes: 245, dislikes: 42, feedbackRatio: 85.4 },
  { userId: '3', userName: '박준호', chatCount: 98, apiRequests: 623, likes: 85, dislikes: 13, feedbackRatio: 86.7 },
  { userId: '4', userName: '최서연', chatCount: 203, apiRequests: 1289, likes: 178, dislikes: 25, feedbackRatio: 87.7 },
  { userId: '5', userName: '정우진', chatCount: 176, apiRequests: 945, likes: 152, dislikes: 24, feedbackRatio: 86.4 },
  { userId: '6', userName: '강나영', chatCount: 312, apiRequests: 1876, likes: 289, dislikes: 23, feedbackRatio: 92.6 },
  { userId: '7', userName: '윤동혁', chatCount: 89, apiRequests: 534, likes: 67, dislikes: 22, feedbackRatio: 75.3 },
  { userId: '8', userName: '임수진', chatCount: 234, apiRequests: 1432, likes: 201, dislikes: 33, feedbackRatio: 85.9 },
];

export default function AIAnalyticsPage() {
  // 통계 계산
  const totalChats = mockUserStats.reduce((acc, user) => acc + user.chatCount, 0);
  const totalAPIs = mockUserStats.reduce((acc, user) => acc + user.apiRequests, 0);
  const totalFeedback = mockUserStats.reduce((acc, user) => acc + user.feedbackRatio, 0);
  const avgFeedback = (totalFeedback / mockUserStats.length).toFixed(1);
  const activeUsers = mockUserStats.length;

  const statCardsData = [
    {
      title: '총 대화 건수',
      value: totalChats.toLocaleString(),
      changeInfo: '+12.5% vs last month',
      changeColor: 'green' as const,
      icon: 'MessageSquare' as const,
      iconBgColor: 'var(--light)',
      iconColor: 'var(--primary)',
    },
    {
      title: '총 API 요청',
      value: totalAPIs.toLocaleString(),
      changeInfo: '+18.3% vs last month',
      changeColor: 'green' as const,
      icon: 'Activity' as const,
      iconBgColor: 'var(--info-bg)',
      iconColor: 'var(--info)',
    },
    {
      title: '평균 만족도',
      value: `${avgFeedback}%`,
      changeInfo: '+2.3% vs last month',
      changeColor: 'green' as const,
      icon: 'ThumbsUp' as const,
      iconBgColor: 'var(--success-bg)',
      iconColor: 'var(--success)',
    },
    {
      title: '활성 사용자',
      value: activeUsers.toString(),
      changeInfo: '이번 달',
      changeColor: 'gray' as const,
      icon: 'TrendingUp' as const,
      iconBgColor: 'var(--warning-bg)', // 명세서에는 orange-100 이지만, 정의된 변수 중 가장 가까운 warning-bg 사용
      iconColor: 'var(--warning)', // 명세서에는 orange-600 이지만, 정의된 변수 중 가장 가까운 warning 사용
    },
  ];
  
  return (
    <div className="flex flex-col gap-8">
      {/* 1. 헤더 영역 */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">AI 챗봇 분석</h1>
        <p className="text-sm text-gray-500">사용자별 AI 챗봇 사용 통계 및 피드백 분석</p>
      </div>

      {/* 2. 통계 카드 */}
      <AIStatCards stats={statCardsData} />

      {/* 3. 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversationTrendChart />
        <FeedbackDistributionChart />
      </div>

      {/* 4. 사용자별 통계 테이블 */}
      <AIUsageTable users={mockUserStats} />
    </div>
  );
}