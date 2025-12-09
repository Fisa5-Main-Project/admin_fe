// src/store/chat-logs-store.ts
import { create } from 'zustand';
import type { ConversationTurn } from '@/components/chat/ChatConversationView'; // ConversationTurn 임포트

// 상세 모달에 필요한 모든 데이터를 포함하는 새로운 타입
export interface SelectedLogData {
  userName: string;
  userId: string;
  turn: ConversationTurn;
}

// UserStats 인터페이스 (사용자 카드 뷰에서 사용)
export interface ChatUserStats {
  id: string;
  name: string;
  chatCount: number;
  lastChatTime: string;
}

// 필터 옵션 타입 정의
type DateRange = 'all' | 'today' | 'week' | 'month';
type SortBy = 'newest' | 'oldest' | 'fastest' | 'slowest';

// 스토어의 상태(state)와 액션(actions)에 대한 타입 정의
interface ChatLogsState {
  // 뷰 상태
  selectedUserId: string | null;

  // 검색 및 필터 상태
  searchQuery: string;
  filterDateRange: DateRange;
  filterSortBy: SortBy;

  // 모달 상태
  isFilterModalOpen: boolean;
  selectedLog: SelectedLogData | null; // 상세 모달 데이터를 SelectedLogData 타입으로 변경

  // 액션
  setSelectedUserId: (userId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterDateRange: (range: DateRange) => void;
  setFilterSortBy: (sortBy: SortBy) => void;
  toggleFilterModal: () => void;
  openDetailModal: (data: SelectedLogData) => void; // SelectedLogData를 받도록 액션 변경
  closeDetailModal: () => void;
  resetFilters: () => void;
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
  setSelectedUserId: (userId) => set({ selectedUserId: userId, searchQuery: '', filterDateRange: 'all', filterSortBy: 'newest' }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterDateRange: (range) => set({ filterDateRange: range }),
  setFilterSortBy: (sortBy) => set({ filterSortBy: sortBy }),
  toggleFilterModal: () => set((state) => ({ isFilterModalOpen: !state.isFilterModalOpen })),
  openDetailModal: (data) => set({ selectedLog: data }),
  closeDetailModal: () => set({ selectedLog: null }),
  resetFilters: () => set({ filterDateRange: 'all', filterSortBy: 'newest' }),
}));

export default useChatLogsStore;


