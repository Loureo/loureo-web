"use client";

import { useEffect, useRef } from "react";

import { useToken } from "@chakra-ui/react";

const MovingGradientBackground: React.FC = () => {
  const [brand, secondary] = useToken("colors", ["brand.100", "white"]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth / 2;
      canvas.height = window.innerHeight / 2;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let time = 0;
    const colors = [brand, secondary];

    const animate = () => {
      time += 0.0025;

      // Clear canvas
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient blobs
      for (let i = 0; i < colors.length; i++) {
        const x = Math.sin(time + i * 2) * 200 + canvas.width / 2;
        const y = Math.cos(time + i * 2) * 200 + canvas.height / 2;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 400);
        gradient.addColorStop(0, colors[i] + "40"); // 25% opacity
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 400, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [brand, secondary]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        filter: "blur(100px)",
        opacity: 0.4,
      }}
    />
  );
};

export default MovingGradientBackground;
