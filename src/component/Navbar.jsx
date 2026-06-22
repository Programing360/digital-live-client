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

  // Real Plan Evaluation based on User Object (Implicit condition corrected)
  const isPremiumUser = user?.isPlan === "premium";
  const isFreePlan = !user || user?.isPlan === "free";

  // Dynamic navigation mapping configuration
  const navItems = [
    { name: "Home", href: "/" },
    ...(user
      ? [
          { name: "Add Lesson", href: "/dashboard/add-lesson" },
          { name: "My Lessons", href: "/dashboard/my-lessons" },
        ]
      : []),
    { name: "Public Lessons", href: "/publicLessons" },
    // Upgrade link will ONLY show if the user is logged in AND on a Free Plan
    ...(user && isFreePlan ? [{ name: "Upgrade", href: "/upgrade" }] : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-2xl transition-colors duration-300">
      <div className="mx-auto container">
        <div>
          <div className="flex h-20 items-center justify-between px-5 lg:px-8">
            {/* Brand Logo Identity */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.06, rotate: 4 }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(139,92,246,.1)",
                    "0 0 24px rgba(139,92,246,.4)",
                    "0 0 0px rgba(139,92,246,.1)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-500 to-cyan-500 text-white"
              >
                <BookOpen size={20} />
              </motion.div>

              <div>
                <h2 className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-base font-black tracking-tight text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400">
                  Digital Life Lessons
                </h2>
                <p className="text-[10px] font-bold text-default-400 dark:text-zinc-500 tracking-wider uppercase">
                  Capture Wisdom • Inspire Growth
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
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
                            ? "text-indigo-600 dark:text-violet-400"
                            : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
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
                            className="absolute inset-0 rounded-xl bg-indigo-50 dark:bg-violet-500/10 border border-indigo-500/10 dark:border-violet-500/10"
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

            {/* Right Desktop Control Panel Elements */}
            <div className="hidden items-center gap-3 lg:flex">
              

              <ThemeToggle />

              {user ? (
                <Dropdown placement="bottom-end">
                  <Dropdown.Trigger>
                    <button className="focus:outline-none transition-transform active:scale-95 relative rounded-full p-0.5 border border-default-200 dark:border-zinc-800">
                      <Avatar>
                        <Avatar.Image
                          size="sm"
                          src={user?.image || "https://i.pravatar.cc/150?u=1"}
                          name={user?.name}
                          className="cursor-pointer rounded-full"
                        />
                        <Avatar.Fallback className="bg-indigo-50 dark:bg-zinc-800 font-bold text-xs text-indigo-600 dark:text-zinc-300">
                          {user.name?.slice(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>

                      {/* Floating Micro Premium Dot Badge */}
                      {isPremiumUser && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 ring-2 ring-white dark:ring-zinc-950">
                          <Crown size={8} className="text-white font-black" />
                        </span>
                      )}
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <Dropdown.Menu
                      className="w-64 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl"
                      aria-label="User Profile Actions"
                    >
                      {/* Premium Aware Summary Card */}
                      <Dropdown.Item
                        key="profile-summary"
                        className="h-16 gap-2 opacity-100 pointer-events-none px-3"
                      >
                        <div className="flex items-center justify-between w-full">
                          <Label className="font-black text-xs text-slate-800 dark:text-white truncate max-w-[140px]">
                            {user?.name}
                          </Label>

                          {/* DYNAMIC PREMIUM USER BADGE COMPONENT */}
                          {isPremiumUser ? (
                            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-md shadow-sm shadow-orange-500/20">
                              <Crown size={9} /> Premium
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-default-100 dark:bg-zinc-800 text-default-500 px-2 py-0.5 rounded-md">
                              Free Tier
                            </span>
                          )}
                        </div>
                        <Description className="text-[11px] text-default-400 dark:text-zinc-500 font-medium block truncate mt-0.5">
                          {user?.email}
                        </Description>
                      </Dropdown.Item>

                      <Separator className="bg-default-100 dark:bg-zinc-800" />

                      <Dropdown.Item
                        key="profile"
                        as={Link}
                        href="/profile"
                        startContent={
                          <User size={15} className="text-default-400" />
                        }
                      >
                        <Label className="font-semibold text-xs text-slate-700 dark:text-zinc-200">
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
                            className="text-default-400"
                          />
                        }
                      >
                        <Label className="font-semibold text-xs text-slate-700 dark:text-zinc-200">
                          Dashboard
                        </Label>
                      </Dropdown.Item>

                      <Dropdown.Item
                        key="settings"
                        as={Link}
                        href="/settings"
                        startContent={
                          <Settings size={15} className="text-default-400" />
                        }
                      >
                        <Label className="font-semibold text-xs text-slate-700 dark:text-zinc-200">
                          Account Settings
                        </Label>
                      </Dropdown.Item>

                      <Separator className="bg-default-100 dark:bg-zinc-800" />

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
                      className="border border-slate-200 dark:border-zinc-800 hover:bg-default-100 dark:hover:bg-zinc-800 font-bold text-xs h-9 px-4 rounded-xl text-slate-700 dark:text-zinc-300"
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/auth/register">
                    <Button
                      size="sm"
                      startContent={<Sparkles size={13} />}
                      className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 font-extrabold text-white shadow-md shadow-indigo-600/10 transition-transform duration-300 hover:scale-[1.02] h-9 px-4 rounded-xl"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Action Trigger Button */}
            <Button
              isIconOnly
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-slate-700 dark:text-zinc-300 bg-default-100 dark:bg-zinc-900 border border-default-200/50 dark:border-zinc-800/60 rounded-xl h-9 w-9 min-w-0"
            >
              <motion.div animate={{ rotate: menuOpen ? 90 : 0 }}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Layer Panels */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-default-200 dark:border-zinc-800 lg:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl"
          >
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3 border-b border-default-100 dark:border-zinc-800/60 pb-4">
                <ThemeToggle />

                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar
                        size="sm"
                        src={user?.image || "https://i.pravatar.cc/150?u=1"}
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-black text-slate-800 dark:text-zinc-200 max-w-[100px] truncate">
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
                        className="w-full font-bold text-xs rounded-xl h-8 text-slate-700 dark:text-zinc-300"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex-1"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Button className="w-full font-black text-xs bg-slate-900 dark:bg-zinc-100 dark:text-zinc-900 text-white rounded-xl h-8">
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
                            ? "bg-indigo-50 text-indigo-600 dark:bg-violet-500/10 dark:text-violet-400 border-l-4 border-indigo-500"
                            : "hover:bg-default-50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400"
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
