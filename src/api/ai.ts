// src/api/ai.ts
import { aiApiClient } from './index'; // aiApiClient 임포트
import { handleApiCall } from './apiHandler';
import type { ApiResponse } from '@/types/api';
import type { AiOverviewData, AiTrendData, AiFeedbackData } from '@/types/ai';

/**
 * [AI] AI 총 대화 건수 및 개요 통계 API
 * GET /api/v1/admin/stats/overview
 * AI 서비스의 총 대화 건수, API 호출 수, 만족도, 활성 사용자 수 등 개요 통계를 조회합니다.
 */
export const getAiOverviewData = async (): Promise<ApiResponse<AiOverviewData>> => {
  return handleApiCall(() => aiApiClient.get('/admin/stats/overview'), 'AI 개요 데이터를 불러오는 데 실패했습니다.');
};

/**
 * [AI] AI 대화 및 API 요청 추이 API
 * GET /api/v1/admin/stats/trends
 * 월별 대화 및 API 요청 수 추이 데이터를 조회합니다.
 */
export const getAiTrendData = async (): Promise<ApiResponse<AiTrendData>> => {
  return handleApiCall(() => aiApiClient.get('/admin/stats/trends'), 'AI 추이 데이터를 불러오는 데 실패했습니다.');
};

/**
 * [AI] AI 피드백 분포 API
 * GET /api/v1/admin/stats/feedback
 * AI 챗봇에 대한 사용자 피드백(좋아요/싫어요) 분포 데이터를 조회합니다.
 */
export const getAiFeedbackData = async (): Promise<ApiResponse<AiFeedbackData>> => {
  return handleApiCall(() => aiApiClient.get('/admin/stats/feedback'), 'AI 피드백 데이터를 불러오는 데 실패했습니다.');
};
