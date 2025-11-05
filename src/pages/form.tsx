import { useState } from 'react';
import axios from 'axios';
import { useDrone } from '../context/DroneContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

// --- Import Component ของ Shadcn/ui ---
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react"; 

// --- นี่คือจุดที่โค้ดหายไป ---
const TemperatureLogFormPage = () => {
  // --- โค้ดทั้งหมดต้องอยู่ข้างในนี้ ---
  const { apiBaseUrl, droneConfig } = useDrone();
  const [celsius, setCelsius] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!droneConfig) {
      console.error('Form submitted but config is not loaded.');
      setMessage('Error: Config not loaded, please refresh.');
      setIsLoading(false);
      return; 
    }
    setIsLoading(true);

    const logData = {
      drone_id: droneConfig.drone_id,
      drone_name: droneConfig.drone_name,
      country: droneConfig.country,
      celsius: parseFloat(celsius),
    };

    try {
      await axios.post(`${apiBaseUrl}/logs`, logData);
      setMessage('Log submitted successfully! Redirecting...');
      setTimeout(() => router.push('/logs'), 2000);
    } catch (error) {
      setMessage('Failed to submit log.');
      console.error('Error submitting log:', error);
      setIsLoading(false);
    }
  };

  if (!droneConfig) {
    return (
      // --- [แก้ไข] --- จัดชิดบน, เพิ่ม padding-top และซ่อน overflow
      <div className="flex items-start justify-center pt-20 overflow-hidden"> 
        <Card className="w-full max-w-sm relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-slate-800/80 to-gray-900/80 border border-slate-600/30 backdrop-blur-lg">
          {/* --- เอฟเฟกต์ Glow --- */}
          <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-full bg-blue-500 opacity-20 filter blur-3xl -z-10" style={{ transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-full bg-purple-500 opacity-20 filter blur-3xl -z-10" style={{ transform: 'translate(30%, 30%)' }} />

          <CardContent className="relative z-10 p-10 text-center text-gray-300">
            Please visit the 
            <Link 
              href="/" 
              className={buttonVariants({ variant: "link", className: "text-blue-300" })}
            >
              View Config
            </Link> 
            page first to load drone data.
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- [แก้ไข] --- จัดชิดบน, เพิ่ม padding-top และซ่อน overflow
  return (
    <div className="flex items-start justify-center pt-20 overflow-hidden">
      <Card className="w-full max-w-sm relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-slate-800/80 to-gray-900/80 border border-slate-600/30 backdrop-blur-lg">
        
        {/* --- เอฟเฟกต์ Glow --- */}
        <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-full bg-blue-500 opacity-20 filter blur-3xl -z-10" style={{ transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-full bg-purple-500 opacity-20 filter blur-3xl -z-10" style={{ transform: 'translate(30%, 30%)' }} />

        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl font-bold text-white">Temperature Log Form</CardTitle>
          <CardDescription className="text-gray-400">Enter the new temperature log for this drone.</CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="celsius" className="font-medium text-gray-300">Temperature in Celsius:</Label>
              <Input
                id="celsius"
                type="number"
                value={celsius}
                onChange={(e) => setCelsius(e.target.value)}
                required
                step="0.1"
                disabled={isLoading}
                placeholder="e.g. 35.2"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 focus:ring-blue-500"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-white text-gray-900 font-semibold hover:bg-gray-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Data'
              )}
            </Button>
          </form>
          {message && <p className="mt-4 text-center text-sm text-gray-300">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}; // --- ปิดฟังก์ชัน Component ที่นี่ ---

export default TemperatureLogFormPage;