// src/components/common/Sidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // useRouter 임포트
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any; // router 객체를 props로 받도록 추가
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, label, isActive, router }) => {
  const handleNavigate = () => {
    router.push(href);
  };

  return (
    <div
      onClick={handleNavigate}
      className={clsx(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer", // cursor-pointer 추가
        isActive
          ? "sidebar-link-active"
          : "text-gray-600 hover:bg-gray-50"
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); // useRouter 훅 사용
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const primaryLinks = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: '대시보드' },
    { href: '/admin/users', icon: Users, label: '사용자 관리' },
    { href: '/admin/ai-analytics', icon: MessageSquare, label: 'AI 분석' },
    { href: '/admin/chat-logs', icon: FileText, label: '대화 로그' },
  ];

  const utilityLinks = [
    { href: '/admin/logs', icon: FileText, label: '로그 관리' },
  ];

  const footerLinks = [
    { href: '/admin/help', icon: HelpCircle, label: '도움말' },
    { href: '/admin/logout', icon: LogOut, label: '로그아웃' },
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
            isActive={isClient && (pathname === link.href || (link.href === '/admin/dashboard' && pathname === '/admin'))}
            router={router} // router 객체 전달
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
              isActive={isClient && pathname === link.href}
              router={router} // router 객체 전달
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
            isActive={isClient && pathname === link.href}
            router={router} // router 객체 전달
          />
        ))}
      </div>
    </aside>
  );
}