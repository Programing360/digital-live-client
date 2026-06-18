"use client";

import React, { useState } from "react";
import { Button, Input, Link } from "@heroui/react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

// Flat Google Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.09 3.59-5.17 3.59-8.46z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.46v3.12C3.43 21.35 7.47 24 12 24z"/>
    <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.59H1.46C.53 8.41 0 10.17 0 12s.53 3.59 1.46 5.41l3.81-3.12z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.93 1.19 15.24 0 12 0 7.47 0 3.43 2.65 1.46 6.59l3.81 3.12c.95-2.85 3.6-4.96 6.73-4.96z"/>
  </svg>
);

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: ""
  });
  
  // Toggling state variable to drive show/hide input visibility type switching
  const [isVisible, setIsVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Required Fields Missing",
        text: "Please populate all necessary user profile validation inputs.",
        confirmButtonColor: "#5850EC",
      });
      return false;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password Strength",
        text: "Your account credentials length must contain at least 6 characters.",
        confirmButtonColor: "#5850EC",
      });
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Missing Upper Case Character",
        text: "Your structural password syntax must feature at least one uppercase character.",
        confirmButtonColor: "#5850EC",
      });
      return false;
    }
    if (!/[a-z]/.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Missing Lower Case Character",
        text: "Your structural password syntax must feature at least one lowercase character.",
        confirmButtonColor: "#5850EC",
      });
      return false;
    }

    return true;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    Swal.fire({
      icon: "success",
      title: "Registration Success!",
      text: `Welcome aboard, ${formData.name}! Your public lesson workspace is prepared.`,
      timer: 3500,
      showConfirmButton: false,
    });
  };

  const handleGoogleLogin = () => {
    Swal.fire({
      title: "Connecting Account",
      text: "Securing authentication connection to Google cloud nodes...",
      timer: 1500,
      didOpen: () => Swal.showLoading(),
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Google Authentication Verified",
        showConfirmButton: false,
        timer: 1500
      });
    });
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none font-sans">
      <div className="w-full max-w-5xl bg-white border border-slate-100/80 rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[620px]">
        
        {/* ================= LEFT SECTION: ENTRANCE SIGN UP FORM ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
          className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs font-semibold text-slate-400 mt-1">
              Start documenting and organizing your life journeys today.
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
              className="font-medium"
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
              className="font-medium"
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
              className="font-medium"
              value={formData.photoUrl}
              onChange={handleInputChange}
            />

            {/* Password Input Field featuring Show and Hide Visibility System */}
            <Input
              type={isVisible ? "text" : "password"}
              label="Account Password"
              name="password"
              placeholder="••••••••"
              labelPlacement="outside"
              variant="bordered"
              radius="xl"
              size="lg"
              className="font-medium"
              value={formData.password}
              onChange={handleInputChange}
              endContent={
                <button 
                  className="focus:outline-none transition-transform active:scale-90" 
                  type="button" 
                  onClick={() => setIsVisible(!isVisible)}
                  aria-label="toggle password visibility"
                >
                  {!isVisible ? <Eye size={20} className="text-black" /> : <EyeOff />}
                </button>
              }
              
            />

            <Button
              type="submit"
              size="lg"
              className="bg-slate-900 text-white font-bold tracking-wide mt-3 hover:bg-slate-800 transition-colors active:scale-98 shadow-sm w-full"
              radius="xl"
            >
              Sign Up
            </Button>
          </form>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">or continue with</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <Button
            size="lg"
            variant="bordered"
            className="border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 transition-colors active:scale-98 shadow-sm mx-auto"
            radius="xl"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>

          <p className="text-xs font-semibold text-slate-400 text-center mt-6">
            Already have an active account?{" "}
            <Link href="/auth/login" className="text-xs font-extrabold text-indigo-600 hover:underline">
              Log In
            </Link>
          </p>
        </motion.div>

        {/* ================= RIGHT SECTION: DECORATIVE LOTTIE CONTAINER ================= */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-6 bg-gradient-to-tr from-indigo-600 via-[#5850EC] to-purple-600 p-12 hidden lg:flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-[-20%] right-[-20%] w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-15%] w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <motion.div 
            animate={{ y: ["0px", "-16px", "0px"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-sm aspect-square bg-white/10 backdrop-blur-md rounded-[28px] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 text-center z-10"
          >
            <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center border border-white/10 mb-6 relative">
              <span className="text-4xl animate-bounce">✨</span>
              <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin" style={{ animationDuration: '20s' }} />
            </div>

            <h3 className="text-white font-extrabold text-lg tracking-tight">
              Capture Your Reflections
            </h3>
            <p className="text-indigo-100/80 text-xs font-medium leading-relaxed mt-2 max-w-[240px]">
              Join thousands of learners archive wisdom milestones globally daily.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}