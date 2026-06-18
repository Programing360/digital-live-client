"use client";
import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Chip, 
  Card, 
  TextArea, 
  Avatar, 
  Modal, 
  Select, 
  ListBox,
  Label,
  Description
} from "@heroui/react";
import { 
  Heart, Bookmark, Flag, Share2, Clock, Calendar, 
  Eye, Lock, ArrowLeft, Send, MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";

// Mock Data
const lessonData = {
  id: "lesson_123",
  title: "The Silent Power of Emotional Intelligence",
  fullStory: `Emotional intelligence is more than just a buzzword; it's the foundation of high-performance leadership. In my early 20s, I believed that technical skill was the only lever for success. I was wrong. 
  
  One Tuesday afternoon, during a high-stakes board meeting, I lost my cool. Not in a loud way, but in a dismissive, arrogant way. I watched the room go cold. That moment cost me a partnership, but it gained me a perspective I’d use for the rest of my life. Understanding your own triggers and the emotional landscape of those around you is the ultimate 'soft' power that yields hard results.`,
  category: "Mindset",
  emotionalTone: "Realization",
  featuredImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1280&h=720&auto=format&fit=crop",
  accessLevel: "Premium",
  createdAt: "Oct 12, 2023",
  lastUpdated: "Jan 05, 2024",
  readingTime: "6 min read",
  author: {
    name: "Dr. Julian Vance",
    role: "Performance Psychologist",
    image: "https://i.pravatar.cc/150?u=julian",
    totalLessons: 42
  },
  initialStats: {
    likes: 1240,
    favorites: 342,
    views: Math.floor(Math.random() * 10000)
  }
};

export default function LessonDetailsPage() {
  const router = useRouter();
  
  // States
  const [isUserPremium] = useState(false); // Toggle to test premium gatekeeping
  const [isLoggedIn] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(lessonData.initialStats.likes);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleLike = () => {
    if (!isLoggedIn) return alert("Please log in to like!");
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Premium Access Logic
  const isLocked = lessonData.accessLevel === "Premium" && !isUserPremium;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-default-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="light" startContent={<ArrowLeft size={18} />} onPress={() => router.back()}>
            Back to Lessons
          </Button>
          <div className="flex gap-2">
             <Button isIconOnly variant="flat" onPress={handleSave} color={isSaved ? "warning" : "default"}>
                <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
             </Button>
             <Button isIconOnly variant="flat" color="primary">
                <Share2 size={20} />
             </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        
        {/* 1. Header Section */}
        <header className="mb-10" data-aos="fade-up">
          <div className="flex gap-3 mb-4">
            <Chip color="primary" variant="flat" className="capitalize">{lessonData.category}</Chip>
            <Chip color="secondary" variant="dot" className="capitalize">{lessonData.emotionalTone}</Chip>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {lessonData.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-500">
            <div className="flex items-center gap-2"><Calendar size={16}/> {lessonData.createdAt}</div>
            <div className="flex items-center gap-2"><Clock size={16}/> {lessonData.readingTime}</div>
            <div className="flex items-center gap-2"><Eye size={16}/> {lessonData.initialStats.views.toLocaleString()} views</div>
          </div>
        </header>

        {/* 2. Featured Image */}
        <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-slate-200" data-aos="zoom-in">
          <img src={lessonData.featuredImage} alt="Cover" className="w-full aspect-video object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Premium Blur Logic */}
              <div className={`prose prose-slate max-w-none transition-all duration-700 ${isLocked ? 'blur-xl select-none h-96 overflow-hidden' : ''}`}>
                <p className="text-xl leading-relaxed text-slate-700 whitespace-pre-line">
                  {lessonData.fullStory}
                </p>
              </div>

              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Card className="max-w-md bg-white/90 backdrop-blur-md border-slate-200">
                    <Card.Header className="flex flex-col items-center pt-6">
                      <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary mb-2">
                        <Lock size={32} />
                      </div>
                      <Card.Title className="text-2xl font-bold">Premium Content</Card.Title>
                      <Card.Description className="text-center text-slate-600 mt-2">
                        This life lesson is reserved for premium members. Upgrade to unlock the full story and insights.
                      </Card.Description>
                    </Card.Header>
                    <Card.Content className="p-6 pt-0">
                      <Button color="primary" size="lg" className="w-full font-bold" onPress={() => router.push('/pricing')}>
                        Upgrade to View
                      </Button>
                    </Card.Content>
                  </Card>
                </div>
              )}
            </div>

            {/* 3. Interaction Section */}
            {!isLocked && (
              <section className="mt-12 py-8 border-y border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center flex-col sm:flex-row gap-2">
                    <Button 
                      radius="full" 
                      variant={isLiked ? "solid" : "flat"} 
                      color="danger" 
                      startContent={<Heart size={20} fill={isLiked ? "currentColor" : "none"} />}
                      onPress={handleLike}
                    >
                      {likeCount.toLocaleString()}
                    </Button>
                    <span className="text-slate-400 text-sm">{lessonData.initialStats.favorites} Favorites</span>
                  </div>
                </div>
                <Button color="default" variant="light" startContent={<Flag size={18} />} onPress={() => setIsModalOpen(true)}>
                  Report
                </Button>
              </section>
            )}

            {/* 4. Comments Section */}
            {!isLocked && (
               <section className="mt-12" data-aos="fade-up">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare size={24}/> Comments
                  </h3>
                  <div className="flex gap-4 mb-8">
                    <Avatar src="https://i.pravatar.cc/150?u=me" size="md" />
                    <div className="flex-grow flex flex-col gap-2">
                       <TextArea 
                          aria-label="Write a comment"
                          placeholder="What are your thoughts on this lesson?" 
                          className="w-full border rounded-xl"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                       />
                       <Button color="primary" className="self-end mt-2" endContent={<Send size={16}/>} isDisabled={!comment}>
                          Post Comment
                       </Button>
                    </div>
                  </div>
                  
                  {/* Mock Comments */}
                  <div className="space-y-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-4">
                         <Avatar src={`https://i.pravatar.cc/150?u=${i}`} size="sm" />
                         <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex-grow">
                            <p className="font-bold text-sm">User_{i} <span className="font-normal text-slate-400 ml-2">2 hours ago</span></p>
                            <p className="text-slate-600 mt-1">This insight really resonates with me. I've had similar experiences in my career path.</p>
                         </div>
                      </div>
                    ))}
                  </div>
               </section>
            )}
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Author Card */}
            <Card className="border-none shadow-xl shadow-slate-200/50 p-2" data-aos="fade-left">
              <Card.Content className="flex flex-col items-center text-center p-6">
                <Avatar src={lessonData.author.image} className="w-24 h-24 mb-4 ring-4 ring-primary-50" />
                <h4 className="text-xl font-bold">{lessonData.author.name}</h4>
                <p className="text-slate-500 text-sm mb-4">{lessonData.author.role}</p>
                
                <div className="flex justify-between w-full mb-6 border-t pt-4">
                  <div className="text-center">
                    <p className="font-bold text-lg">{lessonData.author.totalLessons}</p>
                    <p className="text-xs text-slate-400 uppercase">Lessons</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">12.5K</p>
                    <p className="text-xs text-slate-400 uppercase">Followers</p>
                  </div>
                </div>
                <Button color="primary" variant="flat" className="w-full font-semibold" onPress={() => router.push('/profile/author')}>
                  View All Lessons
                </Button>
              </Card.Content>
            </Card>

            {/* Metadata Block */}
            <Card className="bg-slate-900 text-white p-4" data-aos="fade-left" data-aos-delay="200">
               <Card.Content className="flex flex-col gap-4">
                  <h5 className="font-bold border-b border-slate-700 pb-2">Lesson Meta</h5>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Visibility</span>
                    <span className="text-emerald-400 font-mono">PUBLIC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Last Updated</span>
                    <span>{lessonData.lastUpdated}</span>
                  </div>
               </Card.Content>
            </Card>
          </aside>
        </div>

        {/* 5. Recommended Lessons Section */}
        <section className="mt-24" data-aos="fade-up">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Similar Insights</h2>
              <Button variant="light" color="primary">Explore More</Button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <SimilarLessonCard key={item} index={item} />
              ))}
           </div>
        </section>
      </main>

      {/* Report Modal Built via Structured Layout */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog>
                <Modal.CloseTrigger onClick={() => setIsModalOpen(false)} />
                <Modal.Header>
                  <Modal.Heading className="text-xl font-bold">Report This Content</Modal.Heading>
                </Modal.Header>
                <Modal.Body className="space-y-4">
                  <p className="text-sm text-slate-500">
                    Please select the reason for reporting this lesson. Our moderators will review it shortly.
                  </p>
                  
                  {/* Custom Selector layout matching structural parameters */}
                  <Select>
                    <Label className="text-sm font-medium mb-1 block">Reason for Reporting</Label>
                    <Select.Trigger className="w-full border p-2 rounded-lg flex justify-between items-center bg-white">
                      <Select.Value placeholder="Select a reason..." />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item key="spam">
                          <Label>Spam or Misleading</Label>
                          <Description>Irrelevant links or advertisement text</Description>
                        </ListBox.Item>
                        <ListBox.Item key="hate">
                          <Label>Inappropriate Content</Label>
                          <Description>Violates structural community standards</Description>
                        </ListBox.Item>
                        <ListBox.Item key="harmful">
                          <Label>Plagiarism</Label>
                          <Description>Copied work without original licensing authorization</Description>
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <div className="mt-2">
                    <Label className="text-sm font-medium mb-1 block">Additional Details</Label>
                    <TextArea 
                      placeholder="Provide more context..." 
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end gap-2 mt-4">
                  <Button variant="light" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button color="danger" onClick={() => { alert("Report submitted"); setIsModalOpen(false); }}>
                    Submit Report
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}
    </div>
  );
}

// Custom Similar Lesson Card Component adhering to component guidelines
function SimilarLessonCard({ index }) {
  return (
    <Card className="border-none shadow-lg shadow-slate-100 hover:-translate-y-2 transition-transform duration-300">
      <Card.Content className="p-0">
        <img 
          src={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&h=250&auto=format&fit=crop&sig=${index}`} 
          className="w-full h-48 object-cover rounded-t-xl" 
          alt="Similar" 
        />
        <div className="p-5">
           <Chip size="sm" variant="flat" color="primary" className="mb-2">Mindset</Chip>
           <h4 className="font-bold text-lg line-clamp-2 mb-3">Developing Resilience in the Modern Age</h4>
           <div className="flex items-center gap-2">
             <Avatar size="sm" src={`https://i.pravatar.cc/150?u=${index}`} />
             <span className="text-xs text-slate-500 font-medium">User Profile Name</span>
           </div>
        </div>
      </Card.Content>
    </Card>
  );
}