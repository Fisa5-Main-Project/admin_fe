// src/store/ai-analytics-store.ts
import { create } from 'zustand';

// 스토어의 상태(state)와 액션(actions)에 대한 타입 정의
interface AIAnalyticsState {
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number; // API의 limit에 해당
  totalItems: number; // 총 아이템 수
  
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalItems: (total: number) => void;
}

// Zustand 스토어 생성
const useAIAnalyticsStore = create<AIAnalyticsState>((set) => ({
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 10, // API 기본값과 동일하게 설정
  totalItems: 0,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalItems: (total) => set({ totalItems: total }),
}));

export default useAIAnalyticsStore;
