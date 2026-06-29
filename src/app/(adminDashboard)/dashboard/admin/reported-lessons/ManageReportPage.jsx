"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Table, Chip, Button, Tooltip, Avatar, Card } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertOctagon,
  Eye,
  CheckCircle2,
  Trash2,
  User,
  MessageSquare,
  FileText,
  X,
} from "lucide-react";
import { deleteReportById } from "@/lib/api/manageReport";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { reportRecover } from "@/lib/api/report";

export default function ManageReportedPage({ allReport }) {
  const [reportedLessons, setReportedLessons] = useState(allReport);
  const [activeLessonDetails, setActiveLessonDetails] = useState(null);
  const [actionConfirmation, setActionConfirmation] = useState(null); // { type: 'delete' | 'ignore', lesson }
  const router = useRouter();

  useEffect(() => {
    setReportedLessons(allReport);
  }, [allReport]);

  // --- MUTATION HANDLERS ---
  const handleIgnoreReports = async (lessonId) => {
    const res = await reportRecover(lessonId);

   

    if (res.deletedCount > 0) {
      toast.success("Recovery Successful");
      // router.refresh();
      setReportedLessons((prev) =>
        prev.filter((lesson) => lesson.lessonId !== lessonId),
      );
    } else {
      toast.error("something is Wrong!!");
    }

    // console.log(res);

    setActionConfirmation(null);
  };

  const handleDeleteLesson = async (lessonId) => {
    const reportDelete = await deleteReportById(lessonId);

    // console.log(reportDelete);

    if (reportDelete.deletedCount > 0) {
      toast.success("Report Delete Successful");
      setReportedLessons((prev) =>
        prev.filter((lesson) => lesson.lessonId !== lessonId),
      );
      router.refresh();

      setActionConfirmation(null);
    }
  };

  return (
    <div className="min-h-screen bg-default-50/40 p-4 sm:p-8 dark:bg-zinc-950 relative">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ADMINISTRATIVE BANNER HEAD */}
        <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 border border-default-100 dark:border-zinc-800/80 p-6 rounded-[24px] shadow-sm">
          <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl animate-pulse">
            <AlertOctagon size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
              Reported Content Moderation
            </h1>
            <p className="text-xs text-default-400 font-medium">
              Review flagged items submitted by the community. Cross-examine
              report logs and apply administrative overrides.
            </p>
          </div>
        </div>

        {/* TABULAR DISPLAY MATRIX */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Table className="border border-default-100 dark:border-zinc-900 bg-white dark:bg-zinc-900 shadow-sm rounded-[24px] overflow-hidden">
            <Table.ScrollContainer>
              <Table.Content aria-label="Flagged community content table logs">
                <Table.Header>
                  <Table.Column isRowHeader>Lesson Meta & Title</Table.Column>
                  <Table.Column>Author</Table.Column>
                  <Table.Column>Author Email</Table.Column>
                  <Table.Column>Report Density</Table.Column>
                  <Table.Column>Audit Trails</Table.Column>
                  <Table.Column align="end">Resolution Pipeline</Table.Column>
                </Table.Header>

                <Table.Body>
                  {reportedLessons.map((lesson) => (
                    <Table.Row
                      key={lesson._id}
                      className="hover:bg-default-50/50 dark:hover:bg-zinc-800/20 transition-colors border-b border-default-100/50 dark:border-zinc-800/40 last:border-0"
                    >
                      {/* LESSON METRICS */}
                      <Table.Cell>
                        <div className="py-1 space-y-0.5">
                          <span className="font-bold text-slate-800 dark:text-zinc-200 text-sm tracking-tight line-clamp-1">
                            {lesson.title}
                          </span>
                          <div className="flex items-center gap-2 text-[10px] text-default-400 font-semibold">
                            <span className="bg-default-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-default-500 capitalize">
                              {lesson.category}
                            </span>
                            <span>ID: {lesson.lessonId}</span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* AUTHOR PROFILE TARGET */}
                      <Table.Cell>
                        <span className="text-xs font-bold text-slate-600 dark:text-zinc-300">
                          {lesson.author || "Known"}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-xs font-bold text-slate-600 dark:text-zinc-300">
                          {lesson.author.email || "N/A"}
                        </span>
                      </Table.Cell>

                      {/* REPORT COUNT FLAG VALUE */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            lesson.reports?.length >= 3 ? "danger" : "warning"
                          }
                          className={`font-black text-xs px-2.5 h-6 rounded-lg ${
                            lesson.reports?.length >= 3
                              ? "bg-rose-500/10 text-rose-600"
                              : "bg-amber-500/10 text-amber-600"
                          }`}
                        >
                          {lesson.reports?.length} Flags
                        </Chip>
                      </Table.Cell>

                      {/* REASON MODAL OPEN TRIGGER */}
                      <Table.Cell>
                        <Button
                          size="sm"
                          variant="flat"
                          color="secondary"
                          className="h-7 text-[11px] font-bold px-3 gap-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                          startContent={<Eye size={13} />}
                          onPress={() => setActiveLessonDetails(lesson)}
                        >
                          Inspect Reasons
                        </Button>
                      </Table.Cell>

                      {/* DESTRUCTIVE RESOLUTION ACTIONS ACTIONS */}
                      <Table.Cell>
                        <div className="flex items-center justify-end gap-2">
                          {/* IGNORE ACTION BUTTON */}
                          <Tooltip
                            content="Ignore Flags (Keep Live)"
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
                              onPress={() =>
                                setActionConfirmation({
                                  type: "ignore",
                                  lesson,
                                })
                              }
                            >
                              <CheckCircle2 size={16} strokeWidth={2.2} />
                            </Button>
                          </Tooltip>

                          {/* PERMANENT PURGE DELETE ACTION */}
                          <Tooltip
                            content="Permanently Delete Lesson"
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
                              onPress={() =>
                                setActionConfirmation({
                                  type: "delete",
                                  lesson,
                                })
                              }
                            >
                              <Trash2 size={16} strokeWidth={2.2} />
                            </Button>
                          </Tooltip>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>

            {/* EMPTY STATE CONTEXT BOX IF NO PENDING FLAG REPORT EXIST */}
            {reportedLessons.length === 0 && (
              <div className="flex flex-col items-center justify-center p-16 text-center border-t border-default-100 dark:border-zinc-800">
                <div className="p-3.5 bg-emerald-500/10 text-emerald-500 rounded-full mb-3">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="text-base font-black text-slate-800 dark:text-zinc-200 tracking-tight">
                  Queue Completely Clear
                </h3>
                <p className="text-xs text-default-400 max-w-xs mt-1 leading-relaxed">
                  Excellent! No lessons currently hold unreviewed user
                  complaints or platform warning metrics flags.
                </p>
              </div>
            )}

            <Table.Footer className="border-t border-default-100 dark:border-zinc-800 p-4 flex items-center justify-between text-xs text-default-400 font-semibold bg-default-50/50 dark:bg-zinc-900/30">
              <span>{reportedLessons.length} lessons requiring attention</span>
              <span className="text-[10px] uppercase tracking-wider bg-default-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                Secured Audit Stream
              </span>
            </Table.Footer>
          </Table>
        </motion.div>
      </div>

      {/* 1. COMPONENT: REPORT DETAILS DISPLAY POPUP OVERLAY */}
      <AnimatePresence>
        {activeLessonDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setActiveLessonDetails(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-default-100 dark:border-zinc-800 rounded-[28px] shadow-2xl relative z-10 flex flex-col max-h-[85vh]"
            >
              {/* Header Box */}
              <div className="p-6 border-b border-default-100 dark:border-zinc-800/60 flex items-center justify-between">
                <div className="space-y-0.5 pr-4">
                  <h3 className="text-md font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
                    <FileText size={16} className="text-indigo-500" /> Report
                    Logs Breakdown
                  </h3>
                  <p className="text-[11px] text-default-400 font-medium line-clamp-1">
                    Lesson Target: {activeLessonDetails.title}
                  </p>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="rounded-xl text-default-400 min-w-8 w-8 h-8"
                  onPress={() => setActiveLessonDetails(null)}
                >
                  <X size={16} />
                </Button>
              </div>

              {/* Scrollable Contents Grid List */}
              <div className="p-6 overflow-y-auto space-y-4 flex-grow custom-scrollbar">
                {activeLessonDetails.reports.map((report) => (
                  <Card
                    key={report.id}
                    className="p-4 bg-default-50/50 dark:bg-zinc-950/40 border border-default-100 dark:border-zinc-800/40 rounded-xl space-y-2.5 flat-shadow"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        name={report.reporter}
                        size="sm"
                        className="w-6 h-6 text-[10px] font-black bg-default-200 dark:bg-zinc-800"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                          {report.reporter}
                        </p>
                        <p className="text-[10px] text-default-400 font-medium font-sans">
                          {report.email || "N/A"}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-default-500 dark:text-zinc-400 leading-relaxed bg-white dark:bg-zinc-900/60 border border-default-100/40 dark:border-zinc-800/30 p-2.5 rounded-lg flex items-start gap-2">
                      <MessageSquare
                        size={12}
                        className="text-default-400 mt-0.5 shrink-0"
                      />
                      <span>{report.reason}</span>
                    </p>
                  </Card>
                ))}
              </div>

              {/* Footer Closure Button Layout */}
              <div className="p-4 border-t border-default-100 dark:border-zinc-800/60 bg-default-50/30 dark:bg-zinc-900/20 text-right rounded-b-[28px]">
                <Button
                  size="sm"
                  color="secondary"
                  className="font-bold text-xs px-5 rounded-xl h-8"
                  onPress={() => setActiveLessonDetails(null)}
                >
                  Close Logs
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. COMPONENT: CONFIRMATION DISPATCH POPUP CONTEXT MODAL */}
      <AnimatePresence>
        {actionConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setActionConfirmation(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-default-100 dark:border-zinc-800 rounded-[24px] p-6 shadow-2xl relative z-10 space-y-4"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-3 rounded-2xl ${
                    actionConfirmation.type === "delete"
                      ? "bg-rose-500/10 text-rose-500"
                      : "bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {actionConfirmation.type === "delete" ? (
                    <Trash2 size={22} />
                  ) : (
                    <CheckCircle2 size={22} />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-md font-black text-slate-800 dark:text-white tracking-tight">
                    {actionConfirmation.type === "delete"
                      ? "Confirm Account Purge"
                      : "Ignore Log Flags"}
                  </h3>
                  <p className="text-xs text-default-400 leading-relaxed">
                    {actionConfirmation.type === "delete" ? (
                      <>
                        You are completely purging{" "}
                        <strong className="text-slate-700 dark:text-zinc-200">
                          {actionConfirmation.lesson.title}
                        </strong>{" "}
                        from the index. This choice is final.
                      </>
                    ) : (
                      <>
                        This action drops all community complaints for{" "}
                        <strong className="text-slate-700 dark:text-zinc-200">
                          {actionConfirmation.lesson.title}
                        </strong>{" "}
                        and marks it verified clean.
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <Button
                  size="sm"
                  variant="flat"
                  className="font-bold text-xs h-8 px-4 rounded-xl text-default-500"
                  onPress={() => setActionConfirmation(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color={
                    actionConfirmation.type === "delete" ? "danger" : "success"
                  }
                  className={`font-bold text-xs h-8 px-4 rounded-xl text-white ${
                    actionConfirmation.type === "delete"
                      ? "bg-rose-600"
                      : "bg-emerald-600"
                  }`}
                  onPress={() =>
                    actionConfirmation.type === "delete"
                      ? handleDeleteLesson(actionConfirmation.lesson.lessonId)
                      : handleIgnoreReports(actionConfirmation.lesson.lessonId)
                  }
                >
                  {actionConfirmation.type === "delete"
                    ? "Delete Content"
                    : "Clear Flags"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
