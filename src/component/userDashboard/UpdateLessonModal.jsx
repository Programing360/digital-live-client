"use client";

import React, { useState, useEffect } from 'react';
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { Edit3, Image, Key } from "lucide-react";

export function UpdateLessonModal({ 
  isOpen, 
  onClose, 
  lessonData, 
  isPremiumUser = false, 
  onUpdateSuccess 
}) {
  // ফর্ম ফিল্ডগুলোর স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    access: "Free",
    userName: "", // Read-only
    userEmail: "", // Read-only
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(lessonData);

  useEffect(() => {
    if (lessonData) {
      setFormData({
        title: lessonData.title || "",
        category: lessonData.category || "",
        content: lessonData.content || "",
        access: lessonData.access || "Free",
        userName: lessonData.author.name || "MD Limon", 
        userEmail: lessonData.author.email || "limon@example.com", 
      });
      setSelectedImage(null);
    }
  }, [lessonData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // এখানে আপনার MongoDB API রাউট কল হবে (যেমন: fetch(`/api/lessons/${lessonData.id}`))
      // স্যাম্পল সাকসেস স্টেট প্রসেস:
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      
      if (onUpdateSuccess) {
        onUpdateSuccess({ ...formData, image: selectedImage });
      }
      onClose();
    } catch (error) {
      console.error("Failed to update lesson in MongoDB", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop className="bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in">
        <Modal.Container placement="auto" className="transition-all duration-300 animate-in fade-in zoom-in-95 slide-in-from-bottom-4">
          <Modal.Dialog className="sm:max-w-lg overflow-hidden">
            <Modal.CloseTrigger onClick={onClose} />
            
            <Modal.Header>
              <Modal.Icon className="bg-indigo-50 text-indigo-600 rounded-xl p-2">
                <Edit3 className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-xl font-bold text-slate-900 mt-2">Update Lesson Parameters</Modal.Heading>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Modify your existing collection node. Server-side persistence updates directly to MongoDB stack.
              </p>
            </Modal.Header>

            <Modal.Body className="p-5 max-h-[70vh] overflow-y-auto">
              <Surface variant="default" className="border-0 p-0 shadow-none bg-transparent">
                <form id="update-lesson-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  {/* User Name (Read-Only) */}
                  <TextField className="w-full opacity-70" name="userName" variant="secondary">
                    <Label className="flex items-center gap-1.5 text-slate-400"><Key size={12}/> Owner Name (Locked)</Label>
                    <Input value={formData.userName} readOnly className="bg-slate-50 cursor-not-allowed select-none font-semibold text-slate-500" />
                  </TextField>

                  {/* User Email (Read-Only) */}
                  <TextField className="w-full opacity-70" name="userEmail" variant="secondary">
                    <Label className="flex items-center gap-1.5 text-slate-400"><Key size={12}/> Owner Email (Locked)</Label>
                    <Input value={formData.userEmail} readOnly className="bg-slate-50 cursor-not-allowed select-none font-semibold text-slate-500" />
                  </TextField>

                  {/* Lesson Title (Editable) */}
                  <TextField className="w-full" name="title" variant="secondary">
                    <Label className="text-slate-700 font-bold">Lesson Title</Label>
                    <Input value={formData.title} onChange={handleInputChange} placeholder="Enter dynamic asset title" required />
                  </TextField>

                  {/* Category (Editable) */}
                  <TextField className="w-full" name="category" variant="secondary">
                    <Label className="text-slate-700 font-bold">Category</Label>
                    <Input value={formData.category} onChange={handleInputChange} placeholder="e.g. Next.js, MERN Stack" required />
                  </TextField>

                  {/* Content (Editable) */}
                  <TextField className="w-full" name="content" variant="secondary">
                    <Label className="text-slate-700 font-bold">Lesson Content / Brief</Label>
                    <Input value={formData.content} onChange={handleInputChange} placeholder="Update documentation overview..." />
                  </TextField>

                  {/* Access Level Selector (Premium Subscription Guarded) */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-slate-700 font-bold">Access Level Control</Label>
                    <select 
                      name="access"
                      value={formData.access}
                      onChange={(e) => {
                        if (e.target.value === "Premium" && !isPremiumUser) {
                          alert("Action Denied: Changing to Premium requires an active Premium subscription!");
                          return;
                        }
                        handleInputChange(e);
                      }}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="Free">Free (Standard Client Base)</option>
                      <option value="Premium">Premium (Paid Tier Only)</option>
                    </select>
                    {!isPremiumUser && (
                      <span className="text-[11px] text-amber-600 font-semibold mt-0.5 bg-amber-50 px-2 py-0.5 rounded-md w-fit">
                        🔒 Premium access switch locked. Upgrade subscription to enable.
                      </span>
                    )}
                  </div>

                  {/* Optional Image Re-upload */}
                  <div className="flex flex-col gap-2 border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50">
                    <Label className="text-slate-700 font-bold flex items-center gap-1"><Image size={14}/> Cover Image (Optional)</Label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                    />
                    {selectedImage && (
                      <p className="text-xs text-emerald-600 font-bold mt-1">✓ New target file staged: {selectedImage.name}</p>
                    )}
                  </div>

                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="border-t border-slate-50 p-4 flex justify-end gap-2 bg-slate-50/40">
              <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="update-lesson-form" 
                disabled={isSubmitting}
                className="bg-indigo-600 text-white font-bold shadow-sm hover:bg-indigo-700"
              >
                {isSubmitting ? "Saving to MongoDB..." : "Update Asset"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}