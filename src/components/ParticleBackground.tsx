import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: number;
  type: "spark" | "petal" | "dust";
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particleCount = Math.min(
      100,
      Math.floor((canvas.width * canvas.height) / 12000)
    );
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const typeRand = Math.random();
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size:
          typeRand < 0.6
            ? Math.random() * 2 + 0.5
            : Math.random() * 3.5 + 1.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.1,
        opacity: Math.random() * 0.5 + 0.25,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.7 ? 40 + Math.random() * 20 : 320 + Math.random() * 30,
        type: typeRand < 0.6 ? "spark" : typeRand < 0.85 ? "petal" : "dust",
      };
    });

    let time = 0;

    const drawButterfly = (
      cx: number,
      cy: number,
      size: number,
      alpha: number,
      hue: number
    ) => {
      const s = size * 0.6;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.sin(time * 0.01 + cx * 0.01) * 0.3);

      const color = `hsla(${hue}, 70%, 65%, ${alpha})`;
      const colorLight = `hsla(${hue}, 80%, 80%, ${alpha * 0.6})`;

      // Upper wings
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-s * 1.8, -s * 1.5, -s * 0.3, -s * 0.8);
      ctx.quadraticCurveTo(-s * 0.1, -s * 0.3, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(s * 1.8, -s * 1.5, s * 0.3, -s * 0.8);
      ctx.quadraticCurveTo(s * 0.1, -s * 0.3, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();

      // Lower wings
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-s * 1.2, s * 1, -s * 0.2, s * 0.5);
      ctx.quadraticCurveTo(-s * 0.05, s * 0.2, 0, 0);
      ctx.fillStyle = colorLight;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(s * 1.2, s * 1, s * 0.2, s * 0.5);
      ctx.quadraticCurveTo(s * 0.05, s * 0.2, 0, 0);
      ctx.fillStyle = colorLight;
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.12, s * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 50%, 30%, ${alpha})`;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        const twinkle =
          Math.sin(time * p.twinkleSpeed + p.twinkleOffset) * 0.35 + 0.65;
        const currentOpacity = p.opacity * twinkle;

        if (p.type === "petal" && p.size > 2) {
          drawButterfly(p.x, p.y, p.size, currentOpacity, p.hue);
        } else if (p.type === "spark") {
          // Glowing sparkle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${currentOpacity})`;
          ctx.fill();

          // Outer glow
          if (p.size > 1) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${currentOpacity * 0.12})`;
            ctx.fill();
          }
        } else {
          // Fine golden dust
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(44, 70%, 75%, ${currentOpacity * 0.6})`;
          ctx.fill();
        }
      });

      // Draw faint connecting lines between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          if (p1.type === "dust" || p2.type === "dust") continue;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(44, 80%, 65%, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
