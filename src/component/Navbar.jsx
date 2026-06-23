"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Button,
  Avatar,
  Dropdown,
  Label,
  Description,
  Separator,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Menu,
  Sparkles,
  X,
  LogOut,
  User,
  LayoutDashboard,
  Settings,
  Crown,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Admin role check
  const isAdmin = user?.role === "admin";

  // Real Plan Evaluation based on User Object
  const isPremiumUser = user?.isPlan === "premium";
  const isFreePlan = !user || user?.isPlan === "free";

  // Dynamic navigation mapping configuration
  const navItems = [
    { name: "Home", href: "/" },
    ...(user
      ? [
          { name: "Add Lesson", href: "/dashboard/add-lesson" },
          { name: "My Lessons", href: "/dashboard/my-lessons" },
          { name: "My Favorite", href: "/dashboard/my-favorites" },
        ]
      : []),
    { name: "Public Lessons", href: "/publicLessons" },
    ...(user && isFreePlan ? [{ name: "Upgrade", href: "/upgrade" }] : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
  
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#21094a]/85 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_32px_rgba(18,3,46,0.5)] backdrop-blur-2xl transition-colors duration-500">
      <div className="mx-auto container">
        <div>
          <div className="flex h-20 items-center justify-between px-5 lg:px-8">
            {/* ─── BRAND LOGO IDENTITY ─── */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.06, rotate: 4 }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(0,229,180,0)",
                    "0 0 20px rgba(0,229,180,0.4)",
                    "0 0 0px rgba(0,229,180,0)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] via-[#31106a] to-[#00e5b4] text-white"
              >
                <BookOpen size={20} />
              </motion.div>

              <div>
            
                <h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-base font-black tracking-tight text-transparent dark:from-[#b992ff] dark:via-purple-400 dark:to-[#00e5b4]">
                  Digital Life Lessons
                </h2>
                <p className="text-[10px] font-bold text-default-400 dark:text-purple-300/50 tracking-wider uppercase">
                  Capture Wisdom • Inspire Growth
                </p>
              </div>
            </Link>

            {/* ─── DESKTOP NAVIGATION LINKS ─── */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navItems?.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <Button
                        variant="light"
                        className={`group relative px-4 py-2 text-xs font-bold transition-all rounded-xl h-9 bg-transparent ${
                          isActive
                            ? "text-indigo-600 dark:text-[#00e5b4]"
                            : "text-slate-600 dark:text-purple-200/70 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                      
                        {isActive && (
                          <motion.div
                            layoutId="active-nav"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                            className="absolute inset-0 rounded-xl bg-indigo-50 dark:bg-white/[0.04] border border-indigo-500/10 dark:border-white/[0.08]"
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1">
                          {item.name === "Upgrade" && (
                            <Sparkles
                              size={12}
                              className="text-amber-500 animate-pulse"
                            />
                          )}
                          {item.name}
                        </span>
                      </Button>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ─── RIGHT DESKTOP CONTROL PANEL ELEMENTS ─── */}
            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle />

              {user ? (
                <Dropdown placement="bottom-end">
                  <Dropdown.Trigger>
                    <button className="focus:outline-none transition-transform active:scale-95 relative rounded-full p-0.5 border border-default-200 dark:border-white/[0.1]">
                      <Avatar>
                        <Avatar.Image
                          size="sm"
                          src={user?.image || "https://i.pravatar.cc/150?u=1"}
                          name={user?.name}
                          className="cursor-pointer rounded-full"
                        />
                        <Avatar.Fallback className="bg-indigo-50 dark:bg-[#31106a] font-bold text-xs text-indigo-600 dark:text-purple-200">
                          {user.name?.slice(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>

                      {/* Floating Micro Premium Dot Badge */}
                      {isPremiumUser && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 ring-2 ring-white dark:ring-[#21094a]">
                          <Crown size={8} className="text-white font-black" />
                        </span>
                      )}
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <Dropdown.Menu
                      className="w-64 bg-white dark:bg-[#1a093c] border border-slate-100 dark:border-white/[0.08] rounded-2xl"
                      aria-label="User Profile Actions"
                    >
                      {/* Premium Aware Summary Card */}
                      <Dropdown.Item
                        key="profile-summary"
                        className="h-16 gap-2 opacity-100 pointer-events-none px-3"
                      >
                        <div className="flex gap-2">
                          <Avatar className="mx-auto">
                            <Avatar.Image
                              alt="John Doe"
                              src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                            />
                            <Avatar.Fallback>JD</Avatar.Fallback>
                          </Avatar>
                          <div>
                            <div className="flex w-full">
                              <Label className="font-black text-xs text-slate-800 dark:text-purple-100 truncate max-w-[140px]">
                                {user?.name}
                              </Label>

                              {isPremiumUser ? (
                                <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-md shadow-sm shadow-orange-500/20">
                                  <Crown size={9} /> Premium
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold text-pink-400 uppercase tracking-wider bg-default-100 dark:bg-white/[0.05] text-default-500 dark:text-purple-300/70 px-2 py-0.5 rounded-md">
                                  Free Tier
                                </span>
                              )}
                            </div>
                            <Description className="text-[11px] text-default-400 dark:text-purple-300/50 font-medium block truncate mt-0.5">
                          {user?.email}
                        </Description>
                          </div>
                        </div>
                      </Dropdown.Item>

                      <Separator className="bg-default-100 dark:bg-white/[0.06]" />

                      <Dropdown.Item
                        key="profile"
                        as={Link}
                        href="/profile"
                        startContent={
                          <User
                            size={15}
                            className="text-default-400 dark:text-purple-300/60"
                          />
                        }
                      >
                        <Label className="font-semibold text-xs text-slate-700 dark:text-purple-200">
                          Profile
                        </Label>
                      </Dropdown.Item>

                      <Dropdown.Item
                        key="dashboard"
                        as={Link}
                        href={isAdmin ? "/dashboard/admin" : "/dashboard"}
                        startContent={
                          <LayoutDashboard
                            size={15}
                            className="text-default-400 dark:text-purple-300/60"
                          />
                        }
                      >
                        <Label className="font-semibold text-xs text-slate-700 dark:text-purple-200">
                          Dashboard
                        </Label>
                      </Dropdown.Item>

                      <Dropdown.Item
                        key="settings"
                        as={Link}
                        href="/settings"
                        startContent={
                          <Settings
                            size={15}
                            className="text-default-400 dark:text-purple-300/60"
                          />
                        }
                      >
                        <Label className="font-semibold text-xs text-slate-700 dark:text-purple-200">
                          Account Settings
                        </Label>
                      </Dropdown.Item>

                      <Separator className="bg-default-100 dark:bg-white/[0.06]" />

                      <Dropdown.Item
                        key="logout"
                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                        onClick={handleSignOut}
                        startContent={<LogOut size={15} />}
                      >
                        <Label className="font-bold text-xs text-rose-500">
                          Sign Out
                        </Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button
                      variant="light"
                      className="border border-slate-200 dark:border-white/[0.1] hover:bg-default-100 dark:hover:bg-white/[0.04] font-bold text-xs h-9 px-4 rounded-xl text-slate-700 dark:text-purple-200"
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/auth/register">
                  
                    <Button
                      size="sm"
                      startContent={<Sparkles size={13} />}
                      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-[#00e5b4] dark:from-purple-600 dark:via-indigo-600 dark:to-[#00e5b4] font-extrabold text-white shadow-md shadow-indigo-600/10 transition-transform duration-300 hover:scale-[1.02] h-9 px-4 rounded-xl"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* ─── MOBILE MENU ACTION TRIGGER BUTTON ─── */}
            <Button
              isIconOnly
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-slate-700 dark:text-purple-200 bg-default-100 dark:bg-[#31106a] border border-default-200/50 dark:border-white/[0.08] rounded-xl h-9 w-9 min-w-0"
            >
              <motion.div animate={{ rotate: menuOpen ? 90 : 0 }}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* ─── MOBILE SIDEBAR LAYER PANELS ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-default-200 dark:border-white/[0.08] lg:hidden bg-white/95 dark:bg-[#21094a]/95 backdrop-blur-xl"
          >
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3 border-b border-default-100 dark:border-white/[0.06] pb-4">
                <ThemeToggle />

                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar
                        size="sm"
                        src={user?.image || "https://i.pravatar.cc/150?u=1"}
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-black text-slate-800 dark:text-purple-100 max-w-[100px] truncate">
                          {user.name}
                        </span>
                        {isPremiumUser && (
                          <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-0.5">
                            🏆 Premium
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      radius="xl"
                      className="font-extrabold text-[11px] h-8"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2 w-full max-w-[200px]">
                    <Link
                      href="/auth/login"
                      className="flex-1"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Button
                        variant="flat"
                        className="w-full font-bold text-xs rounded-xl h-8 text-slate-700 dark:text-purple-200 bg-default-100 dark:bg-white/[0.04]"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex-1"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Button className="w-full font-black text-xs bg-slate-900 dark:bg-[#00e5b4] dark:text-slate-950 text-white rounded-xl h-8">
                        Signup
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Navigation Items Map inside Mobile Panel */}
              <div className="flex flex-col gap-1.5 pb-2">
                {navItems.map((item, index) => {
                  const isMobileActive = pathname === item.href;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                          isMobileActive
                            ? "bg-indigo-50 text-indigo-600 dark:bg-white/[0.04] dark:text-[#00e5b4] border-l-4 border-indigo-500 dark:border-[#00e5b4]"
                            : "hover:bg-default-50 dark:hover:bg-white/[0.02] text-slate-600 dark:text-purple-200/70"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {item.name === "Upgrade" && (
                            <Sparkles
                              size={12}
                              className="text-amber-500 animate-pulse"
                            />
                          )}
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
