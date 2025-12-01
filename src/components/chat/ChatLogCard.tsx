// src/components/chat/ChatLogCard.tsx
'use client';

import React from 'react';
import { MessageSquare, User } from 'lucide-react';
import useChatLogsStore from '@/store/chat-logs-store';
import { ChatLog } from '@/store/chat-logs-store';

interface ChatLogCardProps {
  log: ChatLog;
}

export default function ChatLogCard({ log }: ChatLogCardProps) {
  const { openDetailModal } = useChatLogsStore();

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      onClick={() => openDetailModal(log)} // 클릭 시 상세 모달 열기
    >
      <div className="p-6">
        {/* 헤더: 타임스탬프 및 응답 시간 */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">{log.timestamp}</div>
          <div className="text-xs text-gray-500">응답 시간: {log.duration}초</div>
        </div>

        {/* 메시지 영역 */}
        <div className="space-y-3">
          {/* 사용자 메시지 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">사용자</div>
              <div className="bg-blue-50 rounded-xl p-4 text-gray-900">
                {log.userMessage}
              </div>
            </div>
          </div>
          {/* AI 응답 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--light)' }}>
              <MessageSquare className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">AI 챗봇</div>
              <div className="rounded-xl p-4 text-gray-900" style={{ backgroundColor: '#f1f3f5' }}>
                {log.botResponse}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
