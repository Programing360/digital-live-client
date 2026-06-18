"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Avatar } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Menu, Sparkles, X } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Create Lesson",
    href: "/create",
  },
  {
    name: "My Lessons",
    href: "/my-lessons",
  },
  {
    name: "Explore Wisdom",
    href: "/public-lessons",
  },
  {
    name: "Progress",
    href: "/progress",
  },
];

// function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <Button
//       isIconOnly
//       radius="full"
//       variant="light"
//       onPress={() =>
//         setTheme(theme === "dark" ? "light" : "dark")
//       }
//       className="border border-default-200 bg-transparent"
//     >
//       <motion.div
//         key={theme}
//         initial={{
//           rotate: -180,
//           scale: 0,
//         }}
//         animate={{
//           rotate: 0,
//           scale: 1,
//         }}
//         transition={{
//           duration: 0.3,
//         }}
//       >
//         {theme === "dark" ? (
//           <Sun size={18} />
//         ) : (
//           <Moon size={18} />
//         )}
//       </motion.div>
//     </Button>
//   );
// }

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <nav className="sticky top-0 z-50 border border-white/20 bg-white/70 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto w-[95%] max-w-7xl">
        <div className="">
          <div className="flex h-20 items-center justify-between px-5 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 8,
                }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(139,92,246,.2)",
                    "0 0 20px rgba(139,92,246,.5)",
                    "0 0 0px rgba(139,92,246,.2)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
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

            {/* Desktop Nav */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActive(item.name)}
                    className="group relative px-4 py-2 text-sm font-medium"
                  >
                    {active === item.name && (
                      <motion.div
                        layoutId="active-nav"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                        className="absolute inset-0 rounded-full bg-violet-100 dark:bg-violet-500/15"
                      />
                    )}

                    <span className="relative z-10">{item.name}</span>

                    <span className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Side */}
            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle />

              <Button
                variant="light"
                radius="full"
                className="border hover:bg-linear-to-r from-violet-500 to-cyan-500 transition-all duration-900 bg-default-soft-hover hover:text-white"
              >
                Sign In
              </Button>

              <Button
                radius="full"
                startContent={<Sparkles size={16} />}
                className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
              >
                Start Sharing
              </Button>

              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=1"
                className="ring-2 ring-violet-500/20"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden"
            >
              <motion.div
                animate={{
                  rotate: menuOpen ? 180 : 0,
                }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="overflow-hidden border-t border-default-200 dark:border-default-100/10 lg:hidden"
              >
                <div className="space-y-3 p-5">
                  <div className="flex items-center gap-3 border-b border-default-200 pb-4 dark:border-default-100/10">
                    <ThemeToggle />

                    <Button variant="light" className="flex-1">
                      Login
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.05,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="block rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-default-100 dark:hover:bg-white/5"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    startContent={<Sparkles size={16} />}
                    className="mt-3 w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 font-semibold text-white"
                  >
                    Start Sharing
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
