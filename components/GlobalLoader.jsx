"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // ✅ Detect network status (works offline-first on mobile)
  useEffect(() => {
    const updateNetwork = () => {
      const offline = !navigator.onLine;
      setIsOffline(offline);
      setIsVisible(true);
      setIsLoading(true);

      if (!offline) {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    updateNetwork();
    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);
    return () => {
      window.removeEventListener("online", updateNetwork);
      window.removeEventListener("offline", updateNetwork);
    };
  }, []);

  // ✅ Show loader when route changes
  useEffect(() => {
    setIsLoading(true);
    setIsVisible(true);

    const loadTimer = setTimeout(() => setIsLoading(false), 900);
    const fadeTimer = setTimeout(() => setIsVisible(false), 1500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(fadeTimer);
    };
  }, [pathname]);

  // ✅ Disable scrolling while loader is visible
  useEffect(() => {
    if (isLoading || isOffline) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      // Reset on unmount
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isLoading, isOffline]);

  // 🟢 Keep visible if offline
  if (!isVisible && !isOffline) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-center transition-opacity duration-500 ${
        isLoading || isOffline ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Loader />

      {isOffline && (
        <div className="absolute bottom-16 px-6 py-3 rounded-full bg-[#1a1a1a]/80 border border-[#e99b63]/40 backdrop-blur-md text-[#e99b63] font-semibold text-sm tracking-wide shadow-lg">
          ⚠️ You are offline. Cached content is shown.
        </div>
      )}
    </div>
  );
}
