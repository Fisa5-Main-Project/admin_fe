// src/components/users/UserHeader.tsx
import React from 'react';
import { Download } from 'lucide-react';

export default function UserHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      {/* 좌측: 페이지 제목 및 설명 */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">사용자 관리</h1>
        <p className="text-sm text-gray-500">전체 사용자를 조회하고 관리하세요</p>
      </div>
      {/* 우측: Export CSV 버튼 */}
      <button
        className="flex items-center gap-2 px-4 py-2 text-white rounded-xl shadow-lg transition-all"
        style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-dark))' }}
      >
        <Download className="w-4 h-4" />
        <span>Export CSV</span>
      </button>
    </div>
  );
}
