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

/**
 * 챗봇 대화 로그 개별 항목 데이터 타입
 */
export interface ChatLog {
  user_id: number;
  name: string;
  last_message: string;
  last_active: string; // ISO 8601 형식 문자열
  total_messages: number;
}

/**
 * 챗봇 대화 로그 목록 조회 API 응답 데이터 타입
 * GET /api/v1/admin/logs
 */
export interface ChatLogsResponse {
  logs: ChatLog[];
  page: number;
  limit: number;
  total_pages?: number; // 전체 페이지 수는 API 명세에 없지만, 페이지네이션에 유용
  total_items?: number; // 전체 아이템 수도 페이지네이션에 유용
}

/**
 * [AI] 특정 사용자 챗봇 대화 상세 내역의 개별 메시지 항목
 * GET /api/v1/admin/logs/{user_id}
 */
export interface ChatHistoryItem {
  role: 'user' | 'assistant'; // 메시지 발신자 (사용자 또는 AI 챗봇)
  content: string;            // 메시지 내용
  timestamp: string;          // 메시지 전송 시간 (ISO 8601 형식)
}

/**
 * [AI] 특정 사용자 챗봇 대화 상세 내역 조회 API 응답 데이터 타입
 * GET /api/v1/admin/logs/{user_id}
 */
export interface ChatHistoryResponse {
  history: ChatHistoryItem[]; // 대화 기록 목록
  total: number;              // 전체 메시지 수
  page: number;               // 현재 페이지
  limit: number;              // 페이지당 메시지 수
}
