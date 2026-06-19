"use client";
import React, { useState } from 'react';
import { Card, Button, TextArea, Select, ListBox, Label, Description, Tooltip } from "@heroui/react";
import { Sparkles, Lock } from "lucide-react";

export default function AddLesson({ user }) {
  const [formData, setFormData] = useState({ title: "", story: "", category: "", tone: "", access: "Free" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Saved Successfully! Registered entry cleanly into local simulation.");
  };

  return (
    <div className="max-w-2xl mx-auto" data-aos="fade-up">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create Life Lesson</h2>
        <p className="text-slate-500 text-sm mt-1">Share an experienced insight or paradigm shift with the community world workspace.</p>
      </div>

      <Card className="border border-slate-100 p-6 sm:p-8 shadow-sm rounded-2xl bg-white">
        <Card.Content>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Lesson Title</label>
              <input 
                type="text" required placeholder="Ex: The Importance of Saying No"
                className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-indigo-500 bg-slate-50/50"
                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Full Story & Insights</label>
              <TextArea 
                placeholder="Deep dive into your experience..." className="w-full border border-slate-200 rounded-xl"
                value={formData.story} onChange={(e) => setFormData({...formData, story: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Category</Label>
                <Select>
                  <Select.Trigger className="w-full border p-3 rounded-xl flex justify-between bg-slate-50/50 text-sm">
                    <Select.Value placeholder="Select Category" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover><ListBox>
                    {["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"].map(c => (
                      <ListBox.Item key={c} onClick={() => setFormData({...formData, category: c})}>{c}</ListBox.Item>
                    ))}
                  </ListBox></Select.Popover>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Emotional Tone</Label>
                <Select>
                  <Select.Trigger className="w-full border p-3 rounded-xl flex justify-between bg-slate-50/50 text-sm">
                    <Select.Value placeholder="Select Tone" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover><ListBox>
                    {["Motivational", "Sad", "Realization", "Gratitude"].map(t => (
                      <ListBox.Item key={t} onClick={() => setFormData({...formData, tone: t})}>{t}</ListBox.Item>
                    ))}
                  </ListBox></Select.Popover>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Access Level</Label>
              {user.isPremium ? (
                <Select>
                  <Select.Trigger className="w-full border p-3 rounded-xl flex justify-between bg-slate-50/50 text-sm">
                    <Select.Value placeholder="Free" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover><ListBox>
                    <ListBox.Item key="Free" onClick={() => setFormData({...formData, access: "Free"})}>Free</ListBox.Item>
                    <ListBox.Item key="Premium" onClick={() => setFormData({...formData, access: "Premium"})}>Premium ⭐</ListBox.Item>
                  </ListBox></Select.Popover>
                </Select>
              ) : (
                <Tooltip content="Upgrade to Premium to create paid lessons." placement="top" color="danger">
                  <div className="w-full border border-slate-200/60 bg-slate-100 text-slate-400 p-3 rounded-xl text-sm flex items-center justify-between cursor-not-allowed">
                    <span className="flex items-center gap-2"><Lock size={16}/> Free (Locked Premium Option)</span>
                  </div>
                </Tooltip>
              )}
            </div>

            <Button type="submit" color="primary" size="lg" className="w-full font-bold rounded-xl mt-4 shadow-lg shadow-indigo-600/20" startContent={<Sparkles size={18}/>}>
              Publish Lesson
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}