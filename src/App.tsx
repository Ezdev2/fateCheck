import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Dices,
  History,
  Trash2,
  ChevronDown,
  HelpCircle,
  Wand2,
  Shuffle,
} from "lucide-react";
import {
  ButterflyIcon,
  CandleIcon,
  FlowerIcon,
  StarIcon,
  DoorIcon,
} from "./components/EncantoIcons";
import Countdown from "./components/Countdown";
import ResultReveal from "./components/ResultReveal";
import HistoryPanel from "./components/HistoryPanel";
import ParticleBackground from "./components/ParticleBackground";

type Mode = "yesno" | "custom";

interface DecisionRecord {
  id: string;
  question: string;
  result: string;
  timestamp: Date;
  options: string[];
}

const PRESETS = {
  yesno: ["Yes", "No", "Maybe"],
};

export default function App() {
  const [mode, setMode] = useState<Mode>("yesno");
  const [question, setQuestion] = useState("");
  const [customOptions, setCustomOptions] = useState<string[]>([""]);
  const [isDeciding, setIsDeciding] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<DecisionRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [shakeInput, setShakeInput] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("casita-decisions");
      if (saved) {
        const parsed = JSON.parse(saved);
        setHistory(
          parsed.map((h: DecisionRecord) => ({
            ...h,
            timestamp: new Date(h.timestamp),
          }))
        );
      }
    } catch {
      // ignore
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("casita-decisions", JSON.stringify(history));
    }
  }, [history]);

  const getActiveOptions = useCallback(() => {
    if (mode === "yesno") return PRESETS.yesno;
    return customOptions.filter((o) => o.trim() !== "");
  }, [mode, customOptions]);

  const addCustomOption = () => {
    setCustomOptions((prev) => [...prev, ""]);
    setTimeout(() => {
      const lastIndex = customOptions.length;
      inputRefs.current[lastIndex]?.focus();
    }, 50);
  };

  const removeCustomOption = (index: number) => {
    if (customOptions.length <= 1) return;
    setCustomOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCustomOption = (index: number, value: string) => {
    setCustomOptions((prev) =>
      prev.map((opt, i) => (i === index ? value : opt))
    );
  };

  const handleDecide = () => {
    const options = getActiveOptions();
    if (options.length < 2) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }

    setIsDeciding(true);
    setCountdown(3);

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * options.length);
        const chosen = options[randomIndex];
        setResult(chosen);
        setCountdown(0);

        const record: DecisionRecord = {
          id: Date.now().toString(),
          question: question.trim() || "Untitled Decision",
          result: chosen,
          timestamp: new Date(),
          options: [...options],
        };
        setHistory((prev) => [record, ...prev].slice(0, 50));
      }
    }, 1000);
  };

  const handleReset = () => {
    setResult(null);
    setIsDeciding(false);
    setCountdown(0);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("casita-decisions");
  };

  const activeOptions = getActiveOptions();
  const canDecide = activeOptions.length >= 2;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0720] text-[#fff8e7]">
      <ParticleBackground />

      {/* Subtle vignette overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(13,7,32,0.6)_100%)]" />

      {/* Top bar */}
      <motion.header
        className="relative z-10 flex items-center justify-between border-b border-[#e8b830]/10 px-6 py-4 backdrop-blur-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8b830] via-[#d4a843] to-[#c8963e] shadow-lg shadow-[#e8b830]/25">
            <ButterflyIcon className="h-5 w-5 text-[#fff8e7]" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-[#fff8e7]">
              Casita's Whisper
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#e8b830]/50">
              Let the Miracle Guide You
            </p>
          </div>
        </div>
        <motion.button
          onClick={() => setShowHistory(true)}
          className="flex items-center gap-2 rounded-full border border-[#e8b830]/15 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#e8b830]/60 transition-all hover:border-[#e8b830]/30 hover:bg-[#e8b830]/8 hover:text-[#f0c75e]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <History className="h-4 w-4" />
          <span className="hidden sm:inline">History</span>
          {history.length > 0 && (
            <span className="rounded-full bg-[#e8b830]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#f0c75e]">
              {history.length}
            </span>
          )}
        </motion.button>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 mx-auto max-w-2xl px-6 py-12">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Question input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-[#e8b830]/60">
              <HelpCircle className="h-4 w-4" />
              What weighs on your heart?
            </label>
            <motion.div
              animate={shakeInput ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., Should I embrace a new adventure?"
                  className="w-full rounded-xl border border-[#e8b830]/15 bg-white/[0.02] px-5 py-4 text-lg text-[#fff8e7] placeholder-[#e8b830]/20 outline-none transition-all focus:border-[#e8b830]/40 focus:bg-white/[0.04] focus:shadow-lg focus:shadow-[#e8b830]/8"
                />
                {/* Ornate corner accents */}
                <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[#e8b830]/20 rounded-tl-lg" />
                <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[#e8b830]/20 rounded-tr-lg" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#e8b830]/20 rounded-bl-lg" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#e8b830]/20 rounded-br-lg" />
              </div>
            </motion.div>
          </div>

          {/* Mode selector */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-[#e8b830]/60">
              <Dices className="h-4 w-4" />
              How shall the miracle speak?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={() => setMode("yesno")}
                className={`relative flex flex-col items-center gap-2 rounded-xl border p-5 transition-all ${
                  mode === "yesno"
                    ? "border-[#e8b830]/30 bg-[#e8b830]/8 shadow-lg shadow-[#e8b830]/8"
                    : "border-[#e8b830]/10 bg-white/[0.01] hover:border-[#e8b830]/20 hover:bg-white/[0.03]"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    mode === "yesno"
                      ? "bg-[#e8b830]/15 text-[#f0c75e]"
                      : "bg-white/[0.03] text-[#e8b830]/30"
                  }`}
                >
                  <Shuffle className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p
                    className={`text-sm font-semibold ${
                      mode === "yesno" ? "text-[#f0c75e]" : "text-[#fff8e7]/60"
                    }`}
                  >
                    Yes / No / Maybe
                  </p>
                  <p className="mt-0.5 text-xs text-[#e8b830]/30">
                    The classic path
                  </p>
                </div>
                {mode === "yesno" && (
                  <motion.div
                    className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#e8b830]"
                    layoutId="modeIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => setMode("custom")}
                className={`relative flex flex-col items-center gap-2 rounded-xl border p-5 transition-all ${
                  mode === "custom"
                    ? "border-[#e8b830]/30 bg-[#e8b830]/8 shadow-lg shadow-[#e8b830]/8"
                    : "border-[#e8b830]/10 bg-white/[0.01] hover:border-[#e8b830]/20 hover:bg-white/[0.03]"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    mode === "custom"
                      ? "bg-[#e8b830]/15 text-[#f0c75e]"
                      : "bg-white/[0.03] text-[#e8b830]/30"
                  }`}
                >
                  <Wand2 className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p
                    className={`text-sm font-semibold ${
                      mode === "custom" ? "text-[#f0c75e]" : "text-[#fff8e7]/60"
                    }`}
                  >
                    Your Own Path
                  </p>
                  <p className="mt-0.5 text-xs text-[#e8b830]/30">
                    Write your own choices
                  </p>
                </div>
                {mode === "custom" && (
                  <motion.div
                    className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#e8b830]"
                    layoutId="modeIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>
          </div>

          {/* Options display */}
          <AnimatePresence mode="wait">
            {mode === "yesno" ? (
              <motion.div
                key="yesno-options"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <label className="flex items-center gap-2 text-sm font-medium text-[#e8b830]/60">
                  <ChevronDown className="h-4 w-4" />
                  The miracle's offerings
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.yesno.map((opt, i) => (
                    <motion.div
                      key={opt}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-full border border-[#5f9ea0]/30 bg-[#5f9ea0]/8 px-4 py-2 text-sm font-semibold text-[#5f9ea0]"
                    >
                      {opt}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="custom-options"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#e8b830]/60">
                    <ChevronDown className="h-4 w-4" />
                    Your paths
                    <span className="rounded-full bg-white/[0.03] px-2 py-0.5 text-[10px] text-[#e8b830]/30">
                      {activeOptions.length} ready
                    </span>
                  </label>
                  <motion.button
                    onClick={addCustomOption}
                    className="flex items-center gap-1.5 rounded-lg border border-[#e8b830]/15 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-[#e8b830]/50 transition-all hover:border-[#e8b830]/30 hover:bg-[#e8b830]/8 hover:text-[#f0c75e]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Path
                  </motion.button>
                </div>

                <div className="space-y-2">
                  <AnimatePresence>
                    {customOptions.map((opt, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        className="flex items-center gap-2"
                      >
                        <div className="relative flex-1">
                          <input
                            ref={(el) => {
                              inputRefs.current[index] = el;
                            }}
                            type="text"
                            value={opt}
                            onChange={(e) =>
                              updateCustomOption(index, e.target.value)
                            }
                            placeholder={`Path ${index + 1}`}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (index === customOptions.length - 1) {
                                  addCustomOption();
                                } else {
                                  inputRefs.current[index + 1]?.focus();
                                }
                              }
                            }}
                            className={`w-full rounded-lg border bg-white/[0.02] px-4 py-3 text-sm text-[#fff8e7] placeholder-[#e8b830]/15 outline-none transition-all focus:bg-white/[0.04] ${
                              opt.trim()
                                ? "border-[#5f9ea0]/25 focus:border-[#5f9ea0]/45"
                                : "border-[#e8b830]/10 focus:border-[#e8b830]/35"
                            }`}
                          />
                          {opt.trim() && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              <FlowerIcon className="h-4 w-4 text-[#c73e6b]" />
                            </motion.div>
                          )}
                        </div>
                        {customOptions.length > 1 && (
                          <motion.button
                            onClick={() => removeCustomOption(index)}
                            onMouseEnter={() => setHoveredOption(index)}
                            onMouseLeave={() => setHoveredOption(null)}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#e8b830]/15 transition-colors hover:bg-red-500/10 hover:text-red-400"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2
                              className={`h-4 w-4 transition-colors ${
                                hoveredOption === index
                                  ? "text-red-400"
                                  : "text-[#e8b830]/15"
                              }`}
                            />
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {activeOptions.length < 2 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-red-400/60"
                  >
                    Write at least 2 paths for the miracle to choose from
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Let the Miracle Decide Button */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={handleDecide}
              disabled={!canDecide || isDeciding}
              className={`group relative w-full overflow-hidden rounded-2xl px-8 py-5 text-lg font-bold tracking-wide transition-all ${
                canDecide && !isDeciding
                  ? "bg-gradient-to-r from-[#e8b830] via-[#d4a843] to-[#e8b830] text-[#0d0720] shadow-xl shadow-[#e8b830]/20 hover:shadow-2xl hover:shadow-[#e8b830]/30"
                  : "cursor-not-allowed bg-[#1a1040] text-[#e8b830]/25"
              }`}
              whileHover={canDecide && !isDeciding ? { scale: 1.02 } : {}}
              whileTap={canDecide && !isDeciding ? { scale: 0.98 } : {}}
            >
              {/* Animated gradient background */}
              {canDecide && !isDeciding && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#f0c75e] via-[#fff8e7] to-[#f0c75e] opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center gap-3 font-display">
                <CandleIcon
                  className={`h-5 w-5 ${
                    canDecide ? "group-hover:scale-110 transition-transform" : ""
                  }`}
                />
                {isDeciding
                  ? "The Miracle Is Deciding..."
                  : "Let the Miracle Decide"}
                <StarIcon
                  className={`h-5 w-5 ${
                    canDecide ? "group-hover:scale-110 transition-transform" : ""
                  }`}
                />
              </span>

              {/* Shine effect */}
              {canDecide && !isDeciding && (
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ translateX: ["-100%", "200%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.button>

            {!canDecide && mode === "custom" && (
              <p className="mt-3 text-center text-xs text-[#e8b830]/20">
                Write at least 2 paths above
              </p>
            )}
          </motion.div>

          {/* Quick preset buttons for custom mode */}
          {mode === "custom" && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs font-medium text-[#e8b830]/25">
                Quick Paths
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    label: "Arepas vs Empanadas vs Tamales",
                    options: ["Arepas", "Empanadas", "Tamales"],
                  },
                  {
                    label: "Stay In Casita vs Explore",
                    options: ["Stay In Casita", "Explore"],
                  },
                  {
                    label: "Dance vs Sing vs Tell Stories",
                    options: ["Dance", "Sing", "Tell Stories"],
                  },
                  {
                    label: "Mountains vs River vs Garden",
                    options: ["Mountains", "River", "Garden"],
                  },
                ].map((preset) => (
                  <motion.button
                    key={preset.label}
                    onClick={() => setCustomOptions([...preset.options, ""])}
                    className="rounded-lg border border-[#e8b830]/8 bg-white/[0.01] px-3 py-2 text-xs text-[#e8b830]/35 transition-all hover:border-[#e8b830]/25 hover:bg-[#e8b830]/5 hover:text-[#f0c75e]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {preset.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Decorative divider */}
          <div className="flex items-center gap-3 pt-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#e8b830]/15 to-transparent" />
            <DoorIcon className="h-4 w-4 text-[#e8b830]/25" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#e8b830]/15 to-transparent" />
          </div>
        </motion.div>
      </main>

      {/* Countdown overlay */}
      <AnimatePresence>
        {countdown > 0 && <Countdown count={countdown} />}
      </AnimatePresence>

      {/* Result reveal */}
      <AnimatePresence>
        {result && (
          <ResultReveal
            result={result}
            onReset={handleReset}
            onShowHistory={() => {
              setResult(null);
              setIsDeciding(false);
              setShowHistory(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* History panel */}
      <HistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onClear={clearHistory}
      />

      {/* Footer */}
      <motion.footer
        className="relative z-10 border-t border-[#e8b830]/8 px-6 py-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="font-display text-xs tracking-wider text-[#e8b830]/20">
          When the heart is unsure, trust the miracle within
        </p>
      </motion.footer>
    </div>
  );
}
