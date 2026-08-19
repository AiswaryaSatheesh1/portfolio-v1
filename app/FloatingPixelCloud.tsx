"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/* ---------- symmetric 3-lobe shaded pixel cloud, no shadow ---------- */

type Grid = string[][];

function inEllipse(x: number, y: number, cx: number, cy: number, rx: number, ry: number) {
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

function buildCloud(): Grid {
  const W = 40, H = 24;

  // symmetric silhouette: big center peak + two rounded side lobes + flat base
  const shapes = [
    { cx: 20, cy: 8, rx: 9, ry: 8 },
    { cx: 10, cy: 14.5, rx: 8, ry: 7 },
    { cx: 30, cy: 14.5, rx: 8, ry: 7 },
    { cx: 20, cy: 16, rx: 17, ry: 6.5 },
  ];

  const filled = (x: number, y: number) =>
    shapes.some((s) => inEllipse(x, y, s.cx, s.cy, s.rx, s.ry));

  const grid: Grid = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      if (!filled(x, y)) return "0";
      // soft diagonal light, brightest upper-left of the peak
      const shade = y - x * 0.15;
      if (shade <= 0) return "hi";
      if (shade <= 5) return "base";
      if (shade <= 10) return "mid";
      return "shadow";
    })
  );

  // outline pass
  const src = grid.map((row) => [...row]);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (src[y][x] === "0") continue;
      const n = [src[y - 1]?.[x], src[y + 1]?.[x], src[y]?.[x - 1], src[y]?.[x + 1]];
      if (n.some((v) => v === undefined || v === "0")) grid[y][x] = "outline";
    }
  }

  return grid;
}

const COLORS: Record<string, string> = {
  "0": "transparent",
  hi: "#ffffff",
  base: "#e9f2ff",
  mid: "#a9c8ee",
  shadow: "#5d84c4",
  outline: "#26235c",
};

export function FloatingPixelCloud({ size = 260 }: { size?: number }) {
  const grid = useMemo(buildCloud, []);
  const h = grid.length;
  const w = grid[0].length;

  return (
    <motion.div
      drag
      dragElastic={0.35}
      dragConstraints={{ top: -60, bottom: 60, left: -80, right: 80 }}
      whileDrag={{ scale: 1.06, cursor: "grabbing" }}
      whileHover={{ scale: 1.03 }}
      style={{ cursor: "grab", width: size, touchAction: "none" }}
      animate={{
        y: [0, -14, 0, 8, 0],
        x: [0, 12, 0, -10, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="select-none"
    >
      <div
        className="grid drop-shadow-[0_0_40px_rgba(93,132,196,0.35)]"
        style={{
          gridTemplateColumns: `repeat(${w}, 1fr)`,
          width: "100%",
          aspectRatio: `${w} / ${h}`,
        }}
      >
        {grid.flatMap((row, y) =>
          row.map((c, x) => (
            <div key={`${x}-${y}`} style={{ background: COLORS[c] }} />
          ))
        )}
      </div>
    </motion.div>
  );
}