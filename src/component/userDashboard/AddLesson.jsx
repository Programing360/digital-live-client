"use client";
import React, { useState } from "react";
import {
  Card,
  Button,
  TextArea,
  Select,
  ListBox,
  Label,
  Tooltip,
} from "@heroui/react";
import {
  Sparkles,
  Lock,
  Image as ImageIcon,
  UploadCloud,
  X,
  Loader2,
} from "lucide-react";
import { createLesson } from "@/lib/action/lessonAdd";
import { toast } from "react-toastify";
import Image from "next/image";

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

  // Handle local file selection and generate preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear selected image
  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let uploadedImageUrl = "";

    // 1. Upload to ImgBB if an image was selected
    if (selectedFile) {
      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // Replace with your actual ImgBB API Key
      const imgData = new FormData();
      imgData.append("image", selectedFile);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: imgData,
          },
        );

        const result = await response.json();

        if (result.success) {
          uploadedImageUrl = result.data.url;
        } else {
          console.error("ImgBB Upload Error:", result.error?.message);
          alert(
            `Image upload failed: ${result.error?.message || "Unknown error"}`,
          );
          setIsUploading(false);
          return;
        }
      } catch (error) {
        console.error("Network Error during image upload:", error);
        alert("Network error during image upload. Please try again.");
        setIsUploading(false);
        return;
      }
    }

    // 2. Prepare payload for your MongoDB/Backend
    const payload = {
      ...formData,
      imageUrl: uploadedImageUrl, // Enriched with verified cloud host destination URL
      author: {
        authorId: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      likes: [],
      likesCount: 0,
      visibility: "Public",
      favorites: [],
      favoritesCount: 1,
      image: user.image,
      userEmail: user.name,
      userName: user.email,
    };

    const result = await createLesson(payload);
    if (result.insertedId) {
      toast.success("Saved Successfully!");
      removeImage();
      setIsUploading(false);
    }

    // Simulate successful API call response
    //   setTimeout(() => {
    //     toast.success(
    //       "Saved Successfully! Record entry registered with hosted cloud image link.",
    //     );
    //     // Reset Form State safely
    //     setFormData({
    //       title: "",
    //       description: "",
    //       category: "",
    //       emotionalTone: "",
    //       access: "Free",
    //     });

    //   }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto" data-aos="fade-up">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Create Life Lesson
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Share an experienced insight or paradigm shift with the community
          world workspace.
        </p>
      </div>

      <Card className="border border-slate-100 p-6 sm:p-8 shadow-sm rounded-2xl bg-white">
        <Card.Content>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lesson Title */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Lesson Title
              </label>
              <input
                type="text"
                required
                placeholder="Ex: The Importance of Saying No"
                className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-indigo-500 bg-slate-50/50"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Full Story & Insights */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Full Story & Insights
              </label>
              <TextArea
                placeholder="Deep dive into your experience..."
                className="w-full border border-slate-200 rounded-xl"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Category & Emotional Tone Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Category
                </Label>
                <Select>
                  <Select.Trigger className="w-full border p-3 rounded-xl flex justify-between bg-slate-50/50 text-sm">
                    <Select.Value placeholder="Select Category" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {[
                        "Personal Growth",
                        "Career",
                        "Relationships",
                        "Mindset",
                        "Mistakes Learned",
                      ].map((c) => (
                        <ListBox.Item
                          key={c}
                          onClick={() =>
                            setFormData({ ...formData, category: c })
                          }
                        >
                          {c}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Emotional Tone
                </Label>
                <Select>
                  <Select.Trigger className="w-full border p-3 rounded-xl flex justify-between bg-slate-50/50 text-sm">
                    <Select.Value placeholder="Select Tone" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {["Motivational", "Sad", "Realization", "Gratitude"].map(
                        (t) => (
                          <ListBox.Item
                            key={t}
                            onClick={() =>
                              setFormData({ ...formData, emotionalTone: t })
                            }
                          >
                            {t}
                          </ListBox.Item>
                        ),
                      )}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* New Local Device Image File Field Upload Module */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Cover Image (Optional)
              </label>

              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-all">
                  <div className="p-3 bg-white border border-slate-100 shadow-sm rounded-xl text-slate-400 mb-2">
                    <UploadCloud size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    Click to upload image
                  </span>
                  <span className="text-xs text-slate-400 font-semibold mt-1">
                    PNG, JPG, or WEBP formats accepted
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative border border-slate-200 rounded-2xl overflow-hidden group aspect-video bg-slate-900 flex items-center justify-center">
                  <Image
                    src={imagePreview}
                    alt="Upload Preview"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                  <Button
                    isIconOnly
                    size="sm"
                    color="danger"
                    variant="solid"
                    className="absolute top-3 right-3 rounded-xl opacity-90 backdrop-blur-md shadow-md"
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}
            </div>

            {/* Access Level Controls Block */}
            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Access Level
              </Label>
              {user.isPremium ? (
                <Select>
                  <Select.Trigger className="w-full border p-3 rounded-xl flex justify-between bg-slate-50/50 text-sm">
                    <Select.Value placeholder="Free" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item
                        key="Free"
                        onClick={() =>
                          setFormData({ ...formData, access: "Free" })
                        }
                      >
                        Free
                      </ListBox.Item>
                      <ListBox.Item
                        key="Premium"
                        onClick={() =>
                          setFormData({ ...formData, access: "Premium" })
                        }
                      >
                        Premium ⭐
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              ) : (
                <Tooltip
                  content="Upgrade to Premium to create paid lessons."
                  placement="top"
                  color="danger"
                >
                  <div className="w-full border border-slate-200/60 bg-slate-100 text-slate-400 p-3 rounded-xl text-sm flex items-center justify-between cursor-not-allowed">
                    <span className="flex items-center gap-2">
                      <Lock size={16} /> Free (Locked Premium Option)
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
              className="w-full font-bold rounded-xl mt-4 shadow-lg shadow-indigo-600/20"
              disabled={isUploading}
              startContent={
                isUploading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )
              }
            >
              {isUploading ? "Uploading Data..." : "Publish Lesson"}
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
