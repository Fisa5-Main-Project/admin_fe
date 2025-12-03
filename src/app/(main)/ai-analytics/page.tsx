// src/app/(main)/ai-analytics/page.tsx
import React from 'react';
import AIStatCards from '@/components/ai/AIStatCards';
import ConversationTrendChart from '@/components/ai/charts/ConversationTrendChart';
import FeedbackDistributionChart from '@/components/ai/charts/FeedbackDistributionChart';
import AIUsageTable from '@/components/ai/AIUsageTable';
import { getAiOverviewData, getAiTrendData, getAiFeedbackData } from '@/api/ai'; // getAiFeedbackData 임포트
import type { AiOverviewData, AiTrendData, AiFeedbackData } from '@/types/ai'; // AiFeedbackData 타입 임포트

export default async function AIAnalyticsPage() {
  // 서버 컴포넌트에서 직접 데이터 페칭
  const [aiOverviewRes, aiTrendRes, aiFeedbackRes] = await Promise.all([
    getAiOverviewData(),
    getAiTrendData(),
    getAiFeedbackData(),
  ]);

  // API 응답 처리: isSuccess가 true이면 data를, 아니면 기본값 사용
  const aiOverviewData: AiOverviewData = aiOverviewRes.isSuccess
    ? aiOverviewRes.data
    : {
        total_chats: 0,
        total_api_calls: 0,
        satisfaction_rate: 0,
        active_users: 0,
      };

  const aiTrendData: AiTrendData = aiTrendRes.isSuccess
    ? aiTrendRes.data
    : { trends: [] };

  const aiFeedbackData: AiFeedbackData = aiFeedbackRes.isSuccess
    ? aiFeedbackRes.data
    : { like: 0, dislike: 0 };


  // 통계 카드 데이터 구성 (API 응답 기반)
  const statCardsData = [
    {
      title: '총 대화 건수',
      value: aiOverviewData.total_chats.toLocaleString(),
      changeInfo: '+12.5% vs last month', // 명세서에 change 정보가 없으므로 임의값 유지
      changeColor: 'green' as const,
      icon: 'MessageSquare' as const,
      iconBgColor: 'var(--light)',
      iconColor: 'var(--primary)',
    },
    {
      title: '총 API 요청',
      value: aiOverviewData.total_api_calls.toLocaleString(),
      changeInfo: '+18.3% vs last month', // 명세서에 change 정보가 없으므로 임의값 유지
      changeColor: 'green' as const,
      icon: 'Activity' as const,
      iconBgColor: 'var(--info-bg)',
      iconColor: 'var(--info)',
    },
    {
      title: '평균 만족도',
      value: `${aiOverviewData.satisfaction_rate.toFixed(1)}%`,
      changeInfo: '+2.3% vs last month', // 명세서에 change 정보가 없으므로 임의값 유지
      changeColor: 'green' as const,
      icon: 'ThumbsUp' as const,
      iconBgColor: 'var(--success-bg)',
      iconColor: 'var(--success)',
    },
    {
      title: '활성 사용자',
      value: aiOverviewData.active_users.toLocaleString(),
      changeInfo: '이번 달', // 명세서에 change 정보가 없으므로 임의값 유지
      changeColor: 'gray' as const,
      icon: 'TrendingUp' as const,
      iconBgColor: 'var(--warning-bg)',
      iconColor: 'var(--warning)',
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
        <ConversationTrendChart data={aiTrendData.trends} />
        <FeedbackDistributionChart data={aiFeedbackData} />
      </div>

      {/* 4. 사용자별 통계 테이블 */}
      {/* AIUsageTable에 필요한 실제 데이터가 아직 없으므로 임시로 빈 배열 전달 */}
      <AIUsageTable users={[]} />
    </div>
  );
}