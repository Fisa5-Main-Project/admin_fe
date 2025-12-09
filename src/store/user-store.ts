// src/store/user-store.ts
import { create } from 'zustand';
import type { User } from '../types/user'; // 중앙 관리되는 User 타입 import
import { updateUser as updateUserApi } from '@/api/users'; // updateUser API 함수 임포트
import { ApiError } from '@/types/api';

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
  updateUser: (
    userId: number,
    data: { name?: string; status?: 'active' | 'inactive'; resetPassword?: boolean; disconnectMyData?: boolean }
  ) => Promise<{ success: boolean; error?: ApiError }>; // 사용자 업데이트 비동기 액션
}

// Zustand 스토어 생성
const useUserStore = create<UserState>((set, get) => ({
  searchQuery: '',
  filterStatus: '전체',
  isEditModalOpen: false,
  selectedUser: null,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  openEditModal: (user) => set({ isEditModalOpen: true, selectedUser: user }),
  closeEditModal: () => set({ isEditModalOpen: false, selectedUser: null }),

  updateUser: async (userId, data) => {
    try {
      const response = await updateUserApi(userId, data);
      if (response.isSuccess) {
        // 성공적으로 업데이트되면, selectedUser도 업데이트 (만약 현재 선택된 사용자였다면)
        const currentSelectedUser = get().selectedUser;
        if (currentSelectedUser && currentSelectedUser.id === userId) {
          // 이름이나 마이데이터 연동 여부는 업데이트 가능
          // 비밀번호는 프론트에서 직접 알 수 없으므로 업데이트하지 않음
          set((state) => ({
            selectedUser: {
              ...currentSelectedUser,
              name: data.name !== undefined ? data.name : currentSelectedUser.name,
              status: data.status !== undefined ? data.status : currentSelectedUser.status,
              mydataConnected: data.disconnectMyData === true ? false : currentSelectedUser.mydataConnected,
            },
          }));
        }
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (e: any) {
      return { success: false, error: { code: 'CLIENT_ERROR', message: e.message || '알 수 없는 클라이언트 에러' } };
    }
  },
}));

export default useUserStore;
