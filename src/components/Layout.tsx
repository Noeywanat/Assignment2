// src/components/Layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';
import { useRouter } from 'next/router'; 
import { cn } from '@/lib/utils'; 

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter(); 
  const currentPath = router.pathname; 

  return (
    // [1. ผืนผ้าใบหลัก]: สีพื้นหลังเข้ม และสร้าง Stacking Context (isolate)
    <div className="relative min-h-screen bg-[#020617] overflow-hidden isolate">
      
      {/* [2. Wrapper เอฟเฟกต์]: อยู่ข้างหลังสุด (z-[-10]) */}
      <div className="absolute inset-0 z-[-10]">
        
        {/* --- [แก้ไข] --- [2a. วงกลมฟุ้งๆ (Blobs) ใหม่]:
            - ใหญ่ขึ้น, กระจายมากขึ้น, สีจางลง
        */}
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/20 filter blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-purple-600/15 filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-600/10 filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        {/* --- [แก้ไข] --- [2b. ลายตาราง (Grid) ใหม่]:
            - เปลี่ยนสีเป็นสีขาวโปร่งใส 95% (#ffffff08)
        */}
        <div className="absolute inset-0 
                        bg-[linear-gradient(to_right,_#ffffff08_1px,_transparent_1px),linear-gradient(to_bottom,_#ffffff08_1px,_transparent_1px)] 
                        bg-[size:40px_40px]" 
        />
      </div>

      {/* [3. Wrapper เนื้อหา]: z-10 (ลอยอยู่เหนือสุด) */}
      <div className="relative z-10 flex flex-col items-center">

        {/* --- [แก้ไข] --- [4. Navbar]:
            - เปลี่ยนเป็นสไตล์ "กระจกฝ้า" ที่ถูกต้อง
        */}
        <nav className="relative z-10 mt-6 bg-white/5 backdrop-blur-lg shadow-md border border-white/10 rounded-xl">
          <div className="flex justify-center space-x-6 px-6 py-3">
            {/* ... (Links ทั้ง 3 อัน เหมือนเดิม) ... */}
            <Link 
              href="/" 
              className={cn(
                "relative text-gray-300 hover:text-white font-semibold transition-colors pb-1", 
                "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                "after:h-[2px] after:w-1/2 after:bg-white after:rounded-full", 
                "after:transition-all after:duration-300 after:ease-in-out after:scale-x-0", 
                currentPath === '/' && "text-white after:scale-x-100" 
              )}
            >
              View Config
            </Link>
            <Link 
              href="/form" 
              className={cn(
                "relative text-gray-300 hover:text-white font-semibold transition-colors pb-1",
                "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                "after:h-[2px] after:w-1/2 after:bg-white after:rounded-full",
                "after:transition-all after:duration-300 after:ease-in-out after:scale-x-0",
                currentPath === '/form' && "text-white after:scale-x-100"
              )}
            >
              Log Form
            </Link>
            <Link 
              href="/logs" 
              className={cn(
                "relative text-gray-300 hover:text-white font-semibold transition-colors pb-1",
                "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                "after:h-[2px] after:w-1/2 after:bg-white after:rounded-full",
                "after:transition-all after:duration-300 after:ease-in-out after:scale-x-0",
                currentPath === '/logs' && "text-white after:scale-x-100"
              )}
            >
              View Logs
            </Link>
          </div>
        </nav>

        {/* [5. Main Content]: z-10 (เหมือนเดิม) */}
        <main className="relative z-10 w-full max-w-4xl p-4 md:p-6 mt-8 mb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;