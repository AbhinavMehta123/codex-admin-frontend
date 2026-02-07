"use client";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0a] text-white py-10 border-t border-[#e99b63]/30 overflow-hidden">
      {/* Background Gradient (matches Hero theme) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a]/80 blur-2xl pointer-events-none" />

      {/* Floating glow elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#e99b63]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[250px] h-[250px] bg-[#ffcc8f]/10 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        {/* Logo and text */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <motion.img
            src="/WebAssets/WhatsApp Image 2025-12-28 at 9.03.33 PM.jpeg"
            alt="ALFA Coding Club Logo"
            className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-full border border-[#e99b63]/50 shadow-[0_0_20px_#e99b63]/30"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
          <div>
            <p className="text-[#e99b63] text-xl font-bold tracking-wide">
              Developed by
            </p>
            <h3 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">
              ALFA Coding Club
            </h3>
          </div>
        </div>

        {/* Social Links (Optional / Placeholder) */}
        <div className="flex items-center gap-6 text-2xl mt-4 md:mt-0">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#e99b63] transition-colors"
          >
            <i className="bx bxl-instagram"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#e99b63] transition-colors"
          >
            <i className="bx bxl-github"></i>
          </a>
          <a
            href="mailto:alfacodingclub@gmail.com"
            className="text-white hover:text-[#e99b63] transition-colors"
          >
            <i className="bx bxl-linkedin-square"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 text-center text-sm text-white/50 mt-10 tracking-wide">
        © {new Date().getFullYear()} CODEX-BUILD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
