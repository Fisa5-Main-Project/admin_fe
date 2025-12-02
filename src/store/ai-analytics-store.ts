// src/store/ai-analytics-store.ts
import { create } from 'zustand';

// 스토어의 상태(state)와 액션(actions)에 대한 타입 정의
interface AIAnalyticsState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Zustand 스토어 생성
const useAIAnalyticsStore = create<AIAnalyticsState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useAIAnalyticsStore;
