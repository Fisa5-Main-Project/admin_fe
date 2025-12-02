// src/api/index.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 환경 변수에서 API 기본 URL을 가져옵니다.
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// API 기본 URL이 정의되어 있는지 확인합니다.
if (!BASE_URL) {
  throw new Error('환경 변수 NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.');
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/**
 * API 요청을 위한 axios 래퍼 함수
 * @param endpoint - API 엔드포인트 (예: '/users')
 * @param config - axios 요청에 전달할 설정
 * @returns - 파싱된 JSON 응답
 */
export async function fetchApi<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await apiClient.request<T>({
      url: endpoint,
      ...config,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('API 요청 중 에러 발생:', axiosError.message);
      if (axiosError.response) {
        // 서버에서 응답을 받았지만 상태 코드가 2xx 범위가 아님
        console.error('응답 데이터:', axiosError.response.data);
        console.error('응답 상태:', axiosError.response.status);
        console.error('응답 헤더:', axiosError.response.headers);
        throw new Error(`API Error: ${axiosError.response.status} - ${(axiosError.response.data as any)?.message || axiosError.message}`);
      } else if (axiosError.request) {
        // 요청이 전송되었지만 응답을 받지 못함
        console.error('요청 데이터:', axiosError.request);
        throw new Error(`네트워크 에러: 응답을 받지 못했습니다. ${axiosError.message}`);
      } else {
        // 요청을 설정하는 중에 에러 발생
        console.error('Error', axiosError.message);
        throw new Error(`요청 설정 에러: ${axiosError.message}`);
      }
    } else {
      // Axios 에러가 아님
      console.error('알 수 없는 에러:', error);
      throw new Error(`알 수 없는 에러: ${(error as Error).message}`);
    }
  }
}