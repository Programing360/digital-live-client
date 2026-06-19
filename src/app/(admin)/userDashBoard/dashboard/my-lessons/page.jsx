"use client";
import React, { useState } from 'react';
import { Card, Button, Modal, Chip } from "@heroui/react";
import { Eye, Edit3, Trash2, Globe, Lock } from "lucide-react";

export default function MyLessons() {
  const [lessons, setLessons] = useState([
    { id: 1, title: "The Silent Power of Emotional Intelligence", category: "Mindset", access: "Premium", visibility: "Public", date: "Oct 12, 2023", likes: 1240 },
    { id: 2, title: "Navigating Career Pivots Safely", category: "Career", access: "Free", visibility: "Public", date: "Jan 04, 2024", likes: 89 },
  ]);
  const [deleteId, setDeleteId] = useState(null);

  const toggleVisibility = (id) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, visibility: l.visibility === "Public" ? "Private" : "Public" } : l));
  };

  return (
    <div className="space-y-6" data-aos="fade-up">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Lessons</h2>
        <p className="text-slate-500 text-sm mt-1">Manage, update visibility parameters, and audit engagement records across your items.</p>
      </div>

      <Card className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Lesson Content</th>
                <th className="p-4">Category</th>
                <th className="p-4">Access Level</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm text-slate-700 font-medium">
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 pl-6 max-w-xs">
                    <p className="font-bold text-slate-900 truncate">{lesson.title}</p>
                    <p className="text-xs font-semibold text-slate-400 mt-1">Published on {lesson.date}</p>
                  </td>
                  <td className="p-4"><Chip size="sm" variant="flat" color="primary" className="font-bold">{lesson.category}</Chip></td>
                  <td className="p-4">
                    <Chip size="sm" variant="dot" color={lesson.access === "Premium" ? "warning" : "success"} className="font-bold">{lesson.access}</Chip>
                  </td>
                  <td className="p-4">
                    <Button size="sm" variant="flat" color={lesson.visibility === "Public" ? "success" : "default"} onClick={() => toggleVisibility(lesson.id)} className="font-bold rounded-lg">
                      {lesson.visibility === "Public" ? <Globe size={14} className="mr-1"/> : <Lock size={14} className="mr-1"/>} {lesson.visibility}
                    </Button>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-1 whitespace-nowrap">
                    <Button isIconOnly size="sm" variant="light" className="text-slate-400 hover:text-slate-600"><Eye size={16}/></Button>
                    <Button isIconOnly size="sm" variant="light" className="text-indigo-500 hover:bg-indigo-50"><Edit3 size={16}/></Button>
                    <Button isIconOnly size="sm" variant="light" color="danger" onClick={() => setDeleteId(lesson.id)}><Trash2 size={16}/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Structured Confirmation Dialog Overlay Modal */}
      {deleteId && (
        <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
          <Modal.Backdrop><Modal.Container><Modal.Dialog>
            <Modal.Header><Modal.Heading className="text-lg font-bold">Confirm Deletion</Modal.Heading></Modal.Header>
            <Modal.Body><p className="text-sm text-slate-500">Are you completely sure you want to delete this lesson? This database structural erasure action is permanent.</p></Modal.Body>
            <Modal.Footer className="flex justify-end gap-2 mt-4">
              <Button size="sm" variant="light" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button size="sm" color="danger" onClick={() => { setLessons(lessons.filter(l => l.id !== deleteId)); setDeleteId(null); }}>Delete</Button>
            </Modal.Footer>
          </Modal.Dialog></Modal.Container></Modal.Backdrop>
        </Modal>
      )}
    </div>
  );
}