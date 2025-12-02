// src/api/dashboard.ts
import { apiClient } from './index';
import { handleApiCall } from './apiHandler';
import type { ApiResponse } from '@/types/api';
import type {
  StatCardData,
  UserGrowthData,
  AssetDistributionData,
  AssetByAgeData,
  DetailedAssetData,
} from '@/types/dashboard';

/**
 * [1] 대시보드 주요 지표 API
 * GET /api/v1/admin/dashboard/metrics
 * 대시보드 상단의 총 가입자 수, 총 자산 규모 등의 주요 통계 카드 데이터를 조회합니다.
 */
export const getStatCardsData = async (): Promise<ApiResponse<StatCardData[]>> => {
  return handleApiCall(() => apiClient.get('/admin/dashboard/metrics'), '주요 지표 데이터를 불러오는 데 실패했습니다.');
};

/**
 * [2] 사용자 증가 추이 API
 * GET /api/v1/admin/dashboard/user-growth
 * 월별 총 가입자 수 및 신규 가입자 수 데이터를 조회합니다.
 */
export const getUserGrowthData = async (): Promise<ApiResponse<UserGrowthData[]>> => {
  return handleApiCall(() => apiClient.get('/admin/dashboard/user-growth'), '사용자 증가 추이 데이터를 불러오는 데 실패했습니다.');
};

/**
 * [3] DAU(일일 활성 사용자) 추이 API
 * GET /api/v1/admin/dashboard/dau
 * 월별 일일 활성 사용자(DAU) 데이터를 조회합니다.
 */
export const getDauData = async (): Promise<ApiResponse<UserGrowthData[]>> => {
  return handleApiCall(() => apiClient.get('/admin/dashboard/dau'), 'DAU 데이터를 불러오는 데 실패했습니다.');
};

/**
 * [4] 자산 타입별 분포 API
 * GET /api/v1/admin/assets/by-type
 * 사용자 자산의 타입별 분포 데이터를 조회합니다.
 */
export const getAssetDistributionData = async (): Promise<ApiResponse<AssetDistributionData[]>> => {
  return handleApiCall(() => apiClient.get('/admin/assets/by-type'), '자산 타입별 분포 데이터를 불러오는 데 실패했습니다.');
};

/**
 * [5] 연령대별 평균 자산 API
 * GET /api/v1/admin/assets/by-age
 * 연령대별 평균 자산 데이터를 조회합니다.
 */
export const getAverageAssetByAgeData = async (): Promise<ApiResponse<AssetByAgeData[]>> => {
  return handleApiCall(() => apiClient.get('/admin/assets/by-age'), '연령대별 평균 자산 데이터를 불러오는 데 실패했습니다.');
};

/**
 * [6] 자산 타입별 상세 통계 API
 * GET /api/v1/admin/assets/by-type-detailed
 * 자산 타입별 상세 통계 테이블 데이터를 조회합니다.
 */
export const getDetailedAssetData = async (): Promise<ApiResponse<DetailedAssetData[]>> => {
  return handleApiCall(() => apiClient.get('/admin/assets/by-type-detailed'), '자산 타입별 상세 데이터를 불러오는 데 실패했습니다.');
};

