export interface DroneConfig {
    // Fields จาก /configs/:droneId (Config API)
    drone_id: string;
    drone_name: string;
    country: string;
    created: string;
    celsius: number; 

    // *** [Fields ที่เพิ่มจาก /status/:droneId] ***
    battery_level: number;
    light_status: 'On' | 'Off' | string; // <-- แก้ไข Error Type: light_status
    flight_status: 'In Flight' | 'Ready' | 'Error' | string; 
    last_updated: string; 

    condition?: string;
}

// และคง Export อื่นๆ ไว้ (เช่น DroneLog)
export interface DroneLog {
    id: string;
    drone_id: string;
    drone_name: string;
    country: string;
    celsius: number; 
    created: string;
}