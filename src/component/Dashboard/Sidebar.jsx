"use client";
import React from "react";
import { Button, Avatar } from "@heroui/react";
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Heart,
  User,
  Users,
  LogOut,
  ShieldAlert,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const pathname = usePathname();

  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user;

  const userItem = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "add-lesson",
      label: "Add Lesson",
      href: "/dashboard/add-lesson",
      icon: <PlusCircle size={20} />,
    },
    {
      id: "my-lessons",
      label: "My Lessons",
      href: "/dashboard/my-lessons",
      icon: <BookOpen size={20} />,
    },
    {
      id: "favorites",
      label: "Favorites",
      href: "/dashboard/my-favorites",
      icon: <Heart size={20} />,
    },
    {
      id: "profile",
      label: "Profile",
      href: "/dashboard/profile",
      icon: <User size={20} />,
    },
  ];

  const adminMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard Home",
      href: "/dashboard/admin",
      icon: <LayoutDashboard></LayoutDashboard>,
    },
    {
      id: "manage-users",
      label: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: <Users></Users>,
    },
    {
      id: "manage-lessons",
      label: "Manage Lessons",
      href: "/dashboard/admin/manage-lessons",
      icon: <BookOpen />,
    },
    {
      id: "reported-lessons",
      label: "Reported Lessons",
      href: "/dashboard/admin/reported-lessons",
      icon: <ShieldAlert />,
    },
    {
      id: "profile",
      label: "Admin Profile",
      href: "/dashboard/admin/profile",
      icon: <UserCog />,
    },
  ];

  const navItems = {
    user: userItem,
    admin: adminMenuItems,
  };
  const isAdmin = user?.role === "admin";
  const menuItems = navItems[user?.role] || userItem;
  const clientItem = navItems[user?.role === 'admin' && 'user'] || userItem;


  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0F0C24] text-slate-300 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between pt-20 lg:pt-6 pb-6 shadow-xl
      ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div>
        {/* Logo Brand Header */}
        <Link href="/">
          <div className="hidden lg:flex items-center gap-3 px-6 mb-8">
            <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
              <BookOpen className="text-indigo-400" size={26} />
            </div>
            <div>
              <h1 className="font-black text-white text-lg tracking-tight leading-none">
                Digital
              </h1>
              <p className="text-xs text-indigo-300 font-medium tracking-wide mt-1">
                Life Lessons
              </p>
            </div>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="px-3 space-y-1">
          {/* ================= ADMIN MENU ================= */}
          {isAdmin && (
            <>
              <div className="pt-2 pb-2 px-4 text-[11px] font-bold text-indigo-400 tracking-widest uppercase">
                Admin Panel
              </div>

              {menuItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
            ${
              isActive
                ? "bg-indigo-600/30 text-white border-l-4 border-indigo-500 shadow-inner"
                : "hover:bg-white/5 text-slate-400 hover:text-slate-200"
            }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </>
          )}

          {/* ================= USER MENU ================= */}
          <div className="pt-6 pb-2 px-4 text-[11px] font-bold text-slate-500 tracking-widest uppercase">
            User Panel
          </div>

          {clientItem.map((item) => {
            const isActive = pathname === item.href;

            // Admin এর জন্য User Menu disabled
            if (isAdmin) {
              return (
                <button
                  key={item.id}
                  disabled
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 opacity-50 cursor-not-allowed"
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            }

            // Normal User
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
        ${
          isActive
            ? "bg-indigo-600/30 text-white border-l-4 border-indigo-500 shadow-inner"
            : "hover:bg-white/5 text-slate-400 hover:text-slate-200"
        }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer User Info & Logout Action */}
      <div className="px-3 border-t border-slate-800/60 pt-4 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar>
            <Avatar.Image
              src={user?.image || ""}
              size="sm"
              className="ring-2 ring-indigo-500/30"
            />
          </Avatar>
          <div className="flex-1 min-w-0 hidden lg:block">
            <p className="text-xs font-bold text-white truncate">
              {user?.name}
            </p>
            <p className="text-[10px] font-medium text-slate-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <Button
          variant="light"
          className="w-full justify-start text-danger hover:bg-danger-500/10 font-bold rounded-xl"
          startContent={<LogOut size={20} />}
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}
