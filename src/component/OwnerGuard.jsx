"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { motion } from "framer-motion";
import { ShieldAlert, LogIn, Lock } from "lucide-react";

export default function OwnerGuard({
  user,
  ownerId,
  children,
  fallback = null,
}) {
  const router = useRouter();
  const pathname = usePathname(); // Captures the exact dynamic details page location
  const isOwner = user?.id === ownerId;

  // 1. STATE: User is not authenticated (Login Required)
  if (!user) {
    const handleLoginRedirect = () => {
      // Append the current path so the login page knows exactly where to return the user
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
    };

    return (
      <div className="w-full flex items-center justify-center p-4 min-h-[450px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="border border-slate-100 dark:border-zinc-800 rounded-[24px] bg-white dark:bg-zinc-900 shadow-xl overflow-hidden relative p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4">
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-inner z-10">
              <LogIn size={26} strokeWidth={2.2} />
            </div>
            
            <div className="space-y-1.5 z-10">
              <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                Authentication Required
              </h2>
              <p className="text-xs text-default-400 max-w-xs mx-auto leading-relaxed">
                Please securely sign into your profile account to verify ownership and access this interface.
              </p>
            </div>

            <Button
              onPress={handleLoginRedirect}
              color="secondary"
              radius="full"
              className="w-full max-w-[200px] font-bold text-xs shadow-md shadow-indigo-500/10 h-9 mt-2 z-10"
            >
              Sign In to Platform
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  // 2. STATE: User is logged in but does not own the content (Access Denied)
  if (!isOwner) {
    return (
      fallback || (
        <div className="w-full flex items-center justify-center p-4 min-h-[350px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <Card className="border border-rose-100 dark:border-rose-950/30 rounded-[24px] bg-rose-50/30 dark:bg-rose-950/10 shadow-sm overflow-hidden relative p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="p-3.5 bg-rose-100/70 dark:bg-rose-950/50 border border-rose-200/50 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl">
                <ShieldAlert size={26} strokeWidth={2.2} />
              </div>
              
              <div className="space-y-1.5">
                <h2 className="text-xl font-black text-rose-700 dark:text-rose-400 tracking-tight flex items-center justify-center gap-2">
                  <Lock size={18} strokeWidth={2.5} /> Access Restrained
                </h2>
                <p className="text-xs text-rose-600/70 dark:text-rose-400/60 max-w-xs mx-auto leading-relaxed font-medium">
                  You do not hold authorship clearances to view or overwrite these specific content metrics.
                </p>
              </div>

              <Button
                onPress={() => router.back()} // Instantly returns them back to the Details Page they came from
                variant="flat"
                color="danger"
                radius="full"
                className="font-bold text-xs h-9 px-6 mt-2"
              >
                Go Back to Details
              </Button>
            </Card>
          </motion.div>
        </div>
      )
    );
  }

  // 3. STATE: Cleared authorized view (User matches Owner ID perfectly)
  return <>{children}</>;
}