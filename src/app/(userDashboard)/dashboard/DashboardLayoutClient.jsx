"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@heroui/react";
import { BookOpen, Menu, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Sidebar from '@/component/Dashboard/Sidebar';

// নতুন তৈরি করা সাইডবার কম্পোনেন্টটি ইমপোর্ট করুন


export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // if (user) {
  //   await requiredRole('user');
  // }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 antialiased">
      
      {/* MOBILE HEADER BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1E1B4B] text-white flex items-center justify-between px-4 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600/30 rounded-lg">
            <BookOpen className="text-indigo-400" size={24} />
          </div>
          <span className="font-bold text-lg tracking-wide">Digital Life Lessons</span>
        </div>
        <Button isIconOnly variant="light" className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* কাস্টম সাইডবার কম্পোনেন্ট ইনজেকশন */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        user={user}
      />

      {/* VIEWPORT CANVAS CONTAINER */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-8 lg:p-10 pt-24 lg:pt-10 transition-all duration-300 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}