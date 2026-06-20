"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Chip } from "@heroui/react";
import {
  Eye,
  Edit3,
  Trash2,
  Globe,
  Lock,
  Heart,
  Bookmark,
  Calendar,
} from "lucide-react";
import { lessonUpdate } from "@/lib/action/lessonUpdate";
import { toast } from "react-toastify";
import Link from "next/link";

export default function MyLessons({
  lessonsData = [],
  isPremiumUser = false,
  onEditAction,
}) {
  const [lessons, setLessons] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (lessonsData) {
      setLessons(lessonsData);
    }
  }, [lessonsData]);

  // console.log(lessonsData);

  // Visibility toggle handler
  const toggleVisibility = async (id) => {
    const lesson = lessons.find((l) => l._id === id);

    const newVisibility = lesson.visibility === "Public" ? "Private" : "Public";

    setLessons((prev) =>
      prev.map((l) =>
        l._id === id
          ? {
              ...l,
              visibility: newVisibility,
            }
          : l,
      ),
    );

    const updateVisibility = { visibility: newVisibility };

    const res = await lessonUpdate(id, updateVisibility);
    console.log(res);
  };

  // Access Level toggle handler (Premium users only check)
  const toggleAccessLevel = async (id) => {
    if (!isPremiumUser) {
      alert("Only premium users can toggle access levels!");
      return;
    }

    const lesson = lessons.find((l) => l._id === id);

    const newAccess = lesson.access === "Premium" ? "Free" : "Premium";

    // Optimistic UI Update
    setLessons((prev) =>
      prev.map((l) => (l._id === id ? { ...l, access: newAccess } : l)),
    );

    const updateAccess = { access: newAccess };

    const res = await lessonUpdate(id, updateAccess);
    if (res.modifiedCount) {
      toast.success("Access level Update");
    }
  };

  const handleDelete = () => {
    setLessons(lessons.filter((l) => l.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6" data-aos="fade-up">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          My Lessons
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage, update visibility parameters, and audit engagement records
          across your items.
        </p>
      </div>

      <Card className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Lesson Content</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stats Engagement</th>
                <th className="p-4">Access Level</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm text-slate-700 font-medium">
              {lessons.map((lesson) => (
                <tr
                  key={lesson._id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {/* Lesson Content & Created Date */}
                  <td className="p-4 pl-6 max-w-xs">
                    <p className="font-bold text-slate-900 truncate">
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 mt-1">
                      <Calendar size={12} />
                      <span>
                        Created:{" "}
                        {new Date(lesson.createAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <Chip
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="font-bold"
                    >
                      {lesson.category}
                    </Chip>
                  </td>

                  {/* Reaction Count & Saves/Favorites count */}
                  <td className="p-4">
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1 text-rose-500 bg-rose-50 px-2 py-1 rounded-md">
                        <Heart size={12} className="fill-rose-500" />{" "}
                        {lesson.likesCount || 0}
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                        <Bookmark size={12} className="fill-amber-500" />{" "}
                        {lesson.saves || 0}
                      </span>
                    </div>
                  </td>

                  {/* Access Level Toggle (Free / Premium - Premium user restriction) */}
                  <td className="p-4">
                    <button
                      onClick={() => toggleAccessLevel(lesson._id)}
                      className="focus:outline-none transition-transform active:scale-95"
                      title={
                        !isPremiumUser
                          ? "Premium feature only"
                          : "Click to toggle access level"
                      }
                    >
                      <Chip
                        size="sm"
                        variant="dot"
                        color={
                          lesson.access === "Premium" ? "warning" : "success"
                        }
                        className="font-bold cursor-pointer"
                      >
                        {lesson.access}
                      </Chip>
                    </button>
                  </td>

                  {/* Visibility (Public / Private Toggle) */}
                  <td className="p-4">
                    <Button
                      size="sm"
                      variant="flat"
                      color={
                        lesson.visibility === "Public" ? "success" : "default"
                      }
                      onClick={() => toggleVisibility(lesson._id)}
                      className="font-bold rounded-lg"
                    >
                      {lesson.visibility === "Public" ? (
                        <Globe size={14} className="mr-1" />
                      ) : (
                        <Lock size={14} className="mr-1" />
                      )}
                      {lesson.visibility}
                    </Button>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4 pr-6 text-right space-x-1 whitespace-nowrap">
                    {/* Lesson Details Button */}
                    <Link href={`/publicLessons/${lesson._id}`}>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-slate-400 hover:text-slate-600"
                        title="Lesson Details"
                      >
                        <Eye size={16} />
                      </Button>
                    </Link>

                    {/* Update Lesson Button */}
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-indigo-500 hover:bg-indigo-50"
                      title="Update Lesson"
                      onClick={() => onEditAction(lesson)}
                    >
                      {" "}
                      <Edit3 size={16} />
                    </Button>

                    {/* Delete button with Confirmation popup */}
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onClick={() => setDeleteId(lesson.id)}
                      title="Delete Lesson"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}

              {lessons.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No lessons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Permanent Deletion Confirmation Popup */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger onClick={() => setDeleteId(null)} />

              <Modal.Header>
                <Modal.Heading className="text-lg font-bold text-slate-900">
                  Confirm Deletion
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <p className="text-sm text-slate-500">
                  Are you completely sure you want to delete this lesson? This
                  database structural erasure action is permanent and cannot be
                  undone.
                </p>
              </Modal.Body>

              <Modal.Footer className="flex justify-end gap-2 mt-4">
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </Button>
                <Button size="sm" color="danger" onClick={handleDelete}>
                  Delete Permanently
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
