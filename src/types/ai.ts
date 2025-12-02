// src/types/ai.ts

/**
 * AI 사용 통계 정보에 대한 인터페이스
 */
export interface UserAIStats {
  userId: string;
  userName: string;
  chatCount: number;
  apiRequests: number;
  likes: number;
  dislikes: number;
  feedbackRatio: number;
}
