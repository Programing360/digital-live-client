"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Imported Next.js active route tracker
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
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname(); // Holds the string of the current path (e.g., "/public")
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // admin role handle 
  const isAdmin = user?.role === 'admin' || 'user'

  // Conditional plan evaluation logic
  const isFreePlan = !user || user?.plan === "Free" || true;

  // Dynamic items list matching your architecture specifications
  const navItems = [
    { name: "Home", href: "/" },
    ...(user
      ? [
          { name: "Add Lesson", href: "/dashboard/add-lesson" },
          { name: "My Lessons", href: "/dashboard/my-lessons" },
        ]
      : []),
    { name: "Public Lessons", href: "/publicLessons" },
    ...(user && isFreePlan ? [{ name: "Upgrade", href: "/upgrade" }] : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 border border-white/20 bg-white/70 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto w-[95%] max-w-7xl">
        <div>
          <div className="flex h-20 items-center justify-between px-5 lg:px-8">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 8 }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(139,92,246,.2)",
                    "0 0 20px rgba(139,92,246,.5)",
                    "0 0 0px rgba(139,92,246,.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-500 to-cyan-500 text-white"
              >
                <BookOpen size={22} />
              </motion.div>

              <div>
                <h2 className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-lg font-extrabold text-transparent">
                  Digital Life Lessons
                </h2>
                <p className="text-[11px] text-default-500">
                  Capture Wisdom • Inspire Growth
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navItems?.map((item) => {
                // Determines if the nav item matches the current exact route
                const isActive = pathname === item.href;

                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <Button
                        className={`group relative bg-white px-4 py-2 text-sm font-medium transition-colors dark:text-white dynamic-active-state ${
                          isActive
                            ? "text-violet-600 dark:text-violet-400"
                            : "text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-nav"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            className="absolute inset-0 rounded-full bg-violet-100 dark:bg-violet-500/15"
                          />
                        )}
                        <span className="relative z-10">{item.name}</span>
                        <span
                          className={`absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:left-0 group-hover:w-full ${
                            isActive ? "left-2 w-0" : "w-0"
                          }`}
                        />
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
                    <button className="focus:outline-none transition-transform active:scale-95">
                      <Avatar>
                        <Avatar.Image
                          size="sm"
                          src={user.image || "https://i.pravatar.cc/150?u=1"}
                          name={user.name}
                          className="ring-2 ring-violet-500/30 cursor-pointer"
                        />
                        <Avatar.Fallback>
                          {user.name?.slice(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <Dropdown.Menu className="w-60" aria-label="User Profile Actions">
                      <Dropdown.Item key="profile-summary" className="h-14 gap-2 opacity-100 pointer-events-none">
                        <Label className="font-extrabold text-slate-900 dark:text-white block">
                          {user?.name}
                        </Label>
                        <Description className="text-xs text-default-400 font-medium block truncate">
                          {user?.email}
                        </Description>
                      </Dropdown.Item>

                      <Separator />

                      {/* Profile Route Option */}
                      <Dropdown.Item key="profile" as={Link} href="/profile" startContent={<User size={16} className="text-default-500" />}>
                        <Label className="font-semibold text-xs text-slate-700 dark:text-zinc-200">
                          Profile
                        </Label>
                      </Dropdown.Item>

                      {/* Dashboard Route Option */}
                      <Dropdown.Item key="dashboard" as={Link} href={isAdmin ? "/dashboard/admin" : "/dashboard"} startContent={<LayoutDashboard size={16} className="text-default-500" />}>
                        <Label className="font-semibold text-xs text-slate-700 dark:text-zinc-200">
                          Dashboard
                        </Label>
                      </Dropdown.Item>

                      <Dropdown.Item key="settings" as={Link} href="/settings" startContent={<Settings size={16} className="text-default-500" />}>
                        <Label className="font-semibold text-xs text-slate-700 dark:text-zinc-200">
                          Account Settings
                        </Label>
                      </Dropdown.Item>

                      <Separator />

                      <Dropdown.Item 
                        key="logout" 
                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                        onClick={handleSignOut}
                        startContent={<LogOut size={16} />}
                      >
                        <Label className="font-bold text-xs text-rose-500">
                          Sign Out
                        </Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="light"
                      radius="full"
                      className="border border-default-200 dark:border-zinc-800 hover:bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 bg-default-soft-hover hover:text-white font-medium text-xs h-9 px-4"
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/auth/register">
                    <Button
                      radius="full"
                      size="sm"
                      startContent={<Sparkles size={14} />}
                      className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 font-bold text-white shadow-md transition-all duration-300 hover:scale-105 h-9 px-4"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-slate-700 dark:text-zinc-300 focus:outline-none bg-white"
            >
              <motion.div animate={{ rotate: menuOpen ? 180 : 0 }}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-default-200 dark:border-default-100/10 lg:hidden"
          >
            <div className="space-y-3 p-5 bg-white/90 dark:bg-black/90 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3 border-b border-default-200 pb-4 dark:border-default-100/10">
                <ThemeToggle />

                {user ? (
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm" src={user.image || "https://i.pravatar.cc/150?u=1"} />
                    <Button size="sm" variant="flat" color="danger" radius="xl" className="font-bold text-xs" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2 w-full">
                    <Link href="/auth/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                      <Button variant="light" className="w-full font-bold text-xs">Login</Button>
                    </Link>
                    <Link href="/auth/register" className="flex-1" onClick={() => setMenuOpen(false)}>
                      <Button className="w-full font-bold text-xs bg-slate-900 text-white">Signup</Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isMobileActive = pathname === item.href;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                          isMobileActive
                            ? "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400"
                            : "hover:bg-default-100 dark:hover:bg-white/5 text-slate-700 dark:text-zinc-300"
                        }`}
                      >
                        {item.name}
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