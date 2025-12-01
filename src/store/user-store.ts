// src/store/user-store.ts
import { create } from 'zustand';

// User 인터페이스 (page.tsx에서 복사, 추후 types/ 로 분리)
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  totalAsset: number;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

// 스토어의 상태(state)와 액션(actions)에 대한 타입 정의
interface UserState {
  searchQuery: string;
  filterStatus: string; // '전체', '활성', '비활성'
  isEditModalOpen: boolean;
  selectedUser: User | null; // 편집할 사용자 정보
  
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
  openEditModal: (user: User) => void; // 모달을 열고 사용자 정보 설정
  closeEditModal: () => void; // 모달 닫기
}

// Zustand 스토어 생성
const useUserStore = create<UserState>((set) => ({
  searchQuery: '',
  filterStatus: '전체',
  isEditModalOpen: false,
  selectedUser: null,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  openEditModal: (user) => set({ isEditModalOpen: true, selectedUser: user }),
  closeEditModal: () => set({ isEditModalOpen: false, selectedUser: null }),
}));

export default useUserStore;
