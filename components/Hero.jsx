"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import ElegantShape from "./elegantShape";
import { Button } from "./ui/moving-border";
import Link from "next/link";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dancing-script",
});

export default function Hero({
  badge = "CODEX-BUILD • ALFA CODING CLUB",
  title1 = "Developing",
  title2 = "The Future",
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a] mt-8"
    >
      {/* ✨ Soft ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e99b63]/[0.08] via-[#1a1a1a] to-[#e99b63]/[0.15] blur-3xl" />

      {/* ✨ Floating abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={10}
          gradient="from-[#e99b63]/[0.80] to-[#ffcc8f]/[0.60]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-amber-400/[0.5] to-amber-200/[0.4]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-[#ffb87a]/[0.55] to-[#e99b63]/[0.45]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={220}
          height={60}
          rotate={20}
          gradient="from-[#ffcc8f]/[0.6] to-[#e99b63]/[0.45]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={160}
          height={40}
          rotate={-25}
          gradient="from-[#ffb87a]/[0.6] to-[#e99b63]/[0.5]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>



      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* 🎖️ Full Circle Moving Border Badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 md:mb-12 inline-block"
          >
            <Button
              borderRadius="1.75rem"
              duration={4000}
              containerClassName="h-10 w-auto p-[1px]"
              borderClassName="bg-[conic-gradient(from_90deg_at_50%_50%,#e99b63_0%,#ffcc8f_50%,#e99b63_100%)] opacity-60"
              className="bg-[#0a0a0a] text-[#e99b63]/90 text-sm font-medium tracking-wide px-6 py-2 border-none backdrop-blur-3xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#e99b63] shadow-[0_0_8px_#e99b63]" />
                {badge}
              </span>
            </Button>
          </motion.div>

          {/* Headings */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#e99b63] via-[#ffcc8f] to-[#e99b63]/80 font-bold text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
                  dancingScript.className
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/50 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Join{" "}
              <span className="text-[#e99b63] font-semibold">
              CODEX Build
              </span>{" "}
              is a fast-paced development challenge where participants create innovative applications powered by Artificial Intelligence.
            </p>
            <Link href="/login">
            <button className="cursor-pointer w-full md:w-auto px-10 py-5 rounded-2xl bg-[#e99b63] text-black font-bold  text-[14px] md:text-[16px] tracking-[0.25em] hover:scale-105 hover:shadow-[0_0_20px_#e99b63]/60 transition-all duration-300">
              Get Started
            </button>
            </Link>

          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/70 pointer-events-none" />
    </div>
  );
}