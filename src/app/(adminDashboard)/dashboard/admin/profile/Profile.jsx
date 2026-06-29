"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, Button, Input, Avatar, Chip, Switch } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  User, 
  Mail, 
  Camera, 
  CheckCircle, 
  Save, 
  Clock, 
  Trash2, 
  UserCheck, 
  Server,
  KeyRound,
  ShieldAlert,
  Terminal,
  FileSpreadsheet,
  Sun,
  Moon
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
export const metadata = {
  title: 'Admin-Profile | Digital Life Lessons'
}
export default function AdminProfilePage() {
  // --- AOS Initialization ---
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // --- Theme State Controller ---
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 1. STATE: Main Core Profile Credentials
  const [profile, setProfile] = useState({
    name: "MD Limon",
    email: "limon@example.com",
    role: "Super Admin",
    image: "https://i.pravatar.cc/150?u=limon"
  });

  // 2. STATE: Moderation Quantitative Performance Metrics 
  const [activity] = useState({
    lessonsModerated: 142,
    rolesUpdated: 28,
    purgedLessons: 19,
    systemUptime: "99.98%",
    dbLatency: "14ms"
  });

  // 3. EXTRA FEATURE: Interactive Real-Time Security Logs Stream
  const [logs, setLogs] = useState([
    { id: "log-1", type: "purge", message: "Permanently purged lesson id [les-401] due to financial scam flags.", time: "12 mins ago" },
    { id: "log-2", type: "promote", message: "Promoted user 'Ried Hessan' to Administrator status clearance.", time: "2 hours ago" },
    { id: "log-3", type: "ignore", message: "Cleared all inappropriate content flags for lesson [les-102].", time: "5 hours ago" },
    { id: "log-4", type: "security", message: "Admin root profile credentials updated from safe node IP.", time: "Yesterday" }
  ]);

  // 4. EXTRA FEATURE: Platform Configurations Live Toggles
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    maintenanceMode: false,
    auditLogging: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditing(false);
    setSaveSuccess(true);
    
    setLogs(prev => [
      { id: `log-${Date.now()}`, type: "security", message: "Saved changes to administrator metadata layout.", time: "Just now" },
      ...prev
    ]);

    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const clearLogStream = () => {
    setLogs([]);
  };

  return (
    // PREMIUM ADAPTIVE BACKDROP SYSTEM WITH ZERO LAYOUT SHIFT
    <div className="min-h-screen w-full bg-gradient-to-tr from-slate-50 via-slate-100 to-indigo-50/30 dark:from-[#17053c] dark:via-[#150433] dark:to-[#0f0226] p-4 sm:p-8 transition-colors duration-500 ease-in-out">
      
      {/* GLOBAL FLOATING THEME TOGGLER */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          className="bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-800 dark:text-amber-400 shadow-xl h-12 w-12"
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun size={20} className="animate-[spin_20s_linear_infinite]" /> : <Moon size={20} />}
        </Button>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">

        {/* NOTIFICATION TOAST FEEDBACK */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-xl shadow-emerald-500/20"
            >
              <CheckCircle size={15} strokeWidth={2.5} />
              <span>Profile metrics saved successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* COLUMN 1: LEFT SIDE ACCOUNT OVERVIEW */}
          <div className="space-y-6">
            
            {/* PROFILE OVERVIEW CARD */}
            <div data-aos="fade-up">
              <Card className="border border-slate-100 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm p-6 text-center relative overflow-hidden rounded-[28px] space-y-5">
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative w-28 h-28 mx-auto group">
                  <Avatar 
                    src={isEditing ? formData.image : profile.image} 
                    className="w-full h-full ring-4 ring-purple-500/10 shadow-lg text-large" 
                  />
                  
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors rounded-full flex flex-col items-center justify-center text-white gap-1 opacity-100 backdrop-blur-[1px] cursor-pointer"
                    >
                      <Camera size={18} strokeWidth={2.2} />
                      <span className="text-[9px] font-black uppercase tracking-wider">Change</span>
                    </button>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-800 dark:text-zinc-100 tracking-tight">{profile.name}</h2>
                  <p className="text-xs text-slate-400 dark:text-zinc-400 font-medium font-sans">{profile.email}</p>
                </div>

                <div className="pt-1 flex justify-center">
                  <Chip
                    size="sm"
                    variant="flat"
                    color="secondary"
                    className="font-black text-[10px] uppercase tracking-widest h-6 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/20 px-3 flex items-center gap-1"
                  >
                    <ShieldCheck size={12} className="inline mr-0.5" />
                    {profile.role}
                  </Chip>
                </div>
              </Card>
            </div>

            {/* SECURITY CONFIGURATION OVERRIDES */}
            <div data-aos="fade-up" data-aos-delay="100">
              <Card className="border border-slate-100 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm p-5 rounded-[24px] space-y-4">
                <div className="flex items-center gap-2 border-b border-default-100 dark:border-white/10 pb-2">
                  <KeyRound size={15} className="text-purple-500" />
                  <h4 className="text-xs font-black text-slate-800 dark:text-zinc-200 uppercase tracking-wider">Security Control Overrides</h4>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">2FA Protection</p>
                      <p className="text-[10px] text-default-400 dark:text-zinc-400">Enforce authentication gates.</p>
                    </div>
                    <Switch size="sm" color="secondary" isSelected={securitySettings.twoFactor} onValueChange={(val) => setSecuritySettings(p => ({ ...p, twoFactor: val }))} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">Maintenance Anchor</p>
                      <p className="text-[10px] text-default-400 dark:text-zinc-400">Lock non-admin interactions.</p>
                    </div>
                    <Switch size="sm" color="danger" isSelected={securitySettings.maintenanceMode} onValueChange={(val) => setSecuritySettings(p => ({ ...p, maintenanceMode: val }))} />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* COLUMN 2 & 3: CENTER / RIGHT CONTENT BLOCK */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PROFILE CREDENTIAL EDIT FORMS */}
            <div data-aos="fade-up">
              <Card className="border border-slate-100 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm rounded-[28px] p-6">
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-default-100 dark:border-white/10 pb-4">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-black text-slate-800 dark:text-zinc-100 tracking-tight">Administrative Credentials</h3>
                      <p className="text-xs text-default-400 dark:text-zinc-400 font-medium">Configure public rendering node profile settings.</p>
                    </div>

                    {!isEditing ? (
                      <Button size="sm" radius="xl" variant="flat" color="secondary" className="font-bold text-xs h-8 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 px-4" onPress={() => setIsEditing(true)}>
                        Edit Credentials
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button size="sm" radius="xl" variant="flat" className="font-bold text-xs h-8 text-default-500 dark:text-zinc-400" onPress={() => { setFormData({ ...profile }); setIsEditing(false); }}>
                          Cancel
                        </Button>
                        <Button type="submit" size="sm" radius="xl" color="secondary" className="font-bold text-xs h-8 px-4 bg-purple-600 text-white flex items-center gap-1.5 shadow-sm">
                          <Save size={13} />
                          Save Shifts
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Display Name</label>
                      <div className="relative flex items-center">
                        <User size={14} className="absolute left-3.5 text-default-400 dark:text-zinc-400 z-10" />
                        <Input
                          type="text"
                          name="name"
                          placeholder="Enter name"
                          value={isEditing ? formData.name : profile.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full text-xs font-semibold h-11 rounded-xl bg-slate-100/60 dark:bg-white/5 border-none pl-10 pr-4 text-slate-800 dark:text-zinc-100 ${!isEditing ? "opacity-80 cursor-not-allowed select-none" : ""}`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Email Coordinates</label>
                      <div className="relative flex items-center">
                        <Mail size={14} className="absolute left-3.5 text-default-400 dark:text-zinc-400 z-10" />
                        <Input
                          type="email"
                          value={profile.email}
                          disabled={true}
                          className="w-full text-xs font-semibold h-11 rounded-xl bg-slate-100/40 dark:bg-white/5 border-none pl-10 pr-4 text-slate-500 dark:text-zinc-400 opacity-60 cursor-not-allowed select-none"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </Card>
            </div>

            {/* AUDIT STATISTICS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-aos="fade-up" data-aos-delay="100">
              <Card className="border border-slate-100 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-sm space-y-0.5">
                <p className="text-[10px] font-bold text-default-400 dark:text-zinc-400 uppercase tracking-wider">Audits Resolved</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-slate-800 dark:text-zinc-100">{activity.lessonsModerated}</span>
                  <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1 rounded">Live</span>
                </div>
              </Card>

              <Card className="border border-slate-100 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-sm space-y-0.5">
                <p className="text-[10px] font-bold text-default-400 dark:text-zinc-400 uppercase tracking-wider">Roles Updated</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-slate-800 dark:text-zinc-100">{activity.rolesUpdated}</span>
                  <span className="text-[9px] text-purple-500 font-bold bg-purple-500/10 px-1 rounded">Staff</span>
                </div>
              </Card>

              <Card className="border border-slate-100 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-sm space-y-0.5">
                <p className="text-[10px] font-bold text-default-400 dark:text-zinc-400 uppercase tracking-wider">System Uptime</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-blue-600 dark:text-blue-400">{activity.systemUptime}</span>
                </div>
              </Card>

              <Card className="border border-slate-100 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-sm space-y-0.5">
                <p className="text-[10px] font-bold text-default-400 dark:text-zinc-400 uppercase tracking-wider">DB Latency</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-amber-600 dark:text-amber-400">{activity.dbLatency}</span>
                  <Server size={11} className="text-default-400 dark:text-zinc-400 ml-0.5 inline align-center" />
                </div>
              </Card>
            </div>

            {/* SECURE ACTION AUDIT LOGS TRAIL */}
            <div data-aos="fade-up" data-aos-delay="200" className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Terminal size={15} className="text-purple-500" />
                  <h3 className="text-xs font-black text-slate-800 dark:text-zinc-200 uppercase tracking-widest">Secure Admin System Logs</h3>
                </div>
                {logs.length > 0 && (
                  <Button size="sm" variant="light" color="danger" className="h-6 text-[10px] font-bold rounded-lg px-2" onPress={clearLogStream}>
                    <Trash2 size={11} className="mr-1 inline" /> Clear Logs
                  </Button>
                )}
              </div>

              <Card className="border border-slate-100 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-[24px] p-4 shadow-sm overflow-hidden">
                <div className="divide-y divide-default-100/70 dark:divide-white/10 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                  <AnimatePresence initial={false}>
                    {logs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                            log.type === "purge" ? "bg-rose-500/10 text-rose-500" :
                            log.type === "promote" ? "bg-purple-500/10 text-purple-500" :
                            log.type === "ignore" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                          }`}>
                            {log.type === "purge" && <Trash2 size={13} />}
                            {log.type === "promote" && <UserCheck size={13} />}
                            {log.type === "ignore" && <CheckCircle size={13} />}
                            {log.type === "security" && <ShieldAlert size={13} />}
                          </div>
                          <p className="text-xs font-medium text-slate-600 dark:text-zinc-300 leading-relaxed pt-0.5">{log.message}</p>
                        </div>
                        <span className="text-[10px] text-default-400 dark:text-zinc-400 font-semibold font-sans shrink-0 flex items-center gap-1 pt-1">
                          <Clock size={10} /> {log.time}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {logs.length === 0 && (
                    <div className="text-center py-8 text-default-400 dark:text-zinc-400 font-medium space-y-1">
                      <FileSpreadsheet size={20} className="mx-auto text-default-300" />
                      <p className="text-xs">No administrative logging actions recorded during this lifecycle.</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}