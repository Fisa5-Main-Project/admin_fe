// src/api/users.ts
import { apiClient } from './index';
import { handleApiCall } from './apiHandler';
import type { ApiResponse } from '@/types/api';
import type { User } from '@/types/user';

/**
 * [7] 전체 사용자 목록 조회 API
 * GET /api/v1/admin/users
 * 관리자 페이지의 사용자 관리 탭에서 사용하는 전체 사용자 목록을 조회합니다.
 */
export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  return handleApiCall(() => apiClient.get('/admin/users'), '사용자 목록을 불러오는 데 실패했습니다.');
};
