import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // FinSet 디자인 시스템 색상 (DESIGN_SPECIFICATION.md 기반)
                primary: '#0099ff',
                'primary-dark': '#0064ff',
                secondary: '#43b4ff',
                light: '#c7e8ff',
                background: '#F5F6FA',
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                },
                // Status Colors
                success: '#10B981',      // green-600
                'success-bg': '#D1FAE5', // green-100
                warning: '#F59E0B',      // yellow-600
                'warning-bg': '#FEF3C7', // yellow-100
                error: '#EF4444',        // red-600
                'error-bg': '#FEE2E2',   // red-100
                info: '#3B82F6',         // blue-600
                'info-bg': '#DBEAFE',    // blue-100,
            },
            borderRadius: {
                lg: '8px',
                xl: '12px',
                '2xl': '16px',
                '3xl': '24px',
            },
            fontFamily: {
                // 본문용 Pretendard
                sans: ['var(--font-pretendard)', 'sans-serif'],
                // 제목용 우리다움체
                heading: ['var(--font-wooridaum)', 'sans-serif'],
            },
            fontSize: {
                xs: ['0.875rem', { lineHeight: '1.3125rem' }],   // 14px
                sm: ['1rem', { lineHeight: '1.5rem' }],         // 16px
                base: ['1.125rem', { lineHeight: '1.6875rem' }], // 18px
                lg: ['1.25rem', { lineHeight: '1.875rem' }],    // 20px
                xl: ['1.375rem', { lineHeight: '2.0625rem' }],   // 22px
                '2xl': ['2.125rem', { lineHeight: '3.1875rem' }], // 34px
            },
            // 3. 모바일 화면 크기 제어
            screens: {
                // => @media (min-width: 640px) { ... }
                sm: '640px',
                // => @media (min-width: 768px) { ... }
                md: '768px',
                // => @media (min-width: 1024px) { ... }
                lg: '1024px',
                // => @media (min-width: 1280px) { ... }
                xl: '1280px',
                // => @media (min-width: 1536px) { ... }
                '2xl': '1536px',
            },
            boxShadow: {
                // DESIGN_DETAILS.md - 활성 버튼용 커스텀 그림자
                'custom-blue': '0 10px 25px rgba(0, 153, 255, 0.2)',
            },
            aspectRatio: {
                '874/402': '874 / 402',
            },
        },
    },
    plugins: [],
};
export default config;
