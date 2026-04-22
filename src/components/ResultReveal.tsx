import { motion } from "framer-motion";
import { RotateCcw, History } from "lucide-react";
import { ButterflyIcon, CandleIcon, StarIcon } from "./EncantoIcons";
import confetti from "canvas-confetti";
import { useEffect, useCallback } from "react";

interface ResultRevealProps {
  result: string;
  onReset: () => void;
  onShowHistory: () => void;
}

export default function ResultReveal({
  result,
  onReset,
  onShowHistory,
}: ResultRevealProps) {
  const triggerConfetti = useCallback(() => {
    const duration = 3500;
    const end = Date.now() + duration;

    // Encanto colors: gold, coral, magenta, teal, cream
    const colors = [
      "#e8b830",
      "#f0c75e",
      "#e8753a",
      "#c73e6b",
      "#5f9ea0",
      "#fff8e7",
      "#d4a843",
    ];

    const frame = () => {
      // Left side burst
      confetti({
        particleCount: 3,
        angle: 55,
        spread: 50,
        origin: { x: 0.1, y: 0.5 },
        colors,
        disableForReducedMotion: true,
        shapes: ["circle", "square"],
        ticks: 200,
      });
      // Right side burst
      confetti({
        particleCount: 3,
        angle: 125,
        spread: 50,
        origin: { x: 0.9, y: 0.5 },
        colors,
        disableForReducedMotion: true,
        shapes: ["circle", "square"],
        ticks: 200,
      });
      // Center fountain
      confetti({
        particleCount: 5,
        spread: 80,
        origin: { x: 0.5, y: 0.6 },
        colors,
        disableForReducedMotion: true,
        shapes: ["circle", "square"],
        ticks: 200,
      });
      // Top shower
      confetti({
        particleCount: 3,
        spread: 120,
        origin: { x: 0.5, y: 0.2 },
        colors: ["#e8b830", "#f0c75e", "#fff8e7"],
        disableForReducedMotion: true,
        shapes: ["circle"],
        ticks: 200,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  useEffect(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Deep magical background with radial glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(232,184,48,0.12) 0%, rgba(199,62,107,0.06) 40%, rgba(13,7,32,0.97) 75%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating butterflies in background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bg-butterfly-${i}`}
          className="absolute"
          style={{
            left: `${8 + (i * 8)}%`,
            top: `${10 + ((i * 14) % 70)}%`,
            color:
              i % 3 === 0
                ? "rgba(232,184,48,0.25)"
                : i % 3 === 1
                ? "rgba(199,62,107,0.2)"
                : "rgba(95,158,160,0.2)",
          }}
          animate={{
            y: [0, -15, -25, -10, 0],
            x: [0, 8, -5, 12, 0],
            rotate: [0, 10, -5, 15, 0],
            opacity: [0.2, 0.4, 0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          <ButterflyIcon className="h-5 w-5" />
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 14,
          delay: 0.15,
        }}
      >
        {/* Miracle candle glow */}
        <motion.div
          className="text-[#e8b830]"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 280 }}
        >
          <CandleIcon className="h-20 w-20" />
        </motion.div>

        {/* Label */}
        <motion.p
          className="font-display text-base font-semibold tracking-[0.25em] uppercase"
          style={{
            background: "linear-gradient(135deg, #e8b830, #f0c75e, #d4a843)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          The Miracle Has Spoken
        </motion.p>

        {/* Result */}
        <motion.div
          className="relative"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.7,
            type: "spring",
            stiffness: 130,
            damping: 11,
          }}
        >
          {/* Glow behind text */}
          <motion.div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(232,184,48,0.3) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.h1
            className="font-display max-w-[85vw] text-center text-5xl font-black leading-tight tracking-tight sm:text-7xl md:text-8xl"
            style={{
              background:
                "linear-gradient(180deg, #fff8e7 0%, #f0c75e 30%, #e8b830 60%, #d4a843 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(232,184,48,0.5)) drop-shadow(0 0 80px rgba(232,184,48,0.25))",
            }}
            animate={{
              filter: [
                "drop-shadow(0 0 40px rgba(232,184,48,0.5)) drop-shadow(0 0 80px rgba(232,184,48,0.25))",
                "drop-shadow(0 0 60px rgba(232,184,48,0.7)) drop-shadow(0 0 120px rgba(232,184,48,0.35))",
                "drop-shadow(0 0 40px rgba(232,184,48,0.5)) drop-shadow(0 0 80px rgba(232,184,48,0.25))",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {result}
          </motion.h1>

          {/* Ornate underline */}
          <motion.div
            className="mx-auto mt-5 flex items-center gap-2"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
          >
            <StarIcon className="h-4 w-4 text-[#e8b830] opacity-70" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#e8b830] to-transparent" />
            <StarIcon className="h-4 w-4 text-[#e8b830] opacity-70" />
          </motion.div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <motion.button
            onClick={onReset}
            className="group flex items-center gap-2 rounded-full border border-[#e8b830]/20 bg-white/5 px-6 py-3 text-sm font-semibold text-[#fff8e7] backdrop-blur-sm transition-all hover:border-[#e8b830]/40 hover:bg-[#e8b830]/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-180" />
            Ask the Miracle Again
          </motion.button>
          <motion.button
            onClick={onShowHistory}
            className="group flex items-center gap-2 rounded-full bg-[#e8b830]/15 px-6 py-3 text-sm font-semibold text-[#f0c75e] backdrop-blur-sm transition-all hover:bg-[#e8b830]/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <History className="h-4 w-4" />
            View History
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
