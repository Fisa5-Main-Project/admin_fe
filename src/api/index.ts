// src/api/index.ts
import axios from 'axios';

// 환경 변수에서 API 기본 URL을 가져옵니다.
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// API 기본 URL이 정의되어 있는지 확인합니다.
if (!BASE_URL) {
  throw new Error('환경 변수 NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.');
}

// 다른 파일에서 재사용할 수 있도록 apiClient를 export합니다.
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // 자격 증명(쿠키 등)을 포함하여 요청
});