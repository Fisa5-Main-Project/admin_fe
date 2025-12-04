// src/types/user.ts

/**
 * 사용자 정보에 대한 인터페이스
 */
export interface User {
  id: number;
  name: string;
  loginId: string;
  age: number;
  totalAsset: number | null;
  joinDate: string; // ISO 8601 형식의 날짜 문자열 (e.g., "2024-07-29T10:00:00")
  lastActive: string; // ISO 8601 형식의 날짜 문자열
  status: 'active' | 'inactive';
  mydataConnected: boolean; // 마이데이터 연동 여부
}
