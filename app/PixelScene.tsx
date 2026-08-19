"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Grid = string[][];

function inEllipse(x: number, y: number, cx: number, cy: number, rx: number, ry: number) {
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

/* ---------- symmetric 3-lobe shaded pixel cloud, no shadow ---------- */
function buildCloud(): Grid {
  const W = 40, H = 24;

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
      const shade = y - x * 0.15;
      if (shade <= 0) return "hi";
      if (shade <= 5) return "base";
      if (shade <= 10) return "mid";
      return "shadow";
    })
  );

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

const CLOUD_COLORS: Record<string, string> = {
  "0": "transparent",
  hi: "#ffffff",
  base: "#e9f2ff",
  mid: "#a9c8ee",
  shadow: "#5d84c4",
  outline: "#26235c",
};

function FloatingPixelCloud({ size = 260 }: { size?: number }) {
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
            <div key={`${x}-${y}`} style={{ background: CLOUD_COLORS[c] }} />
          ))
        )}
      </div>
    </motion.div>
  );
}

/* ---------- helpers shared by computer + penguin ---------- */
function emptyGrid(w: number, h: number): Grid {
  return Array.from({ length: h }, () => Array.from({ length: w }, () => "0"));
}
function fillRect(g: Grid, x0: number, y0: number, x1: number, y1: number, color: string) {
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++)
      if (g[y]?.[x] !== undefined) g[y][x] = color;
}
function outlinePass(g: Grid) {
  const H = g.length, W = g[0].length;
  const src = g.map((row) => [...row]);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (src[y][x] === "0") continue;
      const n = [src[y - 1]?.[x], src[y + 1]?.[x], src[y]?.[x - 1], src[y]?.[x + 1]];
      if (n.some((v) => v === undefined || v === "0")) g[y][x] = "outline";
    }
  }
}

/* ---------- computer / terminal with code on screen ---------- */
function buildComputer(): Grid {
  const W = 26, H = 22;
  const g = emptyGrid(W, H);
  fillRect(g, 1, 1, 24, 15, "frame");
  fillRect(g, 3, 3, 22, 13, "screen");
  fillRect(g, 11, 16, 14, 17, "frame");
  fillRect(g, 7, 18, 18, 19, "frame");
  outlinePass(g);
  fillRect(g, 5, 5, 9, 5, "pink");
  fillRect(g, 11, 5, 16, 5, "green");
  fillRect(g, 5, 7, 13, 7, "amber");
  fillRect(g, 5, 9, 10, 9, "cyan");
  fillRect(g, 12, 9, 18, 9, "pink");
  fillRect(g, 5, 11, 14, 11, "green");
  return g;
}

const COMPUTER_COLORS: Record<string, string> = {
  "0": "transparent",
  frame: "#8b5cf6",
  screen: "#14101f",
  outline: "#3b2a5c",
  pink: "#f472b6",
  green: "#4ade80",
  amber: "#f0a868",
  cyan: "#5ee6d0",
};

/* ---------- pixel penguin (original, Tux-inspired) ---------- */
function buildPenguin(): Grid {
  const W = 20, H = 26;
  const g = emptyGrid(W, H);

  const filled = (x: number, y: number) =>
    inEllipse(x, y, 10, 6, 4.5, 4.5) || inEllipse(x, y, 10, 16, 7.5, 9.5);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (filled(x, y)) g[y][x] = "body";
    }
  }
  for (let y = 8; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (g[y][x] === "body" && inEllipse(x, y, 10, 17, 4.2, 8)) g[y][x] = "belly";
    }
  }
  fillRect(g, 6, 5, 7, 6, "eyewhite");
  fillRect(g, 12, 5, 13, 6, "eyewhite");
  fillRect(g, 7, 6, 7, 6, "outline");
  fillRect(g, 12, 6, 12, 6, "outline");
  fillRect(g, 9, 7, 11, 8, "beak");
  fillRect(g, 6, 25, 8, 25, "beak");
  fillRect(g, 12, 25, 14, 25, "beak");

  outlinePass(g);
  return g;
}

const PENGUIN_COLORS: Record<string, string> = {
  "0": "transparent",
  body: "#2b2a3d",
  belly: "#f4f2f8",
  eyewhite: "#ffffff",
  beak: "#f0a868",
  outline: "#15141f",
};

function PixelBlock({
  grid,
  colors,
  size,
  floatDelay = 0,
}: {
  grid: Grid;
  colors: Record<string, string>;
  size: number;
  floatDelay?: number;
}) {
  const h = grid.length, w = grid[0].length;
  return (
    <motion.div
      drag
      dragElastic={0.3}
      dragConstraints={{ top: -30, bottom: 30, left: -40, right: 40 }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      whileHover={{ scale: 1.03 }}
      style={{ cursor: "grab", width: size, touchAction: "none" }}
      animate={{ y: [0, -8, 0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      className="select-none"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${w}, 1fr)`,
          width: "100%",
          aspectRatio: `${w} / ${h}`,
        }}
      >
        {grid.flatMap((row, y) =>
          row.map((c, x) => (
            <div key={`${x}-${y}`} style={{ background: colors[c] }} />
          ))
        )}
      </div>
    </motion.div>
  );
}

export function PixelScene() {
  const computer = useMemo(buildComputer, []);
  const penguin = useMemo(buildPenguin, []);

  return (
    <div className="flex items-end justify-center gap-6 flex-wrap">
      <FloatingPixelCloud size={140} />
      <PixelBlock grid={computer} colors={COMPUTER_COLORS} size={150} floatDelay={0.6} />
      <PixelBlock grid={penguin} colors={PENGUIN_COLORS} size={90} floatDelay={1.2} />
    </div>
  );
}