"use client";

import React, { useState } from "react";
import { Button, Input, Link } from "@heroui/react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// Eye Icons for Password Visibility toggling
const EyeFilledIcon = () => (
  <svg
    className="w-5 h-5 text-slate-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const EyeSlashFilledIcon = () => (
  <svg
    className="w-5 h-5 text-slate-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.39 2.59-3.21 3.14-5.24-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
  </svg>
);

// Flat Google Icon
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

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
        text: "Please check your account verification parameters and complete all form inputs.",
        confirmButtonColor: "#5850EC",
      });
      return;
    }
    console.log(email, password);
    // const formData = new FormData(e.currentTarget);
    // const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
      rememberMe: true,
      callbackURL: "/",
    });
    // Success Simulation Response Layer
    console.log(error);
    if (data?.user) {
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Login verified. Opening your workspaces...",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Registration failed!",
        text: `${error.message}`,
        timer: 3500,
        showConfirmButton: false,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if (data?.user) {
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
          timer: 1500,
        });
      });

      router.push("/");
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none font-sans">
      <div className="w-full max-w-5xl bg-white border border-slate-100/80 rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[580px]">
        {/* ================= LEFT SECTION: SIGN IN FORM ================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] }}
          className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs font-semibold text-slate-400 mt-1">
              Sign in to manage and review your custom spaces.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4.5">
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

            <div className="flex flex-col gap-1 relative">
              <Input
                type={isVisible ? "text" : "password"}
                label="Password"
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
                  >
                    {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                  </button>
                }
              />
              <div className="flex justify-end mt-1 px-1">
                <Link
                  href="#"
                  className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="bg-slate-900 text-white font-bold tracking-wide mt-2 hover:bg-slate-800 transition-colors active:scale-98 shadow-sm w-full"
              radius="xl"
            >
              Sign In
            </Button>
          </form>

          {/* Contextual Action Divider Elements */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              or login with
            </span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {/* Bottom Google Sign-In Button */}
          <Button
            size="lg"
            variant="bordered"
            className="border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 transition-colors active:scale-98 shadow-sm mx-auto"
            radius="xl "
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>

          {/* Page Redirect Footer Link Node */}
          <p className="text-xs font-semibold text-slate-400 text-center mt-6">
            New to our space?{" "}
            <Link
              href="/auth/register"
              className="text-xs font-extrabold text-indigo-600 hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </motion.div>

        {/* ================= RIGHT SECTION: LOTTIE ADS WRAPPER ================= */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-6 bg-gradient-to-tr from-indigo-600 via-[#5850EC] to-purple-600 p-12 hidden lg:flex flex-col items-center justify-center relative overflow-hidden"
        >
          {/* Abstract Radial Art Elements */}
          <div className="absolute top-[-20%] right-[-20%] w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-15%] w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Ad Display Card Frame */}
          <motion.div
            animate={{ y: ["0px", "-16px", "0px"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-sm aspect-square bg-white/10 backdrop-blur-md rounded-[28px] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 text-center z-10"
          >
            {/* Lottie Node Placement Spot */}
            <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center border border-white/10 mb-6 relative">
              <span className="text-4xl animate-pulse">🔒</span>
              <div
                className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin"
                style={{ animationDuration: "25s" }}
              />
            </div>

            <h3 className="text-white font-extrabold text-lg tracking-tight">
              Secure Cloud Access
            </h3>
            <p className="text-indigo-100/80 text-xs font-medium leading-relaxed mt-2 max-w-[240px]">
              Access saved profiles and review private logs safely from any
              device endpoint.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
