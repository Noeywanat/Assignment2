import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DroneConfig } from '../../types'; 
import axios from 'axios'; 
import { request } from 'http';

interface DroneContextType {
  droneId: string;
  apiBaseUrl: string;
  droneConfig: DroneConfig | null;
  setDroneConfig: (config: DroneConfig | null) => void;
}

const DroneContext = createContext<DroneContextType | undefined>(undefined);

export const useDrone = () => {
  const context = useContext(DroneContext);
  if (!context) throw new Error('useDrone must be used within a DroneProvider');
  return context;
};

export const DroneProvider = ({ children }: { children: ReactNode }) => {
  const [droneConfig, setDroneConfig] = useState<DroneConfig | null>(null);

  const droneId = process.env.NEXT_PUBLIC_DRONE_ID || '66010727';
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://drone-api-a43n.onrender.com';
  
  useEffect(() => {
    
    const fetchConfigAndStatus = async () => {
      
      if (apiBaseUrl && droneId) {
        // กำหนด URL ของทั้งสอง API
        const configUrl = `${apiBaseUrl}/configs/${droneId}`;
        const statusUrl = `${apiBaseUrl}/status/${droneId}`;

        try {
          console.log(`Attempting to fetch config from: ${configUrl}`); 
          console.log(`Attempting to fetch status from: ${statusUrl}`); 
          
          // 1. ดึงข้อมูลทั้งสอง API พร้อมกัน (Parallel Requests)
          const [configResponse, statusResponse] = await Promise.all([
            axios.get(configUrl),
            axios.get(statusUrl)
          ]);

          const configData = configResponse.data;
          const statusData = statusResponse.data;
          
          // 2. รวมข้อมูลจากทั้งสอง API เข้าด้วยกัน
          const mergedConfig: DroneConfig = {
              ...configData, // เช่น drone_id, drone_name, country
              ...statusData, // เช่น light_status, battery_level, flight_status
          };
          
          setDroneConfig(mergedConfig); 
          console.log("Successfully retrieved and merged Drone Configuration and Status.");
          
        } catch (error) {
          // หากเกิด Error กับ API ใด API หนึ่ง
          console.error(`Failed to fetch one or both APIs. Check both /configs/ and /status/ endpoints.`, error);
          setDroneConfig(null); 
        }
      } else {
        console.warn("API_BASE_URL or DRONE_ID is missing.");
      }
    };
    
    fetchConfigAndStatus();
    
  }, [apiBaseUrl, droneId]); // Dependency Array

  return (
    <DroneContext.Provider value={{ droneId, apiBaseUrl, droneConfig, setDroneConfig }}>
      {children}
    </DroneContext.Provider>
  );
};