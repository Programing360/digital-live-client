"use client";

import React, { useState } from "react";
import { Button, Modal, Card, Chip } from "@heroui/react";
import {
  Flag,
  AlertTriangle,
  ShieldAlert,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { userReport } from "@/lib/action/report";
import { toast } from "react-toastify";

export default function ReportLessonButton({
  lessonId,
  currentUserEmail,
  lessonData,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reason dropdown options array
  const reportReasons = [
    "Inappropriate content",
    "Copyright violation / Plagiarism",
    "Misleading or incorrect information",
    "Spam or promotional abuse",
    "Other structural violations",
  ];

  const handleReportSubmit = async () => {
    if (!reason) return;

    setIsSubmitting(true);

    try {
      const reportPayload = {
        lessonId: lessonId,
        title: lessonData.title,
        author: lessonData.author.name,
        authorEmail: lessonData.author.email,
        category: lessonData.category,
        reportCount: 1,
        reports: [
          {
            id: currentUserEmail.id,
            reporter: currentUserEmail.name,
            email: currentUserEmail?.email,
            reason: reason,
          },
        ],
      };
      const res = await userReport(reportPayload);

      if (res.insertedId) {
        toast.success("Report Successful");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to submit report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    // Reset state sequences after animation dismisses
    setTimeout(() => {
      setIsSuccess(false);
      setReason("");
    }, 300);
  };

  return (
    <>
      {/* TRIGGER BUTTON: PLACED INSIDE YOUR LESSON CARD / FOOTER */}
      <Button
        size="sm"
        variant="light"
        onPress={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 py-4 tracking-wide rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 font-medium"
      >
        <Flag size={12} className="shrink-0" />
        Report
      </Button>
      {/* <Button
        variant="light"
        onPress={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 py-3  tracking-wide rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 font-medium"
      >
        <Flag size={12} className="shrink-0" />
        <span>Report</span>
      </Button> */}

      {/* COMPLIANT HEROUI V3.1.0 COMPOUND MODAL INTERFACE */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => !open && handleCloseDialog()}
      >
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[380px] rounded-[28px] border border-slate-100 dark:border-zinc-900 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
              <Modal.CloseTrigger />

              {!isSuccess ? (
                <>
                  <Modal.Header>
                    <Modal.Icon className="bg-rose-50 dark:bg-rose-950/50 text-rose-500 rounded-xl">
                      <AlertTriangle className="size-5" />
                    </Modal.Icon>
                    <Modal.Heading className="text-slate-800 dark:text-white font-black text-sm tracking-tight pt-1">
                      Flag Module Flag Content
                    </Modal.Heading>
                  </Modal.Header>

                  <Modal.Body className="space-y-4 py-2">
                    <p className="text-xs text-default-400 font-medium leading-relaxed">
                      Are you sure you want to file an active violation report
                      against this lesson node instance? Please provide a clear
                      reason below.
                    </p>

                    {/* REASON DROPDOWN SELECT STRUCTURAL ELEMENT */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                        Select Reason
                      </label>
                      <div className="relative">
                        <select
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full text-xs font-semibold h-10 px-3 rounded-xl bg-default-100 dark:bg-zinc-800/80 border border-transparent focus:border-indigo-500 text-slate-800 dark:text-zinc-200 outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="" disabled>
                            -- Choose a validation breach type --
                          </option>
                          {reportReasons.map((item, idx) => (
                            <option key={idx} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-default-400 text-[10px]">
                          ▼
                        </div>
                      </div>
                    </div>
                  </Modal.Body>

                  <Modal.Footer className="pt-3 flex items-center gap-2">
                    <Button
                      variant="flat"
                      slot="close"
                      className="flex-1 font-bold text-xs h-9 bg-default-100 text-default-600 dark:bg-zinc-800 dark:text-zinc-300 rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={handleReportSubmit}
                      disabled={!reason || isSubmitting}
                      className={`flex-1 font-black text-xs h-9 text-white rounded-xl shadow-sm transition-all ${
                        !reason
                          ? "bg-default-200 text-default-400 dark:bg-zinc-800 cursor-not-allowed shadow-none"
                          : "bg-rose-600 hover:bg-rose-700 shadow-rose-600/10"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-1">
                          <Loader2 size={13} className="animate-spin" /> Logged
                          entry...
                        </span>
                      ) : (
                        "Submit Report"
                      )}
                    </Button>
                  </Modal.Footer>
                </>
              ) : (
                /* SUCCESS SCREEN SUB-STATE PANEL CONTAINER */
                <div className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white tracking-tight">
                      Report Documented Successfully
                    </h3>
                    <p className="text-xs text-default-400 font-medium leading-relaxed max-w-xs mx-auto">
                      An entry has been committed to the{" "}
                      <code className="bg-default-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-[10px] font-mono text-indigo-500">
                        lessonsReports
                      </code>{" "}
                      pipeline for moderation audits.
                    </p>
                  </div>
                  <Button
                    onPress={handleCloseDialog}
                    className="w-full font-bold text-xs h-9 bg-default-100 text-default-700 dark:bg-zinc-800 dark:text-zinc-300 rounded-xl"
                  >
                    Dismiss Notification
                  </Button>
                </div>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
