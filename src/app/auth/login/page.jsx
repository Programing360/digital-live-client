"use client";

import React, { useState } from "react";
import { Button, Input, Link } from "@heroui/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";

// Enterprise Smooth Eye Icons
const EyeFilledIcon = () => (
  <svg
    className="w-5 h-5 text-slate-400 dark:text-purple-300/40"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeSlashFilledIcon = () => (
  <svg
    className="w-5 h-5 text-slate-400 dark:text-purple-300/40"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.09 3.59-5.17 3.59-8.46z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.46v3.12C3.43 21.35 7.47 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.59H1.46C.53 8.41 0 10.17 0 12s.53 3.59 1.46 5.41l3.81-3.12z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.93 1.19 15.24 0 12 0 7.47 0 3.43 2.65 1.46 6.59l3.81 3.12c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  // Mouse parallax physics for the right side diagram
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = event.clientX - rect.left - width / 2;
    const mouseYVal = event.clientY - rect.top - height / 2;
    mouseX.set(mouseXVal);
    mouseY.set(mouseYVal);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Required Fields Missing",
        text: "Please fill up all the form fields to continue.",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (data?.user) {
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Login verified successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    console.log(error);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: `${error.message}`,
        timer: 3500,
        showConfirmButton: false,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({ provider: "google" });
    if (data?.user) {
      router.push("/");
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 dark:bg-[#09021a] transition-colors duration-500 flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none font-sans relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl bg-white/80 dark:bg-[#0f0226]/40 border border-slate-200/60 dark:border-purple-500/10 rounded-[32px] shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[620px]">
        {/* ================= LEFT SECTION: SIGN IN FORM ================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-transparent"
        >
          <div className="mb-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-3">
              <Sparkles size={12} className="animate-pulse" /> Secure Core Sync
              v2.6
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs font-semibold text-slate-400 dark:text-purple-300/30 mt-1.5">
              Sign in to manage and review your custom spaces.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
            <Input
              type="email"
              label="Email Address"
              name="email"
              placeholder="name@example.com"
              labelPlacement="outside"
              variant="bordered"
              radius="xl"
              size="lg"
              className="font-medium text-slate-900 dark:text-white"
              startContent={<Mail size={16} className="text-slate-400 mr-1" />}
              value={formData.email}
              onChange={handleInputChange}
            />

            <div className="flex flex-col gap-1 relative">
              {/* <Lock size={16} className="text-slate-400 mr-1 absolute left-3 top-1/2 -translate-y-1/2 " /> */}
              <Input
                type={isVisible ? "text" : "password"}
                label="Password"
                name="password"
                placeholder="••••••••"
                labelPlacement="outside"
                variant="bordered"
                radius="xl"
                size="lg"
                className="font-medium text-slate-900 dark:text-white "
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                className="focus:outline-none  transition-transform active:scale-90 text-slate-400 hover:text-indigo-500 bg-white dark:bg-[#232543] dark:text-white  absolute right-0"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
              </Button>
              <div className="flex justify-end mt-1.5 px-1">
                <Link
                  href="#"
                  className="text-[11px] font-bold text-slate-400 dark:text-purple-300/30 hover:text-indigo-500 dark:hover:text-[#00e5b4] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="bg-slate-900 dark:bg-[#2b1860] text-white font-bold tracking-wide mt-2 hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all active:scale-98 shadow-lg shadow-indigo-600/10 w-full rounded-2xl h-12"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-slate-200/60 dark:border-purple-500/10"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 dark:text-purple-300/20 uppercase tracking-widest">
              or login with
            </span>
            <div className="flex-grow border-t border-slate-200/60 dark:border-purple-500/10"></div>
          </div>

          {/* Google Button */}
          <Button
            size="lg"
            variant="bordered"
            className="border-slate-200 dark:border-purple-500/10 bg-white dark:bg-purple-950/20 hover:bg-slate-50 dark:hover:bg-purple-950/40 font-bold text-slate-700 dark:text-purple-100 transition-all active:scale-98 shadow-sm rounded-2xl h-12 mx-auto"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>

          <p className="text-xs font-semibold text-slate-400 dark:text-purple-300/30 text-center mt-8">
            New to our space?{" "}
            <Link
              href="/auth/register"
              className="text-xs font-extrabold text-indigo-600 dark:text-[#00e5b4] hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </motion.div>

        {/* ================= RIGHT SECTION: CONNECTED INFRASTRUCTURE ART ================= */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-6 bg-gradient-to-tr from-[#0b031e] via-[#15063b] to-[#25004d] p-12 hidden lg:flex flex-col items-center justify-center relative overflow-hidden"
        >
          {/* Futuristic Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="w-full flex flex-col items-center justify-center z-10 space-y-8"
          >
            {/* Implemented Animated Node Pipeline Matrix */}
            <div className="relative w-72 h-72 flex items-center justify-center">
              {/* Outer Orbit Pipeline Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full rounded-full border border-dashed border-purple-500/20 flex items-center justify-center"
              >
                <div className="absolute top-0 w-3 h-3 rounded-full bg-[#00e5b4] shadow-[0_0_12px_#00e5b4]" />
                <div className="absolute bottom-0 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1]" />
              </motion.div>

              {/* Inner Orbit Pipeline Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-48 h-48 rounded-full border border-dashed border-indigo-500/20"
              >
                <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
              </motion.div>

              {/* Main Core Node Platform */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center p-4 relative"
              >
                <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-xl shadow-indigo-500/30 mb-2">
                  <ShieldCheck size={28} />
                </div>
                <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
                  Secure Link
                </span>

                {/* Floating Micro Nodes */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 px-2 py-1 rounded-lg bg-[#00e5b4]/10 border border-[#00e5b4]/20 text-[#00e5b4] text-[9px] font-bold"
                >
                  AI.GO Active
                </motion.div>
              </motion.div>

              {/* Connected Line Strands (SaaS Pipeline style) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
                viewBox="0 0 100 100"
              >
                <motion.path
                  d="M 50,0 L 50,34 M 0,50 L 34,50 M 50,66 L 50,100 M 66,50 L 100,50"
                  stroke="url(#gradient)"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#00e5b4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="text-center space-y-2 max-w-xs">
              <h3 className="text-white font-extrabold text-xl tracking-tight flex items-center justify-center gap-2">
                Omnichannel Cluster Data{" "}
                <ArrowRight size={16} className="text-[#00e5b4]" />
              </h3>
              <p className="text-indigo-200/50 text-xs font-medium leading-relaxed">
                Connect and sync saved profiles instantly with private cloud
                node endpoints.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
