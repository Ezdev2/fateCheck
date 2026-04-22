import { motion, AnimatePresence } from "framer-motion";
import { ButterflyIcon, CandleIcon } from "./EncantoIcons";

interface CountdownProps {
  count: number;
}

export default function Countdown({ count }: CountdownProps) {
  // Encanto palette: gold -> coral -> deep magenta
  const colors = ["#e8b830", "#e8753a", "#c73e6b"];
  const glowColors = [
    "rgba(232,184,48,0.5)",
    "rgba(232,117,58,0.5)",
    "rgba(199,62,107,0.55)",
  ];
  const bgGlowColors = [
    "rgba(232,184,48,0.08)",
    "rgba(232,117,58,0.1)",
    "rgba(199,62,107,0.12)",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Deep magical background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${bgGlowColors[count - 1]} 0%, rgba(13,7,32,0.97) 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Floating butterflies */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${20 + ((i * 17) % 50)}%`,
            color: glowColors[count - 1],
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.5, 0],
            scale: [0, 1.2, 0.8, 1.4, 0],
            rotate: [0, 15, -10, 25, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * 30, 0],
            y: [0, -20, -40, -15, 0],
          }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
          }}
        >
          <ButterflyIcon className="h-6 w-6" />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 3.5, opacity: 0, rotate: -20 }}
          animate={{
            scale: [3.5, 1.15, 1],
            opacity: 1,
            rotate: [-20, 3, 0],
          }}
          exit={{
            scale: [1, 1.6, 0],
            opacity: [1, 1, 0],
            rotate: [0, -8, 25],
          }}
          transition={{
            duration: 0.85,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative flex flex-col items-center justify-center gap-6"
        >
          {/* Candle glow at top */}
          <motion.div
            className="text-golden"
            style={{ color: colors[count - 1] }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <CandleIcon className="h-14 w-14" />
          </motion.div>

          {/* Glow orb behind number */}
          <motion.div
            className="absolute rounded-full blur-3xl"
            style={{ backgroundColor: glowColors[count - 1], width: 200, height: 200 }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 0.85,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Ring pulses */}
          {[0, 0.25, 0.5].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2"
              style={{
                borderColor: colors[count - 1],
                width: 120 + i * 40,
                height: 120 + i * 40,
              }}
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{
                scale: [0.6, 2.8],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 1.2,
                delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Number */}
          <motion.span
            className="relative font-display text-[160px] font-black leading-none tracking-tighter"
            style={{
              color: colors[count - 1],
              textShadow: `0 0 70px ${glowColors[count - 1]}, 0 0 140px ${glowColors[count - 1]}, 0 0 210px ${glowColors[count - 1]}`,
            }}
            animate={{
              textShadow: [
                `0 0 70px ${glowColors[count - 1]}, 0 0 140px ${glowColors[count - 1]}, 0 0 210px ${glowColors[count - 1]}`,
                `0 0 110px ${glowColors[count - 1]}, 0 0 220px ${glowColors[count - 1]}, 0 0 330px ${glowColors[count - 1]}`,
                `0 0 70px ${glowColors[count - 1]}, 0 0 140px ${glowColors[count - 1]}, 0 0 210px ${glowColors[count - 1]}`,
              ],
            }}
            transition={{
              duration: 0.85,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {count}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* Screen shake */}
      <motion.div
        className="pointer-events-none fixed inset-0"
        animate={{
          x: [0, -6, 6, -5, 5, -3, 3, 0],
          y: [0, 5, -5, 3, -3, 2, -2, 0],
        }}
        transition={{
          duration: 0.85,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
