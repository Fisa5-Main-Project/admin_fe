// admin_FE/src/components/chat/ChatConversationView.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import useChatLogsStore from '@/store/chat-logs-store';
import { ChatUserStats } from '@/store/chat-logs-store';
import ChatUserProfile from './ChatUserProfile';
import ChatLogCard from './ChatLogCard'; // ChatHistoryMessage 대신 ChatLogCard를 다시 사용
import { MessageSquare } from 'lucide-react';
import { getChatHistoryByUserId } from '@/api/ai';
import type { ChatHistoryItem } from '@/types/ai';

// 사용자-AI 대화 '턴'을 나타내는 새로운 인터페이스
export interface ConversationTurn {
  id: string; // 고유 ID (예: 사용자 메시지 타임스탬프)
  userMessage: ChatHistoryItem;
  assistantMessage?: ChatHistoryItem; // AI 응답은 없을 수도 있음
}

interface ChatConversationViewProps {
  userId: string;
  calculatedUserStats: ChatUserStats[];
}

export default function ChatConversationView({ userId, calculatedUserStats }: ChatConversationViewProps) {
  const { searchQuery, openDetailModal } = useChatLogsStore();

  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      setLoadingHistory(true);
      setHistoryError(null);
      try {
        const response = await getChatHistoryByUserId(userId, currentPage, itemsPerPage);
        if (response.isSuccess && response.data) {
          setChatHistory(response.data.history);
          setTotalPages(Math.ceil(response.data.total / itemsPerPage));
        } else {
          throw new Error(response.error?.message || '대화 내역을 불러오는 데 실패했습니다.');
        }
      } catch (e: any) {
        setHistoryError(e.message);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, [userId, currentPage, itemsPerPage]);

  // chatHistory를 ConversationTurn[]으로 그룹화하는 로직
  const conversationTurns = useMemo(() => {
    const turns: ConversationTurn[] = [];
    if (!chatHistory) return turns;

    for (let i = 0; i < chatHistory.length; i++) {
      if (chatHistory[i].role === 'user') {
        const userMessage = chatHistory[i];
        const assistantMessage = (i + 1 < chatHistory.length && chatHistory[i + 1].role === 'assistant')
          ? chatHistory[i + 1]
          : undefined;
        
        turns.push({
          id: userMessage.timestamp,
          userMessage,
          assistantMessage,
        });

        // AI 메시지가 쌍으로 묶였다면, 다음 순회에서 건너뛰도록 i를 증가
        if (assistantMessage) {
          i++;
        }
      }
    }
    return turns;
  }, [chatHistory]);

  // 검색 쿼리에 따른 클라이언트 측 필터링
  const filteredTurns = useMemo(() => {
    if (!searchQuery) return conversationTurns;
    return conversationTurns.filter(turn =>
      turn.userMessage.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (turn.assistantMessage && turn.assistantMessage.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [conversationTurns, searchQuery]);

  const selectedUserStats = calculatedUserStats.find(stats => stats.id === userId);

  // 카드 클릭 핸들러
  const handleCardClick = (turn: ConversationTurn) => {
    if (selectedUserStats) {
      openDetailModal({
        userName: selectedUserStats.name,
        userId: selectedUserStats.id,
        turn: turn,
      });
    }
  };

  if (loadingHistory) {
    return <div className="flex justify-center items-center h-40"><p>대화 내역을 불러오는 중입니다...</p></div>;
  }
  if (historyError) {
    return <div className="flex justify-center items-center h-40 text-red-500"><p>오류: {historyError}</p></div>;
  }
  if (!selectedUserStats) {
    return <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center"><p>사용자 정보를 찾을 수 없습니다.</p></div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <ChatUserProfile userStats={selectedUserStats} />
      <div className="space-y-4">
        {filteredTurns.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">대화가 없습니다</p>
          </div>
        ) : (
          filteredTurns.map(turn => (
            <ChatLogCard key={turn.id} turn={turn} onCardClick={handleCardClick} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50">이전</button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50">다음</button>
        </div>
      )}
    </div>
  );
}
