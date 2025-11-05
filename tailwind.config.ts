import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // นี่คือส่วนตั้งค่า Font ที่เราคุยกันไว้
      fontFamily: {
        sans: [
          'var(--font-poppins)',   // 1. ใช้ Poppins เป็นหลัก
          'var(--font-sarabun)',   // 2. ใช้ Sarabun เป็นตัวสำรอง (สำหรับภาษาไทย)
          'sans-serif',           // 3. ตัวสำรองสุดท้าย
        ],
      },
    
    },
  },
  plugins: [],
};
export default config;