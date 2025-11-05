"use client";

import React, { useEffect, useState } from "react";
import { useDrone } from "../context/DroneContext";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Cpu, Hash, Sun } from "lucide-react";

const ViewConfigPage = () => {
  const { droneConfig } = useDrone();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // ป้องกัน Hydration Error โดยให้ render หลังจาก client mount แล้วเท่านั้น
    setMounted(true);
  }, []);

  if (!mounted) return null; // 👈 ป้องกัน SSR mismatch

  if (!droneConfig) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white text-lg font-semibold">
              Loading Configuration...
            </CardTitle>
            <p className="text-gray-400 text-sm mt-1">
              Retrieving drone data from multiple API endpoints...
            </p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const cardData = [
    { title: "Drone Name", value: droneConfig.drone_name, icon: <Cpu className="h-5 w-5 text-cyan-400" />, key: "name" },
    { title: "Drone ID", value: droneConfig.drone_id, icon: <Hash className="h-5 w-5 text-cyan-400" />, key: "id" },
    { title: "Country", value: droneConfig.country, icon: <MapPin className="h-5 w-5 text-cyan-400" />, key: "country" },
    { title: "Status Light", value: droneConfig.light_status || droneConfig.condition || "N/A", icon: <Sun className="h-5 w-5 text-cyan-400" />, key: "light" },

  ];

  return (
    <div className="flex flex-col items-center justify-start pt-12 pb-20 min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          <span className="text-cyan-400">{droneConfig.drone_name}</span> Overview
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Viewing real-time configuration and status data.
        </p>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        {/* Left: Data Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cardData.map((data) => (
            <Card
              key={data.key}
              className="bg-gray-900/60 backdrop-blur-md border border-gray-700 hover:border-cyan-500 transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{data.title}</CardTitle>
                {data.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-extrabold text-white">{data.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right: Drone Image */}
        <div className="flex items-center justify-center">
          <div className="relative w-full h-[450px]">
            <Image
              src="/images/my_drone.png"
              alt="Drone Image"
              fill
              style={{ objectFit: "contain" }}
              className="drop-shadow-lg"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = "https://placehold.co/900x600/181829/FFFFFF?text=PLACE+DRONE+IMAGE+HERE";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewConfigPage;
