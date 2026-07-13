import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function BackgroundEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 15 elegant floating particles with random parameters
    const generated: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage width
      y: Math.random() * 100, // percentage height
      size: Math.random() * 6 + 4, // 4px to 10px
      delay: Math.random() * 5, // 0 to 5s delay
      duration: Math.random() * 15 + 15, // 15 to 30s float duration
      opacity: Math.random() * 0.2 + 0.1, // very subtle (10% to 30%)
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Pastel Watercolor Blobs (rotating) */}
      <div 
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl mix-blend-multiply opacity-25 animate-float-slow"
        style={{ backgroundColor: "rgba(254, 250, 224, 0.6)", animationDuration: "25s" }}
      />
      <div 
        className="absolute -bottom-20 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl mix-blend-multiply opacity-20 animate-float-slow"
        style={{ backgroundColor: "rgba(255, 202, 212, 0.4)", animationDuration: "35s" }}
      />
      <div 
        className="absolute top-10 right-10 w-80 h-80 rounded-full blur-3xl mix-blend-screen opacity-15 animate-float-slow"
        style={{ backgroundColor: "rgba(232, 240, 226, 0.5)", animationDuration: "28s" }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-tr from-amber-200 to-rose-200 animate-float-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}
