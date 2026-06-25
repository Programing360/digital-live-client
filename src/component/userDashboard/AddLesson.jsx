"use client";

import React, { useState } from "react";
import { Card, Button, TextArea, Select, ListBox, Label, Tooltip } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Lock, UploadCloud, X, Loader2, ChevronDown, Check } from "lucide-react";
import { createLesson } from "@/lib/action/lessonAdd";
import { toast } from "react-toastify";
import Image from "next/image";

// Premium Framer Motion Presets
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 20, staggerChildren: 0.08 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function AddLesson({ user }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    emotionalTone: "",
    access: "Free",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const categories = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
  const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let uploadedImageUrl = "";

    if (selectedFile) {
      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const imgData = new FormData();
      imgData.append("image", selectedFile);

      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: "POST",
          body: imgData,
        });
        const result = await response.json();
        if (result.success) {
          uploadedImageUrl = result.data.url;
        } else {
          toast.error(`Image upload failed: ${result.error?.message || "Unknown error"}`);
          setIsUploading(false);
          return;
        }
      } catch (error) {
        toast.error("Network error during image upload. Please try again.");
        setIsUploading(false);
        return;
      }
    }

    const payload = {
      ...formData,
      imageUrl: uploadedImageUrl,
      author: {
        authorId: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
      },
      likes: [],
      likesCount: 0,
      visibility: "Public",
      favorites: [],
      favoritesCount: 1,
      image: user?.image,
      userEmail: user?.name,
      userName: user?.email,
    };

    const result = await createLesson(payload);
    if (result?.insertedId) {
      toast.success("Saved Successfully!");
      setFormData({ title: "", description: "", category: "", emotionalTone: "", access: "Free" });
      removeImage();
    }
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden selection:bg-indigo-500/20">
      
      {/* Dynamic Futuristic Glow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      <motion.div 
        className="max-w-2xl mx-auto relative z-10 space-y-8"
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        {/* Header Block */}
        <motion.div className="text-left space-y-2" variants={ITEM_VARIANTS}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Sparkles size={12} className="animate-pulse" /> Global Creative Sync
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Create Life Lesson
          </h2>
          <p className="text-slate-500 dark:text-purple-300/40 text-sm">
            Share an experienced insight or paradigm shift with the community workspace.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div variants={ITEM_VARIANTS}>
          <Card className="border border-slate-200/60 dark:border-purple-500/10 shadow-xl dark:shadow-purple-950/20 rounded-[28px] bg-white/80 dark:bg-[#0f0226]/60 backdrop-blur-xl overflow-hidden">
            <Card.Content className="p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Title Segment */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-purple-300/30 block">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: The Importance of Saying No"
                    className="w-full border border-slate-200 dark:border-purple-500/10 rounded-2xl p-3.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 bg-slate-50/50 dark:bg-purple-950/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/20"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Textarea Description Segment */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-purple-300/30 block">
                    Full Story & Insights
                  </label>
                  <TextArea
                    required
                    placeholder="Deep dive into your experience..."
                    className="w-full border border-slate-200 dark:border-purple-500/10 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/40 bg-slate-50/50 dark:bg-purple-950/20 text-slate-900 dark:text-white"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Select Matrix Dropdowns Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Category Field */}
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-purple-300/30 block">
                      Category
                    </Label>
                    <Select>
                      <Select.Trigger className="w-full border border-slate-200 dark:border-purple-500/10 p-3.5 rounded-2xl flex justify-between bg-slate-50/50 dark:bg-purple-950/20 text-sm font-medium text-slate-700 dark:text-purple-200 items-center">
                        <Select.Value placeholder={formData.category || "Select Category"} />
                        <ChevronDown size={14} className="text-slate-400" />
                      </Select.Trigger>
                      <Select.Popover className="border border-slate-200/60 dark:border-purple-500/10 bg-white/95 dark:bg-[#0f0226]/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl z-50">
                        <ListBox>
                          {categories.map((c) => (
                            <ListBox.Item
                              key={c}
                              className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-purple-950/40 ${formData.category === c ? 'text-indigo-600 dark:text-[#00e5b4]' : 'text-slate-700 dark:text-purple-100'}`}
                              onClick={() => setFormData({ ...formData, category: c })}
                            >
                              <span>{c}</span>
                              {formData.category === c && <Check size={14} />}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Tone Field */}
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-purple-300/30 block">
                      Emotional Tone
                    </Label>
                    <Select>
                      <Select.Trigger className="w-full border border-slate-200 dark:border-purple-500/10 p-3.5 rounded-2xl flex justify-between bg-slate-50/50 dark:bg-purple-950/20 text-sm font-medium text-slate-700 dark:text-purple-200 items-center">
                        <Select.Value placeholder={formData.emotionalTone || "Select Tone"} />
                        <ChevronDown size={14} className="text-slate-400" />
                      </Select.Trigger>
                      <Select.Popover className="border border-slate-200/60 dark:border-purple-500/10 bg-white/95 dark:bg-[#0f0226]/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl z-50">
                        <ListBox>
                          {tones.map((t) => (
                            <ListBox.Item
                              key={t}
                              className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-purple-950/40 ${formData.emotionalTone === t ? 'text-indigo-600 dark:text-[#00e5b4]' : 'text-slate-700 dark:text-purple-100'}`}
                              onClick={() => setFormData({ ...formData, emotionalTone: t })}
                            >
                              <span>{t}</span>
                              {formData.emotionalTone === t && <Check size={14} />}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>

                {/* Animated Image Uploader Component */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-purple-300/30 block">
                    Cover Image (Optional)
                  </label>
                  
                  <AnimatePresence mode="wait">
                    {!imagePreview ? (
                      <motion.label 
                        key="uploader"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-purple-500/20 rounded-2xl p-8 bg-slate-50/50 dark:bg-purple-950/10 hover:bg-slate-50 dark:hover:bg-purple-950/20 cursor-pointer transition-all group"
                      >
                        <div className="p-3 bg-white dark:bg-purple-950/40 border border-slate-100 dark:border-purple-500/10 shadow-sm rounded-xl text-slate-400 group-hover:scale-110 transition-transform duration-300">
                          <UploadCloud size={22} className="text-indigo-500 dark:text-purple-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-purple-100 mt-2">
                          Click to upload image
                        </span>
                        <span className="text-xs text-slate-400 dark:text-purple-300/30 font-semibold mt-1">
                          PNG, JPG, or WEBP formats accepted
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </motion.label>
                    ) : (
                      <motion.div 
                        key="preview"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="relative border border-slate-200 dark:border-purple-500/10 rounded-2xl overflow-hidden aspect-video bg-slate-900/10 flex items-center justify-center max-h-64 shadow-inner"
                      >
                        <Image
                          src={imagePreview}
                          alt="Upload Preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="solid"
                          className="absolute top-3 right-3 rounded-xl opacity-90 backdrop-blur-md shadow-md hover:scale-105"
                          onClick={removeImage}
                        >
                          <X size={15} />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Access Level Controls Block */}
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-purple-300/30 block">
                    Access Level
                  </Label>
                  {user?.isPlan === 'Premium' ? (
                    <Select>
                      <Select.Trigger className="w-full border border-slate-200 dark:border-purple-500/10 p-3.5 rounded-2xl flex justify-between bg-slate-50/50 dark:bg-purple-950/20 text-sm font-medium text-slate-700 dark:text-purple-200 items-center">
                        <Select.Value placeholder={formData.access || "Free"} />
                        <ChevronDown size={14} className="text-slate-400" />
                      </Select.Trigger>
                      <Select.Popover className="border border-slate-200/60 dark:border-purple-500/10 bg-white/95 dark:bg-[#0f0226]/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl z-50">
                        <ListBox>
                          {["Free", "Premium"].map((opt) => (
                            <ListBox.Item
                              key={opt}
                              className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-purple-950/40 ${formData.access === opt ? 'text-indigo-600 dark:text-[#00e5b4]' : 'text-slate-700 dark:text-purple-100'}`}
                              onClick={() => setFormData({ ...formData, access: opt })}
                            >
                              <span>{opt === "Premium" ? "Premium ⭐" : "Free"}</span>
                              {formData.access === opt && <Check size={14} />}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  ) : (
                    <Tooltip content="Upgrade to Premium to create paid lessons." placement="top" color="danger">
                      <div className="w-full border border-slate-200/60 dark:border-purple-500/10 bg-slate-100 dark:bg-purple-950/30 text-slate-400 dark:text-purple-300/20 p-3.5 rounded-2xl text-sm flex items-center justify-between cursor-not-allowed font-medium">
                        <span className="flex items-center gap-2">
                          <Lock size={15} /> Free (Premium Options Locked)
                        </span>
                      </div>
                    </Tooltip>
                  )}
                </div>

                {/* Form Actions Submit Trigger Button */}
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="w-full font-bold rounded-2xl mt-4 shadow-xl shadow-indigo-600/20 dark:shadow-indigo-500/5 bg-indigo-600 hover:bg-indigo-500 text-white transition-all py-6 h-auto text-sm tracking-wide"
                  disabled={isUploading}
                  startContent={
                    isUploading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Sparkles size={16} />
                    )
                  }
                >
                  {isUploading ? "Uploading Paradigm Stack..." : "Publish Lesson"}
                </Button>
              </form>
            </Card.Content>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}