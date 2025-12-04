// src/app/(main)/logs/page.tsx
import React from 'react';

export default function LogsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. 헤더 영역 */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">백엔드 로그 관리</h1>
        <p className="text-sm text-gray-500">백엔드 서버에서 발생하는 로그를 조회하고 관리합니다.</p>
      </div>

      {/* TODO: 로그 조회 및 필터링 UI 구현 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <p className="text-gray-600">로그 관리 기능은 현재 개발 중입니다.</p>
      </div>
    </div>
  );
}
