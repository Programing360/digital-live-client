"use client";
import React, { useState } from 'react';
import { Card, Button, Chip } from "@heroui/react";
import { Trash2, ExternalLink } from "lucide-react";

export default function MyFavorites() {
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useState([
    { id: 1, title: "The Art of Stoic Time Management", category: "Productivity", tone: "Calm", author: "Sophia Lin" },
    { id: 2, title: "Healing After Major Emotional Loss", category: "Mindset", tone: "Gratitude", author: "Marcus Brody" },
  ]);

  const filteredData = filter === "All" ? favorites : favorites.filter(f => f.category === filter);

  return (
    <div className="space-y-6" data-aos="fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Saved Favorites</h2>
          <p className="text-slate-500 text-sm mt-1">Review core bookmarked life insights and references saved to your account profile tier.</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["All", "Productivity", "Mindset"].map(cat => (
            <Button key={cat} size="sm" variant={filter === cat ? "solid" : "flat"} color={filter === cat ? "primary" : "default"} onClick={() => setFilter(cat)} className="font-bold rounded-xl">
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <Card className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Saved Insight</th>
                <th className="p-4">Category</th>
                <th className="p-4">Emotional Tone</th>
                <th className="p-4 pr-6 text-right">Action Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm text-slate-700 font-medium">
              {filteredData.map(fav => (
                <tr key={fav.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 pl-6">
                    <p className="font-bold text-slate-900">{fav.title}</p>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">By {fav.author}</p>
                  </td>
                  <td className="p-4"><Chip size="sm" variant="flat" color="secondary" className="font-bold">{fav.category}</Chip></td>
                  <td className="p-4"><Chip size="sm" variant="dot" color="warning" className="font-bold">{fav.tone}</Chip></td>
                  <td className="p-4 pr-6 text-right space-x-1">
                    <Button size="sm" variant="flat" color="primary" className="font-bold rounded-lg" endContent={<ExternalLink size={14}/>}>View</Button>
                    <Button isIconOnly size="sm" variant="light" color="danger" onClick={() => setFavorites(favorites.filter(f => f.id !== fav.id))}><Trash2 size={16}/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}