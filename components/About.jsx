"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";
import ElegantShape from "./elegantShape";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dancing-script",
});

const About = ({ id = "about" }) => {
  const containerRef = useRef(null);
  const [overview, setOverview] = useState(""); // ✅ dynamic overview
  const [moreInfo,setmoreInfo] = useState("");  //moreInfo
  const [poster, setPoster] = useState(""); // ✅ optional poster image if needed

  // ✅ Fetch overview from backend
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event`); //  backend endpoint
        const data = await res.json();
        if (data.overview) setOverview(data.overview);
        if (data.posterUrl) setPoster(data.posterUrl);
        if (data.moreInfo) setmoreInfo(data.moreInfo);
      } catch (err) {
        console.error("Failed to fetch event overview:", err);
      }
    };
    fetchOverview();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 60,
        damping: 14,
      },
    }),
  };

  return (
    <motion.section
      id={id}
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative py-32 px-6 text-center text-white overflow-hidden w-full min-h-screen bg-[#0a0a0a]"
    >
      {/* Background gradient (Hero style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e99b63]/[0.08] via-[#1a1a1a] to-[#e99b63]/[0.15] blur-3xl pointer-events-none" />

      {/* Floating shapes (Hero-matching) */}
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

      {/* Section Header */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-16">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="inline-block px-6 py-2 bg-white/5 border border-[#e99b63]/30 rounded-full mb-8 backdrop-blur-md"
        >
          <span className="text-[12px] tracking-[0.4em] font-bold text-[#e99b63] uppercase">
            Explore The Build
          </span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            "text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#e99b63] via-[#ffcc8f] to-[#e99b63]/80",
            dancingScript.className
          )}
        >
          CODEX-BUILD
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light tracking-wide max-w-3xl mx-auto"
        >
          {overview
            ? overview
            : "Loading event overview..."}
        </motion.p>
      </div>

      {/* About Content — hero-style layout */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 text-left md:text-left">
        {/* Left Image Glow */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-[0_0_60px_#e99b63]/40 border border-[#e99b63]/40"
        >
          {/* sample image */}
          <img
            src={poster || "/WebAssets/codex-logo.jpeg"}
            alt="About Codex Build"
            className="object-cover w-full h-full rounded-full"
          />
        </motion.div>

        {/* Right Text Content */}
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[#e99b63] mb-4">
            Innovation Meets Passion
          </h3>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-6">
          {moreInfo
            ? moreInfo
            : "Loading event moreinfo..."}
          {/* Sample data */}
            CODEX-BUILD isn’t just about solving problems — it’s about solving
            them beautifully. With each challenge, participants explore the
            intersection of creativity and computation. From algorithms to UI
            design, it’s a playground for every tech enthusiast to push
            boundaries and redefine what’s possible.
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-screen h-full bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/70 pointer-events-none" />
    </motion.section>
  );
};

export default About;
