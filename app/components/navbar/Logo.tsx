'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const Logo = () => {
        const router = useRouter();
        return <Image onClick={() => router.push('/')} className="hidden md:block cursor-pointer" src="/logo.svg" alt="logo" height="100" width="100" />;
};

export default Logo;
