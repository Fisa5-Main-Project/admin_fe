// src/api/ai.ts
import { aiApiClient } from './index';
import { handleApiCall } from './apiHandler';
import type { ApiResponse } from '@/types/api';
import type { AiOverviewData, AiTrendData, AiFeedbackData, ChatLogsResponse, ChatHistoryResponse, AiUserStatsResponse } from '@/types/ai';

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

/**
 * [AI] 챗봇 대화 로그 목록 조회 API
 * GET /api/v1/admin/logs
 * 챗봇 대화 로그 목록을 페이지네이션 및 검색 기능과 함께 조회합니다.
 */
export const getChatLogs = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
): Promise<ApiResponse<ChatLogsResponse>> => {
  return handleApiCall(() => aiApiClient.get('/admin/logs', {
    params: { page, limit, search }
  }), '챗봇 대화 로그를 불러오는 데 실패했습니다.');
};

/**
 * [AI] 특정 사용자 챗봇 대화 상세 내역 조회 API
 * GET /api/v1/admin/logs/{user_id}
 * 특정 사용자의 챗봇 대화 상세 내역을 페이지네이션과 함께 조회합니다.
 */
export const getChatHistoryByUserId = async (
  userId: string,
  page: number = 1,
  limit: number = 20,
): Promise<ApiResponse<ChatHistoryResponse>> => {
  return handleApiCall(() => aiApiClient.get(`/admin/logs/${userId}`, {
    params: { page, limit }
  }), `사용자 ID ${userId}에 대한 대화 상세 내역을 불러오는 데 실패했습니다.`);
};

/**
 * [AI] 사용자별 AI 사용 통계 조회 API
 * GET /api/v1/admin/users
 * 사용자별 AI 사용 통계 목록을 페이지네이션 및 검색 기능과 함께 조회합니다.
 */
export const getAiUserStats = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
): Promise<ApiResponse<AiUserStatsResponse>> => {
  return handleApiCall(() => aiApiClient.get('/admin/users', {
    params: { page, limit, search }
  }), '사용자별 AI 사용 통계를 불러오는 데 실패했습니다.');
};
