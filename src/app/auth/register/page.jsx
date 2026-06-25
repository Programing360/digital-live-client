"use client";

import React, { useState } from "react";
import { Button, Input, Link } from "@heroui/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Swal from "sweetalert2";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Image,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  // Mouse Parallax Engine for 3D Isometric Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

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

  const validateForm = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please populate all necessary inputs.",
        confirmButtonColor: "#6366f1",
      });
      return false;
    }
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Password",
        text: "Must be 6+ chars with mixed case.",
        confirmButtonColor: "#6366f1",
      });
      return false;
    }
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.photoUrl,
      callbackURL: "/",
    });

    if (data?.user) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Welcome aboard, ${formData.name}!`,
        timer: 2500,
        showConfirmButton: false,
      });
      router.push("/auth/login");
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.message,
        timer: 3500,
        showConfirmButton: false,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({ provider: "google" });
    if (data?.user) router.push("/");
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 dark:bg-[#080214] transition-colors duration-500 flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none font-sans relative overflow-hidden">
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl bg-white/90 dark:bg-[#0e0422]/60 border border-slate-200/80 dark:border-purple-500/10 rounded-[32px] shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[640px]">
        {/* ================= LEFT SECTION: FORM ELEMENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-transparent"
        >
          <div className="mb-6">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs font-semibold text-slate-400 dark:text-purple-300/30 mt-1.5">
              Start documenting and organizing your cloud journeys today.
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              label="Full Name"
              name="name"
              placeholder="Enter your name"
              labelPlacement="outside"
              variant="bordered"
              radius="xl"
              size="lg"
              className="font-medium text-slate-900 dark:text-white"
              startContent={<User size={16} className="text-slate-400 mr-1" />}
              value={formData.name}
              onChange={handleInputChange}
            />

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

            <Input
              type="url"
              label="Photo URL (Optional)"
              name="photoUrl"
              placeholder="https://example.com/avatar.jpg"
              labelPlacement="outside"
              variant="bordered"
              radius="xl"
              size="lg"
              className="font-medium text-slate-900 dark:text-white"
              startContent={<Image size={16} className="text-slate-400 mr-1" />}
              value={formData.photoUrl}
              onChange={handleInputChange}
            />

            <div className="flex w-full relative">
              <Input
                type={isVisible ? "text" : "password"}
                label="Account Password"
                name="password"
                placeholder="••••••••"
                labelPlacement="outside"
                variant="bordered"
                radius="xl"
                size="lg"
                className="font-medium text-slate-900 dark:text-white w-full"
                startContent={
                  <Lock size={16} className="text-slate-400 mr-1" />
                }
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                className="focus:outline-none transition-transform active:scale-90 text-slate-400 hover:text-indigo-500 bg-indigo-400 dark:text-white absolute right-0"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-slate-900 dark:bg-indigo-600 text-white font-bold tracking-wide mt-3 hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all active:scale-98 shadow-md rounded-2xl h-12 w-full"
            >
              Sign Up
            </Button>
          </form>

          {/* Divider Elements */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-200/60 dark:border-purple-500/10"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 dark:text-purple-300/20 uppercase tracking-widest">
              or continue with
            </span>
            <div className="flex-grow border-t border-slate-200/60 dark:border-purple-500/10"></div>
          </div>

          <Button
            size="lg"
            variant="bordered"
            className="border-slate-200 dark:border-purple-500/10 bg-white dark:bg-purple-950/20 hover:bg-slate-50 dark:hover:bg-purple-950/40 font-bold text-slate-700 dark:text-purple-100 transition-colors rounded-2xl h-12 mx-auto"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>

          <p className="text-xs font-semibold text-slate-400 dark:text-purple-300/30 text-center mt-6">
            Already have an active account?{" "}
            <Link
              href="/auth/login"
              className="text-xs font-extrabold text-indigo-600 dark:text-[#00e5b4] hover:underline"
            >
              Log In
            </Link>
          </p>
        </motion.div>

        {/* ================= RIGHT SECTION: ISOMETRIC DATA PIPELINE ART ================= */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-6 bg-gradient-to-tr from-[#050112] via-[#0d0426] to-[#1a003b] p-12 hidden lg:flex flex-col items-center justify-center relative overflow-hidden"
        >
          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            transition={{ type: "spring", stiffness: 70, damping: 22 }}
            className="w-full flex flex-col items-center justify-center z-10 space-y-12"
          >
            {/* Isometric Architecture Representation */}
            <div className="relative w-80 h-64 flex items-center justify-center perspective-1000">
              {/* Central Processor Node (Inspired by BISS Gmbh Style) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-40 h-40 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 border-2 border-indigo-500/40 rounded-[36px] shadow-[0_30px_60px_-15px_rgba(99,102,241,0.3)] flex flex-col items-center justify-center relative z-20 backdrop-blur-md"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#00e5b4] to-indigo-500 text-white shadow-lg">
                  <ShieldCheck size={32} />
                </div>
                <div className="mt-3 text-[10px] font-black tracking-widest text-[#00e5b4] uppercase">
                  BISS / AI.GO
                </div>

                {/* Embedded Pulse Rings */}
                <div
                  className="absolute -inset-2 border border-dashed border-indigo-400/20 rounded-[44px] animate-spin"
                  style={{ animationDuration: "40s" }}
                />
              </motion.div>

              {/* Orbital Data Strands (Bottom Plane Connections) */}
              <div className="absolute bottom-4 inset-x-0 flex justify-between px-6 opacity-60 z-10">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      repeat: Infinity,
                    }}
                    className="w-4 h-4 rounded-md bg-purple-500/20 border border-purple-400/40 shadow-[0_0_10px_#a855f7]"
                  />
                ))}
              </div>

              {/* Data Floating Bits */}
              <motion.div
                animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-6 left-6 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[#00e5b4] text-[9px] font-black"
              >
                DATA SYNCED
              </motion.div>

              <motion.div
                animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-6 right-6 px-2 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black"
              >
                NODE.ACTIVE
              </motion.div>
            </div>

            <div className="text-center space-y-2 max-w-xs">
              <h3 className="text-white font-extrabold text-xl tracking-tight">
                Secure Automated Infra
              </h3>
              <p className="text-indigo-200/40 text-xs font-medium leading-relaxed">
                Experience real-time telemetry pipelines and cross-platform
                infrastructure encryption natively.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
