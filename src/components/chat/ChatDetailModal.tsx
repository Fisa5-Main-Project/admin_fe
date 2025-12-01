// src/components/chat/ChatDetailModal.tsx
'use client';

import React from 'react';
import { X } from 'lucide-react';
import useChatLogsStore from '@/store/chat-logs-store';

export default function ChatDetailModal() {
  const { selectedLog, closeDetailModal } = useChatLogsStore();

  // 모달이 열려있지 않거나 선택된 로그가 없으면 아무것도 렌더링하지 않습니다.
  if (!selectedLog) return null;

  return (
    // 오버레이
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={closeDetailModal}
    >
      {/* 모달 카드 */}
      <div
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 이벤트 전파 중단
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">대화 상세 정보</h2>
          <button
            onClick={closeDetailModal}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 정보 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">사용자</div>
            <div className="text-sm font-medium text-gray-900">{selectedLog.userName}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">User ID</div>
            <div className="text-sm font-medium text-gray-900">#{selectedLog.userId}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">시간</div>
            <div className="text-sm font-medium text-gray-900">{selectedLog.timestamp}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">응답 시간</div>
            <div className="text-sm font-medium text-gray-900">{selectedLog.duration}초</div>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600 mb-2">사용자 메시지</div>
            <div className="bg-blue-50 rounded-xl p-4 text-gray-900">
              {selectedLog.userMessage}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">AI 챗봇 응답</div>
            <div className="rounded-xl p-4 text-gray-900" style={{ backgroundColor: '#f1f3f5' }}>
              {selectedLog.botResponse}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
