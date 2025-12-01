import type { Metadata } from 'next';
import { pretendard, wooridaum } from '@/lib/fonts';
import { clsx } from 'clsx';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Woori',
    description: 'Main Project Client with Next.js',
    manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={clsx(pretendard.variable, wooridaum.variable)}>
            <body className={clsx(pretendard.className, 'bg-white')}>
                <div className="flex flex-col min-h-screen">
                    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
