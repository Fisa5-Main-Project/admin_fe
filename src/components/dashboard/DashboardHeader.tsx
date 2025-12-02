// src/components/dashboard/DashboardHeader.tsx
'use client';

import { Bell, Calendar, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function DashboardHeader() {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        // 컴포넌트가 클라이언트 측에서 마운트된 후에 날짜를 설정합니다.
        const today = new Date();
        const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
        setFormattedDate(dateString);
    }, []);

    return (
        // 헤더 컨테이너: 아이템을 양쪽 끝으로 정렬하고 하단 여백을 줍니다.
        <div className="flex items-center justify-between mb-8">
            {/* 좌측 영역: 날짜 선택 버튼 */}
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 font-medium">{formattedDate}</span>
                </button>
            </div>

            {/* 우측 영역: 액션 버튼들 (검색, 알림, 프로필) */}
            <div className="flex items-center gap-4">
                {/* 검색 버튼 */}
                <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                    <Search className="w-5 h-5 text-gray-600" />
                </button>

                {/* 알림 버튼 (새 알림 표시를 위한 빨간 점 포함) */}
                <button className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                    <Bell className="w-5 h-5 text-gray-600" />
                    {/* 알림 배지 (빨간 점) */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* 프로필 정보 */}
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 border border-gray-200">
                    {/* 아바타 이미지 또는 이니셜 (그라데이션 배경) */}
                    <div
                        className="w-8 h-8 rounded-full"
                        style={{ background: 'linear-gradient(to bottom right, #0099ff, #0064ff)' }}
                    >
                        {/* 아바타 내용을 추가할 수 있습니다. (예: <span className="text-white text-sm">A</span>) */}
                    </div>
                    {/* 사용자 이름 및 이메일 */}
                    <div>
                        <div className="text-gray-900 text-sm font-medium">Admin User</div>
                        <div className="text-xs text-gray-500">admin@example.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
