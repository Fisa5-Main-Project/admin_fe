// src/store/chat-logs-store.ts
import { create } from 'zustand';

// ChatLog 인터페이스 (PAGES_DOCUMENTATION.md 기반)
interface ChatLog {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  userMessage: string;
  botResponse: string;
  duration: number; // 응답 시간(초)
}

// UserStats 인터페이스 (사용자 카드 뷰에서 사용)
interface ChatUserStats {
  id: string;
  name: string;
  chatCount: number;
  avgDuration: number;
  lastChatTime: string;
}

// 필터 옵션 타입 정의
type DateRange = 'all' | 'today' | 'week' | 'month';
type SortBy = 'newest' | 'oldest' | 'fastest' | 'slowest';

// 스토어의 상태(state)와 액션(actions)에 대한 타입 정의
interface ChatLogsState {
  // 뷰 상태
  selectedUserId: string | null; // null이면 사용자 목록 뷰, 아니면 특정 사용자의 대화 로그 뷰

  // 검색 및 필터 상태
  searchQuery: string; // 사용자 목록 뷰에서는 사용자 검색, 대화 로그 뷰에서는 메시지 검색
  filterDateRange: DateRange;
  filterSortBy: SortBy;

  // 모달 상태
  isFilterModalOpen: boolean;
  selectedLog: ChatLog | null; // 상세 모달에 표시될 로그

  // 액션
  setSelectedUserId: (userId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterDateRange: (range: DateRange) => void;
  setFilterSortBy: (sortBy: SortBy) => void;
  toggleFilterModal: () => void;
  openDetailModal: (log: ChatLog) => void;
  closeDetailModal: () => void;
  resetFilters: () => void; // 필터 초기화 액션 추가
}

// Zustand 스토어 생성
const useChatLogsStore = create<ChatLogsState>((set) => ({
  // 초기 상태
  selectedUserId: null,
  searchQuery: '',
  filterDateRange: 'all',
  filterSortBy: 'newest',
  isFilterModalOpen: false,
  selectedLog: null,

  // 액션 구현
  setSelectedUserId: (userId) => set({ selectedUserId: userId, searchQuery: '', filterDateRange: 'all', filterSortBy: 'newest' }), // 사용자 변경 시 검색어 및 필터 초기화
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterDateRange: (range) => set({ filterDateRange: range }),
  setFilterSortBy: (sortBy) => set({ filterSortBy: sortBy }),
  toggleFilterModal: () => set((state) => ({ isFilterModalOpen: !state.isFilterModalOpen })),
  openDetailModal: (log) => set({ selectedLog: log }),
  closeDetailModal: () => set({ selectedLog: null }),
  resetFilters: () => set({ filterDateRange: 'all', filterSortBy: 'newest' }),
}));

export default useChatLogsStore;

