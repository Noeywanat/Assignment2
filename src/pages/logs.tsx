import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDrone } from '../context/DroneContext';
import { DroneLog } from '../../types';

// --- Import Component ของ Shadcn/ui ---
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const VIEW_LIMIT = 12;

const ViewLogsPage = () => {
  const { droneId, apiBaseUrl } = useDrone();
  const [logs, setLogs] = useState<DroneLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (droneId && apiBaseUrl) {
      const fetchLogs = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `${apiBaseUrl}/logs/${droneId}?limit=${VIEW_LIMIT}&page=${currentPage}`
          );

          console.log("API response:", response.data); // 🟡 ดูโครงสร้างที่ API ส่งกลับมา

          // ตรวจสอบว่า response.data เป็น array หรือ object ที่มี logs
          const data = Array.isArray(response.data)
            ? response.data
            : response.data?.logs || [];

          setLogs(data);
        } catch (error) {
          console.error('Failed to fetch logs:', error);
          setLogs([]); // ป้องกัน logs ไม่เป็น array
        } finally {
          setLoading(false);
        }
      };

      fetchLogs();
    }
  }, [droneId, apiBaseUrl, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const renderLogs = () => {
    if (loading) {
      return <div className="text-center p-10 text-gray-300">Loading logs...</div>;
    }

    if (logs.length === 0 && currentPage === 1) {
      return <div className="text-center p-10 text-gray-300">No logs found for this drone.</div>;
    }

    return (
      <div className="overflow-x-auto rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-white/5">
              <TableHead className="text-center text-white font-semibold">Created</TableHead>
              <TableHead className="text-center text-white font-semibold">Country</TableHead>
              <TableHead className="text-center text-white font-semibold">Drone ID</TableHead>
              <TableHead className="text-center text-white font-semibold">Drone Name</TableHead>
              <TableHead className="text-center text-white font-semibold">Celsius</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(logs) && logs.map((log) => (
              <TableRow key={log.created} className="border-b border-white/5 hover:bg-white/5">
                <TableCell className="text-center text-gray-300 py-3">{new Date(log.created).toLocaleString()}</TableCell>
                <TableCell className="text-center text-gray-300 py-3">{log.country}</TableCell>
                <TableCell className="text-center text-gray-300 py-3">{log.drone_id}</TableCell>
                <TableCell className="text-center text-gray-300 py-3">{log.drone_name}</TableCell>
                <TableCell className="text-center text-gray-300 py-3">{log.celsius}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="flex items-start justify-center pt-4 pb-20 overflow-hidden">
      <div className="w-full max-w-4xl relative overflow-hidden rounded-2xl shadow-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6">
        
        <h1 className="text-2xl font-bold mb-4 text-white relative z-10">Drone Logs</h1>
        
        <div className="relative z-10">
          {renderLogs()}
        </div>

        {/* --- ปุ่มเปลี่ยนหน้า --- */}
        <div className="flex justify-between items-center mt-6 relative z-10">
          <Button
            variant="default"
            onClick={handlePrevPage}
            disabled={currentPage === 1 || loading}
            className="bg-white text-black hover:bg-white/80"
          >
            Previous
          </Button>
          <span className="self-center font-semibold text-gray-300">Page {currentPage}</span>
          <Button
            variant="default"
            onClick={handleNextPage}
            disabled={logs.length < VIEW_LIMIT || loading}
            className="bg-white text-black hover:bg-white/80"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewLogsPage;
