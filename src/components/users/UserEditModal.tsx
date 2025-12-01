// src/components/users/UserEditModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import useUserStore from '@/store/user-store'; // Zustand 스토어 임포트
import { User } from '@/store/user-store'; // User 인터페이스 임포트

export default function UserEditModal() {
  // Zustand 스토어에서 모달 상태와 사용자 정보를 가져오고, 모달 닫기 액션을 가져옵니다.
  const { isEditModalOpen, selectedUser, closeEditModal } = useUserStore();
  // 폼 입력값 관리를 위한 로컬 상태
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // selectedUser가 변경될 때마다 로컬 상태를 업데이트합니다.
  useEffect(() => {
    setEditingUser(selectedUser);
  }, [selectedUser]);

  // 모달이 열려있지 않거나 편집할 사용자 정보가 없으면 아무것도 렌더링하지 않습니다.
  if (!isEditModalOpen || !editingUser) return null;

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingUser(prev => (prev ? { ...prev, [name]: value } : null));
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = () => {
    if (editingUser) {
      console.log('Saving user:', editingUser);
      // TODO: 실제 API 호출 및 UI 업데이트 로직 추가 (예: mutate 또는 zustand store 업데이트)
      alert(`사용자 ${editingUser.name} (${editingUser.id}) 정보 저장 (개발 모드)`);
      closeEditModal(); // 모달 닫기
    }
  };

  return (
    // 오버레이
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeEditModal}
    >
      {/* 모달 카드 */}
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 이벤트 전파 중단
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">사용자 정보 수정</h2>
        <div className="space-y-4">
          {/* 이름 필드 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">이름</label>
            <input
              type="text"
              name="name"
              value={editingUser.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'var(--primary)' }} // CSS 변수 사용
            />
          </div>
          {/* 이메일 필드 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">이메일</label>
            <input
              type="email"
              name="email"
              value={editingUser.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'var(--primary)' }}
            />
          </div>
          {/* 연령 필드 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">연령</label>
            <input
              type="number"
              name="age"
              value={editingUser.age}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'var(--primary)' }}
            />
          </div>
          {/* 상태 필드 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">상태</label>
            <select
              name="status"
              value={editingUser.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'var(--primary)' }}
            >
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>
        </div>
        {/* 버튼 영역 */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={closeEditModal}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 text-white rounded-xl hover:shadow-lg transition-all"
            style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-dark))' }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
