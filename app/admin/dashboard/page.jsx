"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ElegantShape from "@/components/elegantShape";
import { Dancing_Script } from "next/font/google";
import { socket } from "@/utils/socket";
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dancing-script",
});

export default function DashboardPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState([]);
  const [timer, setTimer] = useState({ isActive: false, endTime: null });
  const [remaining, setRemaining] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  // ✅ Fetch Admin Data & Timer Info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminsRes, timerRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/timer`),
        ]);


        const adminsData = await adminsRes.json();
        const timerData = await timerRes.json();

        setAdmins(adminsData || []);
        setTimer(timerData || { isActive: false });
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      }
    };

    fetchData();
  }, [token]);

  // ✅ Timer Countdown Logic
  useEffect(() => {
    if (timer.isActive && timer.endTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = new Date(timer.endTime) - now;

        if (diff <= 0) {
          setRemaining("⏰ Time's up!");
          clearInterval(interval);
        } else {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setRemaining(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setRemaining("Timer not started");
    }
  }, [timer]);

  // ✅ Timer Controls
 const startTimer = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/timer/start`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setTimer(data.timer);

      // ✅ Emit real-time event to all participants
      socket.emit("start_hackathon", data.timer.startTime);
    }
  } catch (err) {
    console.error("Failed to start timer:", err);
  }
};

const stopTimer = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/timer/stop`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setTimer(data.timer);

      // ✅ Emit real-time event to stop participant timers
      socket.emit("stop_hackathon");
    }
  } catch (err) {
    console.error("Failed to stop timer:", err);
  }
};


  const logout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  return (
    <section className="relative py-32 px-6 text-white min-h-screen bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e99b63]/[0.08] via-[#1a1a1a] to-[#e99b63]/[0.15] blur-3xl" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={10}
          gradient="from-[#e99b63]/[0.8] to-[#ffcc8f]/[0.6]"
          className="left-[-10%] md:left-[-5%] top-[25%]"
        />
        <ElegantShape
          delay={0.5}
          width={480}
          height={120}
          rotate={-15}
          gradient="from-[#ffb87a]/[0.6] to-[#e99b63]/[0.5]"
          className="right-[-10%] md:right-[0%] bottom-[25%]"
        />
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-[#e99b63] via-[#ffcc8f] to-[#e99b63]/80 
              ${dancingScript.className}`}
        >
          Admin Dashboard
        </motion.h1>
        <p className="text-lg text-white/70 mt-4">
          Manage timer and view all registered admins.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => router.push("/admin")}
            className="bg-gradient-to-r from-[#e99b63] to-[#ffcc8f] text-black font-bold py-2 px-6 rounded-lg hover:opacity-90"
          >
            Edit Event Info
          </button>
          <button
            onClick={() => router.push("/admin/clock")}
            className="border border-[#e99b63] text-[#e99b63] font-bold py-2 px-6 rounded-lg hover:bg-[#e99b63]/20"
          >
            View Clock
          </button>
          <button
            onClick={logout}
            className="text-red-400 font-semibold hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Timer Section */}
      <div className="relative z-10 flex flex-col items-center mb-16">
        <motion.div
          animate={{
            scale: timer.isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl md:text-7xl font-bold text-[#e99b63] mb-4"
        >
          {timer.isActive ? remaining : "Timer Stopped"}
        </motion.div>

        <div className="flex gap-6">
          <button
            onClick={startTimer}
            className="bg-gradient-to-r from-[#e99b63] to-[#ffcc8f] text-black font-bold py-2 px-6 rounded-lg hover:opacity-90"
          >
            Start 110-Min Timer
          </button>
          <button
            onClick={stopTimer}
            className="border border-[#e99b63] text-[#e99b63] font-bold py-2 px-6 rounded-lg hover:bg-[#e99b63]/20"
          >
            Stop Timer
          </button>
        </div>
      </div>

      {/* Admin List */}
      <div className="relative z-10 max-w-3xl mx-auto bg-white/5 border border-[#e99b63]/30 rounded-2xl p-8 backdrop-blur-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-[#ffcc8f] text-center">
          Registered Admins
        </h2>
        {admins.length === 0 ? (
          <p className="text-center text-white/70">No admins found.</p>
        ) : (
          <ul className="space-y-3">
            {admins.map((admin, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-[#e99b63]/20"
              >
                <span className="text-[#e99b63] font-medium">
                  {admin.username}
                </span>
                <span className="text-white/60 text-sm">{admin._id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
