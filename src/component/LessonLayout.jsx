"use client";

import React, { useState } from "react";
import { 
  Card, 
  Button, 
  Progress, 
  Chip, 
  User,
  RadioGroup,
  Radio,
  Checkbox
} from "@heroui/react";

export default function LessonLayout() {
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      
      {/* 1. Global Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-divider bg-background/70 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🛜 LifeDigital
          </span>
          <Chip size="sm" variant="flat" color="primary" className="font-medium">
            Module 1
          </Chip>
        </div>
        <div className="flex items-center gap-4">
          <User   
            name="Alex Mercer"
            description="Level 4 Digital Citizen"
            avatarProps={{
              src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            }}
          />
        </div>
      </header>

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto p-4 md:p-8 gap-8">
        
        {/* Left Column: Sidebar Navigation (Hidden on Mobile) */}
        <aside className="hidden lg:block w-80 shrink-0 h-[calc(100vh-140px)] sticky top-28 overflow-y-auto pr-2 space-y-4">
          <Card shadow="none" className="p-5 border border-divider bg-content1/30 backdrop-blur-sm">
            <div className="space-y-1 mb-4">
              <p className="text-xs font-bold text-default-400 uppercase tracking-wider">Course Progress</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-default-600">Module 1 Mastery</span>
                <span className="font-bold text-primary">40%</span>
              </div>
            </div>
            <Progress size="sm" value={40} color="primary" className="mb-4" />
            
            {/* <Divider className="my-4" /> */}
            
            <nav className="flex flex-col gap-1.5">
              <p className="text-xs font-bold text-default-400 uppercase tracking-wider mb-2">Syllabus</p>
              <Button size="sm" variant="light" className="justify-start text-default-500 line-through">
                ✅ 1.1 The Attention Economy
              </Button>
              <Button size="sm" variant="flat" color="primary" className="justify-start font-semibold">
                📖 1.2 Digital Mindfulness Basics
              </Button>
              <Button size="sm" variant="light" className="justify-start text-default-400" isDisabled>
                🔒 1.3 Securing Data Identity
              </Button>
              <Button size="sm" variant="light" className="justify-start text-default-400" isDisabled>
                👥 1.4 Algorithmic Echo Chambers
              </Button>
            </nav>
          </Card>
        </aside>

        {/* Right Column: Main Reading & Activity Workspace */}
        <main className="flex-1 max-w-3xl space-y-8 pb-16">
          
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-2 text-xs font-medium text-default-400">
            <span>Dashboard</span> 
            <span>/</span> 
            <span>Digital Frameworks</span> 
            <span>/</span> 
            <span className="text-default-700">Lesson 1.2</span>
          </div>

          {/* Main Article Content */}
          <article className="space-y-5">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Digital Mindfulness: Reclaiming Your Cognitive Space
            </h1>
            
            <div className="flex gap-2 items-center">
              <Chip size="sm" variant="dot" color="success">Active Lesson</Chip>
              <span className="text-xs text-default-400">• 8 min read</span>
            </div>

            <p className="text-lg text-default-600 leading-relaxed pt-2">
              Modern digital ecosystems are hyper-optimized to trade your cognitive focus for advertising impressions. Breaking this design cycle isn&apos;t fundamentally about escaping technology—it&apos;s about building concrete mental and systemic guardrails.
            </p>

            <blockquote className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-2xl my-6 text-default-700 font-medium italic">
              &ldquo;If you aren&apos;t paying for the asset, your real-time attention vector is the commodity being traded.&rdquo;
            </blockquote>

            <h3 className="text-xl font-bold tracking-tight text-default-800 pt-4">
              Structural Modification Strategies
            </h3>
            <p className="text-default-600 leading-relaxed">
              Instead of relying entirely on fragile willpower, customize your physical user experience variables to limit unconscious browsing behaviors. 
            </p>
          </article>

          {/* Activity 1: Flat Micro-Task Card */}
          <Card className="p-5 border border-divider shadow-sm bg-gradient-to-tr from-content1 to-content2/50 flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-warning/10 text-warning rounded-xl text-xl">⏳</div>
              <div>
                <p className="text-md font-bold">Real-world Checkpoint</p>
                <p className="text-xs text-default-400">Apply this mechanism on your phone right now</p>
              </div>
            </div>
            
            <p className="text-sm text-default-600 leading-relaxed">
              Open your device settings and turn your entire display scheme to <strong>Grayscale mode</strong>. Stripping away artificial red badge notifications drastically mitigates immediate chemical visual triggers.
            </p>
            
            <Checkbox 
              isSelected={taskCompleted} 
              onValueChange={setTaskCompleted}
              color="success"
              className="text-sm font-semibold"
            >
              I have updated my phone display settings to grayscale.
            </Checkbox>

            <div className="flex justify-between items-center mt-2 pt-3 border-t border-divider">
              <span className="text-xs font-semibold text-warning">⭐ +100 XP</span>
              <Button 
                color={taskCompleted ? "success" : "default"} 
                size="sm" 
                variant={taskCompleted ? "solid" : "flat"}
                isDisabled={!taskCompleted}
              >
                {taskCompleted ? "Completed!" : "Complete Task"}
              </Button>
            </div>
          </Card>

          {/* Activity 2: Flat Quiz Card */}
          <Card className="p-5 border border-divider shadow-sm flex flex-col gap-4">
            <div>
              <Chip size="sm" color="secondary" variant="flat" className="font-semibold mb-2">QUIZ</Chip>
              <p className="text-lg font-bold">Checking Your Systemic View</p>
            </div>

            <RadioGroup
              label="What is the primary target of modern notification mechanics?"
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
              isDisabled={quizSubmitted}
              classNames={{ label: "text-sm text-default-500 mb-2" }}
            >
              <Radio value="A" classNames={{ label: "text-sm" }}>Optimizing functional operating background workflows.</Radio>
              <Radio value="B" classNames={{ label: "text-sm" }}>Sustaining continuous interactive session metrics.</Radio>
              <Radio value="C" classNames={{ label: "text-sm" }}>Improving local user interface accessibility values.</Radio>
            </RadioGroup>

            {quizSubmitted && (
              <div className={`p-3 rounded-xl text-sm ${selectedAnswer === "B" ? "bg-success-50 text-success border border-success-200" : "bg-danger-50 text-danger border border-danger-200"}`}>
                {selectedAnswer === "B" 
                  ? "🎯 Correct! Platforms prioritize keeping you in the session loops to increase ad impressions." 
                  : "❌ Try again. Think about the direct engagement dynamics of free applications."}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-divider">
              <Button 
                color="primary" 
                size="sm"
                isDisabled={!selectedAnswer}
                onClick={() => setQuizSubmitted(true)}
              >
                Submit Validation
              </Button>
            </div>
          </Card>

          {/* 3. Footer Pagination Architecture */}
          <footer className="flex items-center justify-between pt-6 border-t border-divider">
            <Button variant="bordered" radius="md" className="font-medium">
              ← Previous Lesson
            </Button>
            <Button color="primary" radius="md" className="font-medium shadow-lg shadow-primary/20">
              Next Module: Security
            </Button>
          </footer>

        </main>
      </div>
    </div>
  );
}