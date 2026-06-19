"use client";
import React, { useState, useEffect } from 'react';
import { Button, Card, Avatar, Tooltip } from "@heroui/react";
import { 
  LayoutDashboard, PlusCircle, BookOpen, Heart, 
  User, Users, FolderHeart, Settings, LogOut, Menu, X 
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import DashboardHome from '@/component/userDashboard/DashboardHome';
import AddLesson from './add-lesson/page';
import MyLessons from './my-lessons/page';
import MyFavorites from './my-favorites/page';
import ProfileView from './profile/page';

// View Imports

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user] = useState({
    name: "Riad Hassan",
    email: "riad@example.com",
    avatar: "https://i.pravatar.cc/150?u=riad",
    isPremium: false // Toggle to test premium logic limitations
  });

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "add-lesson", label: "Add Lesson", icon: <PlusCircle size={20} /> },
    { id: "my-lessons", label: "My Lessons", icon: <BookOpen size={20} /> },
    { id: "favorites", label: "Favorites", icon: <Heart size={20} /> },
    { id: "profile", label: "Profile", icon: <User size={20} /> },
  ];

  const adminItems = [
    { id: "manage-users", label: "Manage Users", icon: <Users size={20} /> },
    { id: "manage-lessons", label: "Manage Lessons", icon: <FolderHeart size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const renderView = () => {
    switch(activeTab) {
      case "dashboard": return <DashboardHome setActiveTab={setActiveTab} user={user} />;
      case "add-lesson": return <AddLesson user={user} />;
      case "my-lessons": return <MyLessons user={user} />;
      case "favorites": return <MyFavorites user={user} />;
      case "profile": return <ProfileView user={user} />;
      default: return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 antialiased border">
      
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

      {/* PERSISTENT SIDEBAR LAYOUT */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0F0C24] text-slate-300 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between pt-20 lg:pt-6 pb-6 shadow-xl
        ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="hidden lg:flex items-center gap-3 px-6 mb-8">
            <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
              <BookOpen className="text-indigo-400" size={26} />
            </div>
            <div>
              <h1 className="font-black text-white text-lg tracking-tight leading-none">Digital</h1>
              <p className="text-xs text-indigo-300 font-medium tracking-wide mt-1">Life Lessons</p>
            </div>
          </div>

          {/* Core App Views Navigation */}
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                  ${activeTab === item.id 
                    ? "bg-indigo-600/30 text-white border-l-4 border-indigo-500 shadow-inner" 
                    : "hover:bg-white/5 text-slate-400 hover:text-slate-200"}`}
              >
                {item.icon} {item.label}
              </button>
            ))}

            {/* Admin Block Divider */}
            <div className="pt-6 pb-2 px-4 text-[11px] font-bold text-slate-500 tracking-widest uppercase">Admin</div>
            
            {adminItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 cursor-not-allowed opacity-60"
                disabled
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Logout Action */}
        <div className="px-3 border-t border-slate-800/60 pt-4">
          <Button 
            variant="light" 
            className="w-full justify-start text-danger hover:bg-danger-500/10 font-bold rounded-xl"
            startContent={<LogOut size={20} />}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* VIEWPORT CANVAS CONTAINER */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-8 lg:p-10 pt-24 lg:pt-10 transition-all duration-300 max-w-7xl mx-auto w-full">
        {renderView()}
      </main>
    </div>
  );
}