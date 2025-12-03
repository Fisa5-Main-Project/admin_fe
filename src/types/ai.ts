// src/types/ai.ts

/**
 * AI 총 대화 건수 API 응답 데이터 타입
 * GET /api/v1/admin/stats/overview
 */
export interface AiOverviewData {
  total_chats: number;
  total_api_calls: number;
  satisfaction_rate: number; // 만족도 (예: 56.2)
  active_users: number; // 활성 사용자 수
}

/**
 * AI 대화 및 API 요청 추이 데이터 타입
 */
export interface AiTrend {
  date: string; // 예: "2025-11"
  api_calls: number;
  user_chats: number;
}

/**
 * AI 대화 및 API 요청 추이 API 응답 데이터 타입
 * GET /api/v1/admin/stats/trends
 */
export interface AiTrendData {
  trends: AiTrend[];
}

/**
 * AI 피드백 분포 API 응답 데이터 타입
 * GET /api/v1/admin/stats/feedback
 */
export interface AiFeedbackData {
  like: number;
  dislike: number;
}
