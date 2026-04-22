import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Trash2 } from "lucide-react";
import { ButterflyIcon } from "./EncantoIcons";

interface DecisionRecord {
  id: string;
  question: string;
  result: string;
  timestamp: Date;
  options: string[];
}

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: DecisionRecord[];
  onClear: () => void;
}

export default function HistoryPanel({
  isOpen,
  onClose,
  history,
  onClear,
}: HistoryPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-[#0d0720]/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-hidden border-l border-[#e8b830]/10 bg-[#120a28]/98 shadow-2xl backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#e8b830]/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="text-[#e8b830]">
                    <ButterflyIcon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-lg font-bold text-[#fff8e7]">
                    Miracle History
                  </h2>
                  <span className="rounded-full bg-[#e8b830]/15 px-2.5 py-0.5 text-xs font-semibold text-[#f0c75e]">
                    {history.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <motion.button
                      onClick={onClear}
                      className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-500/15 hover:text-red-400"
                      whileTap={{ scale: 0.9 }}
                      title="Clear history"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  )}
                  <motion.button
                    onClick={onClose}
                    className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/10 hover:text-[#fff8e7]"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 text-zinc-700">
                      <Clock className="h-12 w-12" />
                    </div>
                    <p className="font-display text-zinc-500">
                      No miracles yet
                    </p>
                    <p className="mt-2 text-sm text-zinc-600">
                      Ask the miracle to decide and your history will appear
                      here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((record, index) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative rounded-xl border border-[#e8b830]/8 bg-white/[0.02] p-4 transition-all hover:border-[#e8b830]/25 hover:bg-white/[0.04]"
                      >
                        {/* Subtle top glow line */}
                        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#e8b830]/20 to-transparent" />

                        <div className="mb-2 flex items-start justify-between gap-3">
                          <p className="text-sm font-medium text-[#fff8e7]/80">
                            {record.question || "Untitled Decision"}
                          </p>
                          <span className="shrink-0 text-xs text-zinc-600">
                            {record.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-zinc-500">
                            The miracle chose:
                          </span>
                          <span className="rounded-full bg-[#e8b830]/15 px-2.5 py-0.5 text-xs font-bold text-[#f0c75e]">
                            {record.result}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {record.options.map((opt) => (
                            <span
                              key={opt}
                              className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                                opt === record.result
                                  ? "bg-[#e8b830]/15 font-semibold text-[#f0c75e]"
                                  : "bg-white/5 text-zinc-600"
                              }`}
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
