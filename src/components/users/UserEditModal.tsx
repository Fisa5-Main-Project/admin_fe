// src/components/users/UserEditModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import useUserStore from '@/store/user-store'; // Zustand 스토어 임포트
import { User } from '@/types/user'; // User 인터페이스 임포트

export default function UserEditModal() {
  // Zustand 스토어에서 모달 상태와 사용자 정보, 액션들을 가져옵니다.
  const { isEditModalOpen, selectedUser, closeEditModal, updateUser } = useUserStore();
  
  // 폼 입력값 관리를 위한 로컬 상태
  const [editingUser, setEditingUser] = useState<User | null>(null);
  // 추가된 기능들의 로컬 상태
  const [resetPasswordFlag, setResetPasswordFlag] = useState(false);
  const [disconnectMyDataFlag, setDisconnectMyDataFlag] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // 저장 중 상태

  // selectedUser가 변경될 때마다 로컬 상태를 업데이트하고 플래그들을 초기화합니다.
  useEffect(() => {
    setEditingUser(selectedUser);
    setResetPasswordFlag(false); // 모달 열릴 때마다 초기화
    // 마이데이터 연동 여부는 현재 사용자 상태를 기반으로 초기화
    setDisconnectMyDataFlag(selectedUser ? !selectedUser.mydataConnected : false);
  }, [selectedUser]);

  // 모달이 열려있지 않거나 편집할 사용자 정보가 없으면 아무것도 렌더링하지 않습니다.
  if (!isEditModalOpen || !editingUser) return null;

  // 입력 필드 변경 핸들러 (이름, 상태)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingUser(prev => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    if (!editingUser || isSaving) return;

    setIsSaving(true); // 저장 중 상태 활성화

    // 백엔드로 보낼 데이터 객체 구성
    const payload: { name?: string; status?: 'active' | 'inactive'; resetPassword?: boolean; disconnectMyData?: boolean } = {};

    // 이름 변경이 있었으면 포함
    if (editingUser.name !== selectedUser?.name) {
      payload.name = editingUser.name;
    }
    // 상태 변경이 있었으면 포함
    if (editingUser.status !== selectedUser?.status) {
      payload.status = editingUser.status;
    }
    // 비밀번호 초기화 체크되었으면 포함
    if (resetPasswordFlag) {
      payload.resetPassword = true;
    }
    // 마이데이터 연동 해제 체크되었으면 포함
    // 주의: 백엔드 필드명은 disconnectMyData로 가정
    if (disconnectMyDataFlag) {
      payload.disconnectMyData = true;
    }
    
    // 변경 사항이 없으면 API 호출하지 않음
    if (Object.keys(payload).length === 0) {
      alert('변경된 내용이 없습니다.');
      setIsSaving(false);
      closeEditModal();
      return;
    }

    // API 호출
    const result = await updateUser(editingUser.id, payload);

    if (result.success) {
      alert('사용자 정보가 성공적으로 업데이트되었습니다.');
      closeEditModal(); // 성공 시 모달 닫기
    } else {
      alert(`사용자 정보 업데이트 실패: ${result.error?.message || '알 수 없는 오류'}`);
    }
    setIsSaving(false); // 저장 중 상태 비활성화
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
          {/* 사용자 ID 필드 (읽기 전용) */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">사용자 ID</label>
            <input
              type="text"
              name="loginId"
              value={editingUser.loginId}
              readOnly
              className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-xl focus:outline-none cursor-not-allowed"
            />
          </div>
          {/* 이름 필드 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">이름</label>
            <input
              type="text"
              name="name"
              value={editingUser.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
            />
          </div>
          {/* 연령 필드 제거 */}
          {/* 상태 필드 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">상태</label>
            <select
              name="status"
              value={editingUser.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
            >
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>

          {/* 비밀번호 초기화 체크박스 */}
          <div className="flex items-center mt-4">
            <input
              id="resetPassword"
              type="checkbox"
              checked={resetPasswordFlag}
              onChange={(e) => setResetPasswordFlag(e.target.checked)}
              className="h-4 w-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
            />
            <label htmlFor="resetPassword" className="ml-2 text-sm text-gray-900">비밀번호 초기화 (password123!)</label>
          </div>

          {/* 마이데이터 연동 해제 체크박스 */}
          <div className="flex items-center mt-2">
            <input
              id="disconnectMyData"
              type="checkbox"
              checked={disconnectMyDataFlag}
              onChange={(e) => setDisconnectMyDataFlag(e.target.checked)}
              // 이미 연동 해제 상태이거나 마이데이터가 연결되지 않았다면 비활성화
              disabled={!editingUser.mydataConnected}
              className="h-4 w-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
            />
            <label htmlFor="disconnectMyData" className="ml-2 text-sm text-gray-900">마이데이터 연동 해제</label>
          </div>

        </div>
        {/* 버튼 영역 */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={closeEditModal}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
            disabled={isSaving}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 text-white rounded-xl hover:shadow-lg transition-all"
            style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-dark))' }}
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
