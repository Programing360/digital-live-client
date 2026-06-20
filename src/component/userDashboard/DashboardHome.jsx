"use client";
import React from "react";
import { Card, Button, Avatar, Chip } from "@heroui/react";
import { BookOpen, Heart, Eye, ArrowUpRight, TrendingUp } from "lucide-react";

export default function DashboardHome({ user, setActiveTab, lessonData, favorites }) {
  const stats = [
    {
      title: "My Lessons",
      val: `${lessonData.length}`,
      icon: <BookOpen size={20} />,
      bg: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Favorites",
      val: `${favorites.length}`,
      icon: <Heart size={20} />,
      bg: "bg-amber-50 text-amber-600",
    },
    {
      title: "Total Views",
      val: "1.2K",
      icon: <Eye size={20} />,
      bg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Total Likes",
      val: "348",
      icon: <Heart size={20} />,
      bg: "bg-rose-50 text-rose-600",
    },
  ];

  const recents = [
    {
      title: "The Power of Positive Thinking",
      date: "May 12, 2024",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=150",
    },
    {
      title: "Small Steps Every Day",
      date: "May 11, 2024",
      img: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=150",
    },
    {
      title: "Letting Go is Okay",
      date: "May 10, 2024",
      img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=150",
    },
  ];

  return (
    <div className="space-y-8 max-w-full " data-aos="fade-up">
      {/* Dynamic App Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Welcome back,{" "}
            <span className="font-bold text-slate-800">{user.name}</span> 👋
            Here whats happening.
          </p>
        </div>
        <Button
          variant="flat"
          color="default"
          size="sm"
          className="bg-white border border-slate-200 font-bold"
        >
          This Week
        </Button>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border border-slate-100 p-5 shadow-sm rounded-2xl bg-white"
          >
            <Card.Content className="flex items-center gap-4 p-0">
              <div className={`p-3.5 rounded-xl ${stat.bg}`}>{stat.icon}</div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">
                  {stat.val}
                </p>
                <p className="text-xs font-semibold text-slate-400 mt-1.5">
                  {stat.title}
                </p>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Analytics Graph Visualization and Recent Feed Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Synthetic Inline Vector Chart Container */}
        <Card className="lg:col-span-2 border border-slate-100 p-6 shadow-sm rounded-2xl bg-white">
          <Card.Header className="flex justify-between items-center p-0 mb-6">
            <Card.Title className="text-base font-bold text-slate-900">
              Lessons Overview
            </Card.Title>
            <Button
              size="sm"
              variant="light"
              color="primary"
              className="font-bold text-xs"
              endContent={<ArrowUpRight size={14} />}
            >
              View Details
            </Button>
          </Card.Header>
          <Card.Content className="p-0 h-64 flex flex-col justify-end">
            <div className="relative w-full h-48 border-b border-l border-slate-100 flex items-end">
              {/* Synthetic Wave Mock Element using CSS gradients */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-indigo-500/10 to-transparent rounded-b-lg" />
              <svg
                className="w-full h-full text-indigo-500"
                viewBox="0 0 700 200"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,150 Q100,100 200,120 T400,60 T600,80 T700,40"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-4 px-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </Card.Content>
        </Card>

        {/* Side Mini Quick-Feed Widget */}
        <Card className="border border-slate-100 p-6 shadow-sm rounded-2xl bg-white">
          <Card.Header className="p-0 mb-6">
            <Card.Title className="text-base font-bold text-slate-900">
              Recent Lessons
            </Card.Title>
          </Card.Header>
          <Card.Content className="p-0 space-y-4">
            {recents.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all"
              >
                <img
                  src={item.img}
                  className="w-12 h-12 rounded-xl object-cover"
                  alt="Thumb"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
            <Button
              size="sm"
              variant="bordered"
              className="w-full mt-2 font-bold rounded-xl"
              onClick={() => setActiveTab("my-lessons")}
            >
              View All
            </Button>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
