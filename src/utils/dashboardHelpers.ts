// src/utils/dashboardHelpers.ts

// 자산 타입에 따른 색상 매핑 함수 (새 컬러 카트 적용)
export const getAssetTypeColor = (type: string): string => {
  switch (type) {
    case 'CURRENT': return '#0099ff';     // 입출금
    case 'SAVING': return '#716DE8';      // 적금
    case 'INVEST': return '#6D90E8';      // 투자
    case 'PENSION': return '#6DDEE8';     // 연금
    case 'AUTOMOBILE': return '#996DE8';  // 자동차
    case 'LOAN': return '#CCD5EB';        // 대출
    case 'REAL_ESTATE': return '#E371A3'; // 부동산
    default: return '#68E26C';            // 기타
  }
};

/**
 * 자산 타입 enum 이름을 한국어 표시 이름으로 변환합니다.
 * @param type - 영어 AssetType enum 이름 (예: "DEPOSIT")
 * @returns 한국어 자산 타입 이름 (예: "예금")
 */
export const getAssetTypeDisplayName = (type: string): string => {
  switch (type) {
    case 'CURRENT': return '입출금';
    case 'SAVING': return '적금';
    case 'INVEST': return '투자';
    case 'PENSION': return '연금';
    case 'AUTOMOBILE': return '자동차';
    case 'REAL_ESTATE': return '부동산';
    case 'LOAN': return '대출';
    default: return type; // 일치하는 것이 없으면 원래 이름 반환
  }
};

/**
 * 숫자 금액을 통화 형식으로 포맷합니다.
 * @param value - 포맷할 숫자 금액
 * @param currencySymbol - 통화 기호 (기본값: '₩')
 * @returns 포맷된 문자열
 */
export const formatCurrency = (value: number, currencySymbol: string = '₩'): string => {
  if (value === null || value === undefined) return `- ${currencySymbol}`;
  return `${value.toLocaleString()} ${currencySymbol}`;
};

/**
 * 퍼센트 값을 포맷합니다.
 * @param value - 포맷할 숫자 퍼센트 값
 * @param decimalPlaces - 소수점 자릿수 (기본값: 1)
 * @returns 포맷된 문자열
 */
export const formatPercentage = (value: number, decimalPlaces: number = 1): string => {
  if (value === null || value === undefined) return `- %`;
  return `${value.toFixed(decimalPlaces)}%`;
};