"use client";

import React, { useState, useMemo } from "react";

import {
  Table,
  Chip,
  Button,
  Tooltip,
  Input,
  Select,
  Card,
  ListBox,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  EyeOff,
  AlertTriangle,
  Star,
  CheckCircle2,
  Trash2,
  Search,
  SlidersHorizontal,
  BookmarkCheck,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  inappropriateLessonDelete,
  inappropriateLessonVerified,
} from "@/lib/api/lessons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Premium Initial Mock Database for all platform lessons
const initialLessons = [
  {
    id: "les-1",
    title: "Mastering Cognitive Restructuring",
    author: "Ried Hessan",
    category: "Mindset",
    visibility: "public",
    flagged: false,
    featured: true,
    reviewed: true,
  },
  {
    id: "les-2",
    title: "Building Million-Dollar Habits",
    author: "Sarah Connor",
    category: "Growth",
    visibility: "public",
    flagged: true,
    featured: false,
    reviewed: false,
  },
  {
    id: "les-3",
    title: "Draft: Relationship Guardrails Blueprint",
    author: "Nusrat Jahan",
    category: "Relationships",
    visibility: "private",
    flagged: false,
    featured: false,
    reviewed: true,
  },
  {
    id: "les-4",
    title: "Crypto Systems 101 Guide",
    author: "Alex Rivera",
    category: "Finance",
    visibility: "public",
    flagged: true,
    featured: false,
    reviewed: false,
  },
  {
    id: "les-5",
    title: "How to Deal with Sibling Rivalry",
    author: "Nusrat Jahan",
    category: "Relationships",
    visibility: "public",
    flagged: false,
    featured: false,
    reviewed: false,
  },
];

const categoryLesson = [
  { key: "all", label: "All Categories" },
  { key: "Career", label: "Career" },
  { key: "Productivity", label: "Productivity" },
  { key: "Mental Health", label: "Mental Health" },
  { key: "Technology", label: "Technology" },
  { key: "Lifestyle", label: "Lifestyle" },
];

export default function ManageLessons({ allLesson }) {
  const [lessons, setLessons] = useState(allLesson);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // public, private, flagged
  const router = useRouter();
  // Confirmation state for deleting a lesson
  const [lessonToDelete, setLessonToDelete] = useState(null);

  // --- STATS COMPUTATION ---
  const stats = useMemo(() => {
    return {
      public: lessons.filter((l) => l.visibility.toLowerCase() === "public")
        .length,
      private: lessons.filter((l) => l.visibility.toLowerCase() === "private")
        .length,
      flagged: lessons.filter((l) => l.flagged).length,
    };
  }, [lessons]);

  // --- MUTATION HANDLERS ---
  const toggleFeatured = (id) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, featured: !l.featured } : l)),
    );
  };

  const markAsReviewed = async (id) => {
    const verified = await inappropriateLessonVerified(id);
    if (verified.success === false) {
      toast.error(verified.message);
    } else if (verified.success === true) {
      toast.success(verified.message);
      router.refresh();
    }

    // setLessons((prev) =>
    //   prev.map((l) =>
    //     l.id === id ? { ...l} : l,
    //   ),
    // );
  };

  const confirmDelete = async () => {
    const deleteLesson = await inappropriateLessonDelete(lessonToDelete._id);

    if (deleteLesson.success === false) {
      toast.error(deleteLesson.message);
    } else if (deleteLesson.success === true) {
      toast.success(deleteLesson.message);
      router.refresh();
    }

    if (lessonToDelete) {
      setLessons((prev) => prev.filter((l) => l.id !== lessonToDelete.id));
      setLessonToDelete(null);
    }
  };

  // --- FILTER & SEARCH PIPELINE ---
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(search.toLowerCase()) ||
        lesson.author.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || lesson.category === categoryFilter;

      let matchesStatus = true;
      if (statusFilter === "public")
        matchesStatus = lesson.visibility === "public";
      if (statusFilter === "private")
        matchesStatus = lesson.visibility === "private";
      if (statusFilter === "flagged") matchesStatus = lesson.flagged === true;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [lessons, search, categoryFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-default-50/40 p-4 sm:p-8 dark:bg-zinc-950 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TOP LEVEL PREMIUM META METRIC STATUS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-default-100 dark:border-zinc-800/80 p-5 bg-white dark:bg-zinc-900 flex flex-row items-center gap-4 rounded-2xl shadow-sm">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-default-400 uppercase tracking-wider">
                Public Lessons
              </p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-0.5">
                {stats.public}
              </h3>
            </div>
          </Card>

          <Card className="border border-default-100 dark:border-zinc-800/80 p-5 bg-white dark:bg-zinc-900 flex flex-row items-center gap-4 rounded-2xl shadow-sm">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <EyeOff size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-default-400 uppercase tracking-wider">
                Private Drafts
              </p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-0.5">
                {stats.private}
              </h3>
            </div>
          </Card>

          <Card className="border border-rose-100 dark:border-rose-950/20 p-5 bg-rose-50/20 dark:bg-rose-950/5 flex flex-row items-center gap-4 rounded-2xl shadow-sm">
            <div
              className={`p-3 rounded-xl ${stats.flagged > 0 ? "bg-rose-500/20 text-rose-500 animate-pulse" : "bg-neutral-500/10 text-default-400"}`}
            >
              <AlertTriangle size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-default-400 uppercase tracking-wider">
                Flagged/Reported
              </p>
              <h3 className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
                {stats.flagged}
              </h3>
            </div>
          </Card>
        </div>

        {/* ADMINISTRATIVE UTILITY BOX - SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-default-100 dark:border-zinc-800/80 p-5 rounded-[24px] shadow-sm">
          <Input
            type="text"
            placeholder="Search lessons or authors..."
            value={search}
            onChange={setSearch}
            startContent={<Search size={16} className="text-default-400" />}
            className="w-full md:max-w-xs bg-default-100/70 dark:bg-zinc-800/50 rounded-xl text-xs h-10 border-none"
          />

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-default-400 font-bold text-xs mr-1">
              <SlidersHorizontal size={14} /> <span>Filters:</span>
            </div>

            {/* CATEGORY FILTER SELECT */}
            <Select
              aria-label="Category Filter"
              selectedKeys={[categoryFilter]}
              onChange={(val) => setCategoryFilter(Array.from(val)[0] || "all")}
              className="w-[150px]"
            >
              <Select.Trigger className="w-full flex items-center justify-between bg-default-100/70 hover:bg-default-200/50 dark:bg-zinc-800/50 rounded-xl h-10 px-3 text-xs font-bold border-none transition-colors cursor-pointer text-slate-700 dark:text-zinc-200">
                <Select.Value />
                <Select.Indicator>
                  <ChevronDown size={14} className="text-default-400" />
                </Select.Indicator>
              </Select.Trigger>

              <Select.Popover className="bg-white dark:bg-zinc-900 border border-default-100 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden min-w-[150px]">
                <ListBox className="p-1">
                  {categoryLesson.map((item) => (
                    <ListBox.Item
                      key={item.key}
                      className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                        categoryFilter === item.key
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          : "text-slate-600 dark:text-zinc-400 hover:bg-default-100/60 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <span>{item.label}</span>
                      {categoryFilter === item.key && (
                        <ListBox.ItemIndicator>
                          <Check
                            size={12}
                            className="text-purple-500 stroke-[3]"
                          />
                        </ListBox.ItemIndicator>
                      )}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* STATUS / VISIBILITY FILTER SELECT */}
            <Select
              aria-label="Status/Visibility Filter"
              selectedKeys={[statusFilter]}
              onChange={(val) => setStatusFilter(Array.from(val)[0] || "all")}
              className="w-[150px]"
            >
              <Select.Trigger className="w-full flex items-center justify-between bg-default-100/70 hover:bg-default-200/50 dark:bg-zinc-800/50 rounded-xl h-10 px-3 text-xs font-bold border-none transition-colors cursor-pointer text-slate-700 dark:text-zinc-200">
                <Select.Value />
                <Select.Indicator>
                  <ChevronDown size={14} className="text-default-400" />
                </Select.Indicator>
              </Select.Trigger>

              <Select.Popover className="bg-white dark:bg-zinc-900 border border-default-100 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden min-w-[150px]">
                <ListBox className="p-1">
                  {[
                    { key: "all", label: "All Statuses" },
                    { key: "public", label: "Public Only" },
                    { key: "private", label: "Private Only" },
                    { key: "flagged", label: "Flagged Only" },
                  ].map((item) => (
                    <ListBox.Item
                      key={item.key}
                      className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                        statusFilter === item.key
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          : "text-slate-600 dark:text-zinc-400 hover:bg-default-100/60 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <span>{item.label}</span>
                      {statusFilter === item.key && (
                        <ListBox.ItemIndicator>
                          <Check
                            size={12}
                            className="text-purple-500 stroke-[3]"
                          />
                        </ListBox.ItemIndicator>
                      )}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {/* DATA TABLE MATRIX */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Table className="border border-default-100 dark:border-zinc-900 bg-white dark:bg-zinc-900 shadow-sm rounded-[24px] overflow-hidden">
            <Table.ScrollContainer>
              <Table.Content aria-label="Administrative system lesson management pipeline table">
                <Table.Header>
                  <Table.Column>Lesson Meta & Title</Table.Column>
                  <Table.Column>Author</Table.Column>
                  <Table.Column>Category</Table.Column>
                  <Table.Column>Parameters</Table.Column>
                  <Table.Column align="end">Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                  {allLesson.map((lesson) => (
                    <Table.Row
                      key={lesson._id}
                      className="hover:bg-default-50/50 dark:hover:bg-zinc-800/20 transition-colors border-b border-default-100/50 dark:border-zinc-800/40 last:border-0"
                    >
                      {/* LESSON TITLE & FLAGS */}
                      <Table.Cell>
                        <div className="py-1 space-y-1 max-w-sm">
                          <div className="flex items-center flex-wrap gap-2">
                            <span className="font-bold text-slate-800 dark:text-zinc-200 text-sm tracking-tight line-clamp-1">
                              {lesson.title}
                            </span>
                            {lesson.featured && (
                              <Chip
                                size="sm"
                                variant="flat"
                                color="warning"
                                className="h-4 text-[9px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-500"
                              >
                                Featured
                              </Chip>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-default-400 font-semibold">
                            <span className="capitalize">
                              {lesson.visibility}
                            </span>
                            <span>•</span>
                            <span>ID: {lesson._id}</span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* AUTHOR CELL */}
                      <Table.Cell>
                        <span className="text-xs font-bold text-slate-600 dark:text-zinc-300">
                          {lesson.author.name}
                        </span>
                      </Table.Cell>

                      {/* CATEGORY CELL */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          className="bg-default-100/80 dark:bg-zinc-800 text-default-600 font-bold text-[10px] capitalize px-2"
                        >
                          {lesson.category}
                        </Chip>
                      </Table.Cell>

                      {/* STRUCTURAL PARAMETERS/VIOLATIONS OVERVIEW */}
                      <Table.Cell>
                        <div className="flex gap-1.5">
                          {lesson.flagged ? (
                            <Chip
                              size="sm"
                              variant="flat"
                              color="danger"
                              className="font-bold text-[10px] uppercase bg-rose-500/10 text-rose-500 animate-pulse"
                              startContent={<AlertTriangle size={10} />}
                            >
                              Inappropriate Flag
                            </Chip>
                          ) : lesson.verified ? (
                            <Chip
                              size="sm"
                              variant="flat"
                              color="success"
                              className="font-bold text-[10px] uppercase bg-emerald-500/10 text-emerald-500"
                              startContent={<BookmarkCheck size={10} />}
                            >
                              Verified Clear
                            </Chip>
                          ) : (
                            <Chip
                              size="sm"
                              variant="flat"
                              className="font-bold text-[10px] uppercase bg-neutral-500/10 text-default-500"
                            >
                              Pending Review
                            </Chip>
                          )}
                        </div>
                      </Table.Cell>

                      {/* ADMINISTRATIVE ACTIONS BAR */}
                      <Table.Cell>
                        <div className="flex items-center justify-end gap-2">
                          {/* FEATURE TOGGLE */}
                          <Tooltip
                            content={
                              lesson.featured
                                ? "Remove from Home Featured Section"
                                : "Promote to Home Featured Section"
                            }
                            closeDelay={50}
                            size="sm"
                            className="text-xs font-bold"
                          >
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              color={lesson.featured ? "warning" : "default"}
                              className={`h-8 w-8 rounded-lg ${lesson.featured ? "bg-amber-500/10 text-amber-500" : "text-default-400"}`}
                              onPress={() => toggleFeatured(lesson.id)}
                            >
                              <Star
                                size={15}
                                fill={lesson.featured ? "currentColor" : "none"}
                                strokeWidth={2.2}
                              />
                            </Button>
                          </Tooltip>

                          {/* MARK AS REVIEWED */}
                          {!lesson.reviewed && (
                            <Tooltip
                              content="Mark Content as Reviewed"
                              color="success"
                              closeDelay={50}
                              size="sm"
                              className="text-xs font-bold"
                            >
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                color="success"
                                className="h-8 w-8 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg"
                                onPress={() => markAsReviewed(lesson._id)}
                              >
                                <CheckCircle2 size={15} strokeWidth={2.2} />
                              </Button>
                            </Tooltip>
                          )}

                          {/* PURGE BUTTON */}
                          <Tooltip
                            content="Delete Inappropriate Lesson"
                            color="danger"
                            closeDelay={50}
                            size="sm"
                            className="text-xs font-bold"
                          >
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              color="danger"
                              className="h-8 w-8 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg"
                              onPress={() => setLessonToDelete(lesson)}
                            >
                              <Trash2 size={15} strokeWidth={2.2} />
                            </Button>
                          </Tooltip>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>

            {/* EMPTY RESULT MATRIX NOTIFICATION */}
            {filteredLessons.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-center border-t border-default-100 dark:border-zinc-800">
                <div className="p-3 bg-default-100 dark:bg-zinc-800 rounded-full text-default-400 mb-2">
                  <EyeOff size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                  No matching items found
                </h3>
                <p className="text-xs text-default-400 max-w-xs mt-0.5">
                  Adjust your category sort matrices or search keys to return
                  standard rows.
                </p>
              </div>
            )}

            <Table.Footer className="border-t border-default-100 dark:border-zinc-800 p-4 flex items-center justify-between text-xs text-default-400 font-semibold bg-default-50/50 dark:bg-zinc-900/30">
              <span>Displaying {filteredLessons.length} items total</span>
              <span className="text-[10px] uppercase tracking-wider bg-neutral-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                Auditing Node
              </span>
            </Table.Footer>
          </Table>
        </motion.div>
      </div>

      {/* OVERLAY POPUP MODAL DIALOG WITH SPRING TRANSITIONS */}
      <AnimatePresence>
        {lessonToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Surface */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setLessonToDelete(null)}
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 border border-default-100 dark:border-zinc-800 rounded-[28px] p-6 shadow-2xl relative z-10 space-y-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl">
                  <AlertTriangle size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
                    Confirm Deletion
                  </h3>
                  <p className="text-xs text-default-400 leading-relaxed">
                    You are explicitly purger-deleting{" "}
                    <strong className="text-slate-700 dark:text-zinc-200">
                      {lessonToDelete.title}
                    </strong>
                    . This completely breaks published instances. This step
                    cannot be rolled back safely.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  size="sm"
                  variant="flat"
                  radius="xl"
                  className="font-bold text-xs h-9 px-4 text-default-500 bg-default-100/80 dark:bg-zinc-800"
                  onPress={() => setLessonToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  radius="xl"
                  className="font-bold text-xs h-9 px-5 bg-rose-600 text-white"
                  onPress={confirmDelete}
                >
                  Confirm Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
