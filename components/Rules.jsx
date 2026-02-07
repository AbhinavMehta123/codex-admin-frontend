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

const Rules = ({ id = "rules" }) => {
  const containerRef = useRef(null);
  const [rulesList, setRulesList] = useState([]);

  // ✅ Fetch rules from backend
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event`); // <-- your backend route
        const data = await res.json();
        if (data.rules && Array.isArray(data.rules)) {
          setRulesList(data.rules);
        }
      } catch (err) {
        console.error("Failed to fetch rules:", err);
      }
    };
    fetchRules();
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
      {/* Background gradient to match Hero theme */}
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

      {/* Header Section */}
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
            Event Guidelines
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
          Rules
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light tracking-wide max-w-3xl mx-auto"
        >
          To ensure a fair and enjoyable competition, all participants are
          required to follow these guidelines carefully throughout the event.
        </motion.p>
      </div>

      {/* Rules List */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6 text-left">
        {rulesList.length === 0 ? (
          <p className="text-white/70 text-center text-lg">
            Loading rules...
          </p>
        ) : (
          rulesList.map((rule, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group flex items-start gap-4 bg-white/5 hover:bg-[#e99b63]/10 transition-all duration-300 rounded-xl px-6 py-4 border border-white/10 hover:border-[#e99b63]/40 backdrop-blur-md"
            >
              <span className="text-[#e99b63] font-bold text-lg md:text-xl">
                {i + 1}.
              </span>
              <p className="text-white/80 text-base md:text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                {rule}
              </p>
            </motion.div>
          ))
        )}
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 w-screen h-full bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/70 pointer-events-none" />
    </motion.section>
  );
};

export default Rules;
