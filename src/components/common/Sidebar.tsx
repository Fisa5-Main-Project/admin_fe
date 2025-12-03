// src/components/common/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className={clsx(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
        isActive
          ? "sidebar-link-active" // globals.css에 정의된 활성 스타일 클래스 사용
          : "text-gray-600 hover:bg-gray-50"
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  const primaryLinks = [
    { href: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
    { href: '/users', icon: Users, label: '사용자 관리' },
    { href: '/ai-analytics', icon: MessageSquare, label: 'AI 분석' },
    { href: '/chat-logs', icon: FileText, label: '대화 로그' },
  ];

  const utilityLinks = [
    { href: '/logs', icon: FileText, label: '로그 관리' },
  ];

  const footerLinks = [
    { href: '/help', icon: HelpCircle, label: '도움말' },
    { href: '/logout', icon: LogOut, label: '로그아웃' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* 헤더 영역 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(to bottom right, #0099ff, #0064ff)' }}
          >
            <span className="text-white text-base font-medium">A</span>
          </div>
          <div>
            {/* 폰트 크기를 명세에 맞게 16px(text-base)로 수정 */}
            <h1 className="text-gray-900 text-base font-medium">Admin Panel</h1>
            <p className="text-xs text-gray-500">관리자 대시보드</p>
          </div>
        </div>
      </div>

      {/* 내비게이션 영역 */}
      <nav className="flex-1 p-4 space-y-2">
        {primaryLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={pathname === link.href || (link.href === '/dashboard' && pathname === '/') }
          />
        ))}

        {/* 설정 버튼 */}
        <div className="pt-4 mt-4 border-t border-gray-100">
          {utilityLinks.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              isActive={pathname === link.href}
            />
          ))}
        </div>
      </nav>

      {/* 푸터 영역 */}
      <div className="p-4 space-y-2 border-t border-gray-200">
        {footerLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={pathname === link.href}
          />
        ))}
      </div>
    </aside>
  );
}
