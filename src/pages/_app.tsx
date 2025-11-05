// src/pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DroneProvider } from '../context/DroneContext';
import Layout from '../components/Layout';
import { Poppins, Sarabun } from 'next/font/google'; // <-- 1. Import Font ทั้งสอง

// 2. ตั้งค่า Font Poppins (สำหรับภาษาอังกฤษ)
const poppins = Poppins({
  subsets: ['latin'], // Poppins รองรับแค่ latin
  weight: ['300', '400', '500', '700'],
  variable: '--font-poppins', // ตั้งชื่อตัวแปร
});

// 3. ตั้งค่า Font Sarabun (สำหรับภาษาไทย)
const sarabun = Sarabun({
  subsets: ['latin', 'thai'], // Sarabun รองรับไทย
  weight: ['300', '400', '500', '700'],
  variable: '--font-sarabun', // ตั้งชื่อตัวแปร
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    // 4. นำตัวแปร Font ทั้งสอง มาใส่ที่ className ของ div หลัก
    <div className={`${poppins.variable} ${sarabun.variable} font-sans dark`}>
      <DroneProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DroneProvider>
    </div>
  );
}