"use client";

import { useState, useEffect } from "react";
import { Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Crown,
  Check,
  Sparkles,
  ShieldCheck,
  Rocket,
  BookOpen,
} from "lucide-react";

const comparison = [
  { feature: "Number of lessons", free: "5 / Month", premium: "Unlimited" },
  { feature: "Premium lesson creation", free: false, premium: true },
  { feature: "Ad-free experience", free: false, premium: true },
  { feature: "Priority listing", free: false, premium: true },
  { feature: "Access premium lessons", free: false, premium: true },
  { feature: "Verified community badge", free: false, premium: true },
  { feature: "Early feature access", free: false, premium: true },
  { feature: "Priority support", free: false, premium: true },
];

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
      });
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-default-100/50 py-20 dark:to-black/20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Chip
              color="warning"
              variant="flat"
              className="px-4 py-1 border border-warning-200/30 backdrop-blur-md text-xs font-bold uppercase tracking-wider"
              startContent={<Crown size={14} className="text-warning-500" />}
            >
              Lifetime Premium Access
            </Chip>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black mt-6 tracking-tight bg-gradient-to-r from-slate-900 via-violet-950 to-slate-900 dark:from-white dark:via-violet-200 dark:to-white bg-clip-text text-transparent">
            Unlock Everything
          </h1>

          <p className="text-default-500 mt-5 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Create unlimited lessons, remove ads, unlock premium content, earn a
            verified badge, and enjoy lifetime access with a single one-time payment.
          </p>
        </div>

        {/* Feature Cards Grid Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: <Rocket size={28} className="text-violet-500" />, title: "Unlimited Growth", desc: "Create and publish unlimited digital life lessons." },
            { icon: <BookOpen size={28} className="text-indigo-500" />, title: "Premium Content", desc: "Access exclusive wisdom and content from chosen creators." },
            { icon: <ShieldCheck size={28} className="text-cyan-500" />, title: "Verified Status", desc: "Stand out elegantly with your premium profile community badge." }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="group rounded-3xl border border-default-200/60 dark:border-white/5 p-8 bg-content1 shadow-sm hover:shadow-xl hover:border-violet-500/20 dark:hover:bg-zinc-900/40 transition-all duration-300"
            >
              <div className="p-3 bg-default-100 dark:bg-white/5 w-fit rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-zinc-100">{card.title}</h3>
              <p className="text-default-400 mt-2.5 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table Section */}
        <div 
          className="mt-20 overflow-hidden rounded-3xl border border-default-200/60 dark:border-white/5 bg-content1/70 backdrop-blur-md shadow-lg"
          data-aos="fade-up"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-default-200/60 dark:border-white/5 bg-default-50/50 dark:bg-white/[0.02]">
                  <th className="p-6 font-semibold text-sm text-default-600">Features</th>
                  <th className="p-6 font-semibold text-sm text-default-600 text-center w-40">Free</th>
                  <th className="p-6 font-bold text-sm text-warning text-center w-40 bg-warning-50/10 dark:bg-warning-500/[0.02]">Premium ⭐</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-default-100 dark:divide-white/5">
                {comparison.map((item) => (
                  <tr 
                    key={item.feature} 
                    className="hover:bg-default-50/40 dark:hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="p-5 text-sm font-medium text-slate-700 dark:text-zinc-300">{item.feature}</td>

                    <td className="p-5 text-center text-sm font-medium text-default-500">
                      {typeof item.free === "boolean" ? (
                        item.free ? (
                          <Check className="mx-auto text-default-600" size={18} />
                        ) : (
                          <span className="text-default-300 dark:text-zinc-700 font-normal">✕</span>
                        )
                      ) : (
                        item.free
                      )}
                    </td>

                    <td className="p-5 text-center text-sm font-bold bg-warning-50/[0.05] dark:bg-warning-500/[0.01]">
                      {typeof item.premium === "boolean" ? (
                        item.premium ? (
                          <motion.div initial={{ scale: 0.5 }} whileInView={{ scale: 1 }} viewport={{ once: true }}>
                            <Check className="mx-auto text-success drop-shadow-sm" size={20} strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <span className="text-default-300 dark:text-zinc-700 font-normal">✕</span>
                        )
                      ) : (
                        <span className="text-warning-600 dark:text-warning-400">{item.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Pricing Layout Box */}
        <div className="max-w-lg mx-auto mt-20" data-aos="zoom-in" data-aos-offset="100">
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 p-10 text-center text-white shadow-2xl shadow-indigo-500/20 dark:shadow-cyan-500/10"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-fit mx-auto"
            >
              <Sparkles className="mx-auto mb-4 text-warning-300" size={44} />
            </motion.div>

            <h2 className="text-3xl font-black tracking-tight">Premium Lifetime</h2>

            <div className="my-6 relative flex justify-center items-center gap-1.5">
              <span className="text-5xl md:text-6xl font-black tracking-tight drop-shadow-md">৳1,500</span>
            </div>

            <p className="text-white/80 text-sm max-w-xs mx-auto font-medium">
              One-time payment. Lifetime access updates. No recurring setups.
            </p>

            <Button
              size="lg"
              radius="full"
              className="mt-8 font-bold px-10 bg-white text-indigo-600 shadow-xl shadow-black/10 hover:bg-neutral-50 hover:scale-105 active:scale-98 transition-all h-13 text-sm"
              isLoading={loading}
              onPress={handleUpgrade}
            >
              Choose Premium Plan
            </Button>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}