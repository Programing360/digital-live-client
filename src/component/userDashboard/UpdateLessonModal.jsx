"use client";

import React, { useState, useEffect } from 'react';
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { Edit3, Image, Key, Lock, Sparkles, Check, ChevronDown } from "lucide-react";
import { lessonUpdate } from '@/lib/action/lessonUpdate';
import { toast } from 'react-toastify';

export function UpdateLessonModal({ 
  isOpen, 
  onClose, 
  lessonData, 
  isPremiumUser = false, 
  onUpdateSuccess 
}) {

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "", 
    access: "Free",
    userName: "", 
    userEmail: "", 
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
 
  useEffect(() => {
    if (isOpen && lessonData) {
      setFormData({
        title: lessonData.title || "",
        category: lessonData.category || "",
        description: lessonData.description || "", 
        access: lessonData.access || "Free",
        userName: lessonData.author?.name || lessonData.userName || "MD Limon", 
        userEmail: lessonData.author?.email || lessonData.userEmail || "limon@example.com", 
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
    if (!lessonData?._id) {
      toast.error("Invalid Asset Identifier Matrix.");
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        ...formData,
        image: selectedImage
      };
      
      const updateResult = await lessonUpdate(lessonData._id, updateData);

      if (updateResult?.modifiedCount || updateResult) {
        toast.success('Lesson Update Successful');
      }
      
      if (onUpdateSuccess) {
        onUpdateSuccess({ ...formData, _id: lessonData._id });
      }
      onClose();
    } catch (error) {
      console.error("Failed to update lesson in MongoDB", error);
      toast.error("Failed to persist upstream updates.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop className="bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in dark:text-white">
        <Modal.Container placement="auto" className="transition-all duration-300 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 dark:text-white">
          <Modal.Dialog className="sm:max-w-lg rounded-[28px] border border-slate-100 dark:border-zinc-900/80 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
            <Modal.CloseTrigger onClick={onClose} />
            
            <Modal.Header className="px-6 pt-6">
              <div className="flex gap-3 items-start">
                <Modal.Icon className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl p-2 shrink-0">
                  <Edit3 className="size-5" />
                </Modal.Icon>
                <div>
                  <Modal.Heading className="text-base font-black text-slate-800 dark:text-white tracking-tight">
                    Update Lesson Parameters
                  </Modal.Heading>
                  <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-default-400">
                    Modify your asset node instance. Changes sync back to your MongoDB cluster pipelines.
                  </p>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="px-6 py-4 max-h-[65vh] overflow-y-auto space-y-4"> 
              <Surface variant="default" className="border-0 p-0 shadow-none bg-transparent">
                <form id="update-lesson-form" onSubmit={handleSubmit} className="flex flex-col gap-4 dark:text-white">
                  
                  {/* Read-Only Owner Segment Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-75">
                    <TextField className="w-full" name="userName" variant="secondary">
                      <Label className="flex items-center gap-1 text-[11px] font-bold text-default-400"><Key size={11}/> Creator</Label>
                      <Input value={formData.userName} readOnly className="bg-default-50 dark:bg-zinc-800/50 cursor-not-allowed select-none font-semibold text-xs h-9 rounded-xl text-default-500 dark:text-white" />
                    </TextField>

                    <TextField className="w-full" name="userEmail" variant="secondary">
                      <Label className="flex items-center gap-1 text-[11px] font-bold text-default-400"><Key size={11}/> Security Scope</Label>
                      <Input value={formData.userEmail} readOnly className="bg-default-50 dark:bg-zinc-800/50 cursor-not-allowed select-none font-semibold text-xs h-9 rounded-xl text-default-500 dark:text-white" />
                    </TextField>
                  </div>

                  {/* Lesson Title */}
                  <TextField className="w-full" name="title" variant="secondary">
                    <Label className="text-slate-700 dark:text-zinc-300 font-extrabold text-xs">Lesson Title</Label>
                    <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter dynamic asset title" className="text-xs h-10 rounded-xl font-medium dark:text-white" required />
                  </TextField>

                  {/* Category */}
                  <TextField className="w-full" name="category" variant="secondary">
                    <Label className="text-slate-700 dark:text-zinc-300 font-extrabold text-xs">Category Identity</Label>
                    <Input name="category" value={formData.category} onChange={handleInputChange} placeholder="e.g. Next.js, MERN Stack" className="text-xs h-10 rounded-xl font-medium dark:text-white" required />
                  </TextField>

                  {/* Description */}
                  <TextField className="w-full" name="description" variant="secondary">
                    <Label className="text-slate-700 dark:text-zinc-300 font-extrabold text-xs">Lesson Description</Label>
                    <Input name="description" value={formData.description} onChange={handleInputChange} placeholder="Update documentation details..." className="text-xs h-10 rounded-xl font-medium dark:text-white" />
                  </TextField>

                  {/* Access Level Controller */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-slate-700 dark:text-zinc-300 font-extrabold text-xs flex items-center gap-1.5">
                      Clearance Target Access
                    </Label>
                    
                    {lessonData?.access === 'Premium' ? (
                      <div className="relative">
                        <select 
                          name="access"
                          value={formData.access}
                          onChange={handleInputChange}
                          className="w-full h-10 pl-3 pr-10 rounded-xl border border-default-200 dark:border-zinc-800 bg-default-50 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="Free">🟢 Free (Public Access Level)</option>
                          <option value="Premium">✨ Premium (Subscription Tier Lock)</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-default-400" />
                      </div>
                    ) : (
                      <div className="relative flex items-center">
                        <Input 
                          value="Free (Standard Base Client)" 
                          readOnly 
                          className="w-full bg-default-100 dark:bg-zinc-800/80 cursor-not-allowed select-none font-bold text-xs h-10 rounded-xl text-slate-500 dark:text-zinc-400 pl-3 border border-transparent"
                        />
                        <div className="absolute right-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 p-1 rounded-lg border border-amber-500/10">
                          <Lock size={12} strokeWidth={2.5} />
                        </div>
                      </div>
                    )}

                    {!isPremiumUser && (
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold mt-0.5 bg-amber-500/10 border border-amber-500/10 px-2.5 py-1 rounded-lg w-fit flex items-center gap-1">
                        <Sparkles size={11} className="animate-pulse" /> Access state mutation locked. Upgrade profile to broadcast Premium items.
                      </span>
                    )}
                  </div>

                  {/* Image Dropzone */}
                  <div className="flex flex-col gap-2 border border-dashed border-default-200 dark:border-zinc-800 rounded-xl p-4 bg-default-50/40">
                    <Label className="text-slate-700 dark:text-zinc-300 font-extrabold text-xs flex items-center gap-1"><Image size={13}/> Cover Image Attachment</Label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="text-xs text-default-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 dark:file:bg-indigo-950/40 file:text-indigo-600 dark:file:text-indigo-400 hover:file:opacity-80 cursor-pointer"
                    />
                    {selectedImage && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
                        <Check size={12} /> Staged file payload: {selectedImage.name}
                      </p>
                    )}
                  </div>

                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="border-t border-default-100 dark:border-zinc-800/60 p-4 flex justify-end gap-2 bg-default-50/30">
              <Button 
                variant="flat" 
                onClick={onClose} 
                disabled={isSubmitting}
                className="font-bold text-xs h-9 bg-default-100 text-default-600 dark:bg-zinc-800 dark:text-zinc-300 rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="update-lesson-form" 
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs h-9 rounded-xl shadow-sm shadow-indigo-600/10"
              >
                {isSubmitting ? "Syncing Workspace..." : "Update Asset"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}