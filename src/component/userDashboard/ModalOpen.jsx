import React, { Activity } from "react";
import { Card, Modal, Button, Table } from "@heroui/react";
import { ArrowUpRight, Calendar } from "lucide-react";
const DashboardModal = ({ chartData }) => {
  return (
    <div>
      <Modal>
        <Button
          size="sm"
          variant="secondary"
          className="font-bold text-xs text-indigo-600 dark:text-[#00e5b4]"
          endContent={<ArrowUpRight size={14} />}
          onClick={() => setIsModalOpen(true)}
        >
          View Details
        </Button>

        <Modal.Backdrop className="fixed inset-0 bg-[#09021a]/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <Modal.Container className="w-full max-w-2xl">
            <Modal.Dialog className="border border-slate-200/60 dark:border-purple-500/10 bg-white/95 dark:bg-[#0f0226]/95 backdrop-blur-2xl rounded-[32px] shadow-2xl text-slate-900 dark:text-white w-full overflow-hidden">
              {/* Optional header close interaction trigger wrapper */}
              <Button
                slot="close"
                variant="secondary"
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors text-sm font-bold"
              >
                ✕
              </Button>

              {/* Modal Header */}
              <Modal.Header className="border-b border-slate-200/50 dark:border-purple-500/10 p-6 flex items-center gap-3 text-left">
                <Modal.Icon>
                  <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-500">
                    <Activity size={18} />
                  </div>
                </Modal.Icon>
                <div>
                  <Modal.Heading className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    Analytics Deep-dive
                  </Modal.Heading>
                  <p className="text-xs font-medium text-slate-400 dark:text-purple-300/30 mt-0.5">
                    Statistical breakdowns parsed directly from your database
                    node.
                  </p>
                </div>
              </Modal.Header>

              {/* Modal Body */}
              <Modal.Body className="p-6 space-y-6 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-purple-950/20 border border-slate-100 dark:border-purple-500/5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-purple-300/30 uppercase tracking-widest">
                      Avg Contributions
                    </span>
                    <p className="text-xl font-black text-indigo-500 mt-1">
                      54.14 Views
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-purple-950/20 border border-slate-100 dark:border-purple-500/5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-purple-300/30 uppercase tracking-widest">
                      Avg Reflections
                    </span>
                    <p className="text-xl font-black text-[#00e5b4] mt-1">
                      34.42 Likes
                    </p>
                  </div>
                </div>

                {/* Table Framework Implementation */}
                <Table className="w-full">
                  <Table.ScrollContainer className="max-h-[260px] overflow-y-auto rounded-xl border border-slate-100 dark:border-purple-500/10">
                    <Table.Content aria-label="Detailed Analytics Report">
                      <Table.Header className="bg-slate-100/50 dark:bg-purple-950/40 text-slate-400 dark:text-purple-300/40 text-[10px] uppercase font-bold tracking-wider">
                        <Table.Column>Timeline Node</Table.Column>
                        <Table.Column>Contributions (Views)</Table.Column>
                        <Table.Column>Reflections (Likes)</Table.Column>
                      </Table.Header>
                      <Table.Body>
                        {chartData.map((row, index) => (
                          <Table.Row
                            key={index}
                            className="border-b border-slate-100 dark:border-purple-500/5 text-xs font-bold text-slate-700 dark:text-purple-200 "
                          >
                            <Table.Cell className="flex items-center gap-2 py-3">
                              <Calendar
                                size={13}
                                className="text-slate-400 dark:text-white"
                              />
                              <span className="dark:text-white">
                                {row.fullDate}
                              </span>
                            </Table.Cell>
                            <Table.Cell className="text-indigo-500 py-3 ">
                              {row.Contributions}
                            </Table.Cell>
                            <Table.Cell className="text-[#00e5b4] py-3">
                              <span className="dark:text-white">
                                {row.Reflections}
                              </span>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Content>
                  </Table.ScrollContainer>
                </Table>
              </Modal.Body>

              {/* Modal Footer */}
              <Modal.Footer className="border-t border-slate-200/50 dark:border-purple-500/10 p-6 flex justify-end">
                <Button
                  radius="xl"
                  className="font-bold text-xs bg-slate-100 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 border border-slate-200/60 dark:border-purple-500/10"
                  slot="close"
                  variant="secondary"
                >
                  Dismiss Frame
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default DashboardModal;
