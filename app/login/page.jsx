"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";
import ElegantShape from "@/components/elegantShape";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-dancing-script",
});

const LoginPage = () => {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(false); // toggle login/register
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Login / Register handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const endpoint = isRegister
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/register`
                : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`;

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (res.ok && data.token) {
                localStorage.setItem("adminToken", data.token);
                setMessage("✅ Login successful! Redirecting...");
                setTimeout(() => router.push("/admin/dashboard"), 1000);
            } else if (res.ok) {
                // If register succeeded but token not included
                setMessage("✅ Account created! Please log in.");
                setIsRegister(false);
            } else {
                setMessage(`❌ ${data.error}`);
            }
        } catch (err) {
            setMessage("❌ Server error, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative py-32 px-6 flex flex-col items-center justify-center text-white overflow-hidden w-full min-h-screen bg-[#0a0a0a]">
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

            {/* Header */}
            <motion.h1
                className={cn(
                    "text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#e99b63] via-[#ffcc8f] to-[#e99b63]/80 relative z-60",
                    dancingScript.className
                )}
            >
                {isRegister ? "Admin Register" : "Admin Login"}
            </motion.h1>

            {/* Form */}
            <div className="relative z-10 w-full max-w-md bg-white/5 border border-[#e99b63]/30 rounded-2xl p-8 backdrop-blur-lg shadow-lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input
                        type="text"
                        placeholder="Username"
                        className="bg-transparent border border-[#e99b63]/40 p-3 rounded-lg focus:outline-none focus:border-[#e99b63] text-white"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent border border-[#e99b63]/40 p-3 rounded-lg focus:outline-none focus:border-[#e99b63] text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-[#e99b63] to-[#ffcc8f] text-black font-bold py-3 rounded-lg hover:opacity-90 transition"
                    >
                        {loading
                            ? "Please wait..."
                            : isRegister
                                ? "Create Admin Account"
                                : "Login"}
                    </button>
                </form>

                {/* Toggle link */}
                <p className="text-center mt-6 text-white/70">
                    {isRegister ? "Already have an account?" : "No account yet?"}{" "}
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-[#e99b63] font-semibold hover:underline"
                    >
                        {isRegister ? "Login here" : "Register here"}
                    </button>
                </p>

                {/* Status Message */}
                {message && (
                    <p
                        className={`mt-4 text-center ${message.includes("✅") ? "text-green-400" : "text-red-400"
                            }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
};

export default LoginPage;
