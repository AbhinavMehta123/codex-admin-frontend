"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ElegantShape from "@/components/elegantShape";

export default function ClockPage() {
  const [timer, setTimer] = useState({ isActive: false, endTime: null });
  const [remaining, setRemaining] = useState("Loading...");

  // Fetch timer info from backend
  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/timer`);
        const data = await res.json();
        if (res.ok) setTimer(data);
      } catch (err) {
        console.error("Failed to fetch timer:", err);
      }
    };

    fetchTimer();
    const interval = setInterval(fetchTimer, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // Countdown logic
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
      setRemaining("Timer not started yet.");
    }
  }, [timer]);

  return (
    <section className="relative py-32 px-6 text-white min-h-screen bg-[#0a0a0a] flex flex-col justify-center items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e99b63]/[0.08] via-[#1a1a1a] to-[#e99b63]/[0.15] blur-3xl pointer-events-none" />
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

      {/* Timer Display */}
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#e99b63] via-[#ffcc8f] to-[#e99b63]/80"
        >
          CODEX Timer
        </motion.h1>

        <motion.div
          animate={{ scale: timer.isActive ? [1, 1.05, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[80px] md:text-[120px] font-bold text-[#e99b63]"
        >
          {remaining}
        </motion.div>

        <p className="mt-8 text-white/70 text-lg">
          {timer.isActive
            ? "⏳ The clock is running..."
            : "Waiting for admin to start the timer."}
        </p>
      </div>
    </section>
  );
}