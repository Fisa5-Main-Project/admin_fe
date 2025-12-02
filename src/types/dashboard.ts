// src/types/dashboard.ts

export interface StatCardData {
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
}

export interface UserGrowthData {
  month: string;
  users: number;
  newUsers: number;
  dau: number;
}

export interface AssetDistributionData {
  name: string; // 예: '예금', '투자'
  value: number; // 실제 금액 또는 비율 (차트에서는 퍼센트로 사용될 수 있음)
  average: number; // 해당 타입의 평균 자산
}

export interface AssetByAgeData {
  ageGroup: string; // 예: '20대', '30대'
  averageAsset: number; // 평균 자산 금액
}

export interface DetailedAssetData {
  type: string; // 예: '예금'
  totalAsset: number;
  averageBalance: number;
  ratio: number; // 비율 (퍼센트)
}
