import type { Metadata } from 'next';
import { pretendard } from '@/lib/fonts';
import { clsx } from 'clsx';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'FinSet Admin',
    description: 'FinSet 관리자 대시보드',
    manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={clsx(pretendard.variable)}>
            <body>{children}</body>
        </html>
    );
}
