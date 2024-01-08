'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/admin')}
      className="hidden md:block cursor-pointer ml-16" 
      src="/images/logo.png" 
      height="200" 
      width="200" 
      alt="Logo" 
    />
   );
}
 
export default Logo;
