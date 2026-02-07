"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";
import ElegantShape from "@/components/elegantShape";
import { useRouter } from "next/navigation";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dancing-script",
});

const AdminPage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [eventData, setEventData] = useState({
    name: "",
    logoUrl: "",
    posterUrl: "",
    overview: "",
    moreInfo: "",
    rules: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch current event info
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event`);
        const data = await res.json();
        if (res.ok) {
          setEventData({
            name: data.name || "",
            logoUrl: data.logoUrl || "",
            posterUrl: data.posterUrl || "",
            overview: data.overview || "",
            moreInfo: data.moreInfo || "",
            rules: data.rules ? data.rules.join("\n") : "",
          });
        }
      } catch (err) {
        console.error("Failed to load event info:", err);
      }
    };
    fetchEvent();
  }, []);

  // ✅ Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // ✅ Submit updated data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setMessage("Unauthorized: Please log in first.");
      setLoading(false);
      return;
    }

    try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...eventData,
          rules: eventData.rules.split("\n").filter((r) => r.trim() !== ""),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Event details updated successfully!");
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Failed to update event info.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 text-white overflow-hidden w-full min-h-screen bg-[#0a0a0a]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e99b63]/[0.08] via-[#1a1a1a] to-[#e99b63]/[0.15] blur-3xl pointer-events-none" />

      {/* Floating golden shapes */}
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

      {/* ✅ Navigation Buttons */}
      <div className="relative z-20 flex justify-center gap-6 mb-12">
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="bg-gradient-to-r from-[#e99b63] to-[#ffcc8f] text-black font-bold py-2 px-6 rounded-lg hover:opacity-90 transition"
        >
           Dashboard
        </button>
        <button
          onClick={() => router.push("/admin/clock")}
          className="border border-[#e99b63] text-[#e99b63] font-bold py-2 px-6 rounded-lg hover:bg-[#e99b63]/20 transition"
        >
           Clock
        </button>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.h1
          className={cn(
            "text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#e99b63] via-[#ffcc8f] to-[#e99b63]/80",
            dancingScript.className
          )}
        >
          Event Info
        </motion.h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Manage and update your CODEX event details in real time.
        </p>
      </div>

      {/* Form */}
      <div className="relative z-10 max-w-4xl mx-auto bg-white/5 border border-[#e99b63]/30 rounded-2xl p-8 backdrop-blur-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Event Name */}
          <input
            name="name"
            value={eventData.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="bg-transparent border border-[#e99b63]/40 p-3 rounded-lg focus:outline-none focus:border-[#e99b63] text-white"
          />

          {/* Logo URL */}
          <input
            name="logoUrl"
            value={eventData.logoUrl}
            onChange={handleChange}
            placeholder="Logo URL"
            className="bg-transparent border border-[#e99b63]/40 p-3 rounded-lg focus:outline-none focus:border-[#e99b63] text-white"
          />

          {/* Poster URL */}
          <input
            name="posterUrl"
            value={eventData.posterUrl}
            onChange={handleChange}
            placeholder="Poster URL"
            className="bg-transparent border border-[#e99b63]/40 p-3 rounded-lg focus:outline-none focus:border-[#e99b63] text-white"
          />

          {/* Overview */}
          <textarea
            name="overview"
            value={eventData.overview}
            onChange={handleChange}
            placeholder="Event Overview"
            rows={4}
            className="bg-transparent border border-[#e99b63]/40 p-3 rounded-lg focus:outline-none focus:border-[#e99b63] text-white"
          />

          {/* More Info */}
          <textarea
            name="moreInfo"
            value={eventData.moreInfo}
            onChange={handleChange}
            placeholder="More Information"
            rows={4}
            className="bg-transparent border border-[#e99b63]/40 p-3 rounded-lg focus:outline-none focus:border-[#e99b63] text-white"
          />

          {/* Rules */}
          <textarea
            name="rules"
            value={eventData.rules}
            onChange={handleChange}
            placeholder="Enter Rules (one per line)"
            rows={5}
            className="bg-transparent border border-[#e99b63]/40 p-3 rounded-lg focus:outline-none focus:border-[#e99b63] text-white"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#e99b63] to-[#ffcc8f] text-black font-bold py-3 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Updating..." : "Update Event Info"}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default AdminPage;
