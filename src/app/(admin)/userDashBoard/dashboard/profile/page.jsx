"use client";
import React from 'react';
import { Card, Avatar, Button, Chip } from "@heroui/react";
import { Star, Mail, Award, Calendar } from "lucide-react";

export default function ProfileView({ user }) {
  const publicLessons = [
    { title: "Embracing Failure as a Stepping Stone", category: "Career", tone: "Inspirational", date: "2026-06-15" },
    { title: "The Power of High-Fidelity Design Systems", category: "Mindset", tone: "Realization", date: "2026-04-10" }
  ];

  return (
    <div className="space-y-10" data-aos="fade-up">
      {/* Upper Account Metadata Card Header Banner */}
      <Card className="border border-slate-100 p-6 sm:p-8 shadow-sm rounded-2xl bg-white">
        <Card.Content className="flex flex-col sm:flex-row items-center gap-6 p-0">
          <Avatar src={user.avatar} className="w-24 h-24 ring-4 ring-indigo-50 shrink-0" />
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h3>
              <Chip color={user.isPremium ? "warning" : "default"} variant="flat" size="sm" className="font-bold uppercase tracking-wider self-center sm:self-auto" startContent={<Star size={12} fill="currentColor"/>}>
                {user.isPremium ? "Premium Member" : "Free Tier Member"}
              </Chip>
            </div>
            <p className="text-slate-400 font-semibold text-sm flex items-center justify-center sm:justify-start gap-1.5">
              <Mail size={16}/> {user.email}
            </p>
            <div className="flex gap-4 justify-center sm:justify-start text-xs font-bold text-slate-500 pt-2">
              <div><span className="text-slate-900 text-sm font-black mr-1">24</span> Lessons Published</div>
              <div><span className="text-slate-900 text-sm font-black mr-1">15</span> Saved Bookmarks</div>
            </div>
          </div>
          <Button variant="bordered" className="font-bold rounded-xl text-sm border-slate-200 bg-white">Update Profile</Button>
        </Card.Content>
      </Card>

      {/* Chronological Public Author Activity Feed */}
      <div>
        <h4 className="text-lg font-black text-slate-900 tracking-tight mb-4">My Public Contributions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {publicLessons.map((item, i) => (
            <Card key={i} className="border border-slate-100 hover:shadow-md transition-shadow rounded-2xl bg-white p-5 flex flex-col justify-between min-h-[160px]">
              <Card.Header className="p-0 flex justify-between items-start gap-2">
                <Chip size="sm" variant="flat" color="primary" className="font-bold">{item.category}</Chip>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Calendar size={12}/> {item.date}</span>
              </Card.Header>
              <Card.Content className="p-0 my-4">
                <h5 className="font-bold text-slate-900 text-base line-clamp-2 leading-snug">{item.title}</h5>
              </Card.Content>
              <Card.Footer className="p-0 flex justify-between items-center border-t border-slate-50 pt-3">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">{item.tone}</span>
                <Button size="sm" variant="light" color="primary" className="font-bold text-xs">Read Details</Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}