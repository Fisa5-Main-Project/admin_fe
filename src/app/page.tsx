import Image from 'next/image';
import Link from 'next/link'; // Link 컴포넌트 임포트

export default function LandingPage() {
    return (
        <main className="flex h-screen w-full flex-col bg-white">
            <div className="flex flex-1 flex-col items-center justify-center">
                <Image src="/assets/logo/logo.png" alt="WON 로고" width={200} height={200} priority />
                
                <Link href="/admin/dashboard" passHref>
                    <span className="mt-20 px-8 py-3 text-lg font-medium transition-colors hover:underline">
                        관리자 페이지로 이동하기
                    </span>
                </Link>
            </div>
        </main>
    );
}
