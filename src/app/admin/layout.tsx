// src/app/(main)/layout.tsx
import { ReactNode } from 'react';
import Sidebar from '@/components/common/Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex h-screen bg-background font-sans text-gray-900 antialiased">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8 bg-background">
            {children}
          </main>
        </div>
    );
}
