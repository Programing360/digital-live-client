"use client";

import React, { useState, useEffect } from "react";
import { Key } from "@heroui/react";
import { Accordion } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Sparkles, MessageCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// SaaS mock FAQs data
const faqItems = [
  {
    id: "1",
    question: "How does the automated content auditing system work?",
    answer: "Our system utilizes advanced neural networks to scan published assets instantly. It auto-flags inconsistencies, inappropriate content, or structural deviations, notifying your routing nodes within milliseconds.",
    category: "Security"
  },
  {
    id: "2",
    question: "Can we integrate custom database structures like MongoDB or PostgreSQL?",
    answer: "Absolutely. The data pipeline maps effortlessly to both structural and non-structural instances. You can filter metrics natively via our query parameters without complex configurations.",
    category: "Integration"
  },
  {
    id: "3",
    question: "What is the performance overhead for fluid UI animations?",
    answer: "Zero performance compromises. By combining hardware-accelerated Framer Motion configurations with lightweight spring dynamics, interactions remain at a locked 60 FPS even on mobile nodes.",
    category: "Performance"
  },
  {
    id: "4",
    question: "Is there a rollback safeguard for purge-deleted elements?",
    answer: "To ensure maximum performance architecture, purge actions are non-reversible. However, we provide clear confirmation matrices and safety layers before any destructive data cascades.",
    category: "Data Management"
  }
];

export default function PremiumFAQ() {
  const [expandedKeys, setExpandedKeys] = useState(new Set(["1"]));

  // Initialize AOS Scroll Animation Node
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 py-20 px-4 transition-colors duration-500 dark:bg-[#1a0642] dark:text-white sm:px-6 lg:px-8">
      
      {/* Premium Ambient Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[30%] -left-[20%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />
        <div className="absolute top-[40%] -right-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-500/5" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        
        {/* Header Section with Staggered Entrance */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 backdrop-blur-md"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Support Core</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="text-3xl font-black tracking-tight text-slate-800 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Frequently Asked <span className="bg-gradient-to-r流 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Questions</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-lg text-sm font-medium text-default-400 leading-relaxed"
          >
            Everything you need to know about our system parameters, structural architecture, and secure auditing pipelines.
          </motion.p>
        </div>

        {/* Accordion Container Matrix */}
        <div data-aos="fade-up" data-aos-delay="200" className="w-full">
          <Accordion
            className="w-full space-y-4 p-0"
            expandedKeys={expandedKeys}
            onExpandedChange={(keys) => setExpandedKeys(keys)}
          >
            {faqItems.map((item) => {
              const isExpanded = expandedKeys.has(item.id);

              return (
                <Accordion.Item
                  key={item.id}
                  id={item.id}
                  className="group border border-default-100/80 bg-white shadow-sm hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/40 rounded-[20px] overflow-hidden transition-all duration-300 backdrop-blur-xl"
                >
                  <Accordion.Heading>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-5 sm:p-6 cursor-pointer text-left focus:outline-none">
                      <div className="flex items-center gap-4 pr-4">
                        <div className={`p-2 rounded-xl transition-all duration-300 ${
                          isExpanded 
                            ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20" 
                            : "bg-default-100/70 text-default-400 group-hover:bg-default-200/60 dark:bg-zinc-800/40 dark:group-hover:bg-zinc-800/80"
                        }`}>
                          <HelpCircle size={16} />
                        </div>
                        <span className={`text-sm sm:text-base font-bold tracking-tight transition-colors duration-200 ${
                          isExpanded ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-zinc-200"
                        }`}>
                          {item.question}
                        </span>
                      </div>

                      <Accordion.Indicator>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isExpanded 
                              ? "border-indigo-500/30 text-indigo-500 bg-indigo-500/5" 
                              : "border-default-200 text-default-400 dark:border-zinc-800"
                          }`}
                        >
                          {isExpanded ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
                        </motion.div>
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>

                  <Accordion.Panel>
                    <AnimatePresence initial={false}>
                      <Accordion.Body className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="border-t border-default-100 pt-4 dark:border-zinc-800/60"
                        >
                          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-400 leading-relaxed">
                            {item.answer}
                          </p>

                          <div className="mt-4 flex items-center gap-2">
                            <span className="text-[10px] uppercase font-black tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md">
                              {item.category}
                            </span>
                          </div>
                        </motion.div>
                      </Accordion.Body>
                    </AnimatePresence>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>

        {/* Footer Contact Wrapper CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center border border-default-100 bg-white/50 dark:border-zinc-800/40 dark:bg-zinc-900/20 rounded-[24px] p-6 backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">Still have parameters to clarify?</h4>
                <p className="text-xs text-default-400">Our administrative auditing team is live 24/7.</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto h-10 px-5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-opacity cursor-pointer"
            >
              Contact Node
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}