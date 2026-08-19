"use client";

/* ---------- shaded pixel-art icons: cloud / terminal / server ---------- */

type Grid = string[][];

function emptyGrid(w: number, h: number): Grid {
  return Array.from({ length: h }, () => Array.from({ length: w }, () => "0"));
}

function fillRect(g: Grid, x0: number, y0: number, x1: number, y1: number, color: string) {
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (g[y] && g[y][x] !== undefined) g[y][x] = color;
    }
  }
}

function set(g: Grid, x: number, y: number, color: string) {
  if (g[y] && g[y][x] !== undefined) g[y][x] = color;
}

/* --- Cloud (22x14): outline, shadow, base, highlight --- */
function buildCloud(): Grid {
  const W = 22, H = 14;
  const g = emptyGrid(W, H);
  // silhouette via layered circle-ish lumps, built bottom-up
  fillRect(g, 3, 8, 18, 10, "base");
  fillRect(g, 5, 6, 16, 8, "base");
  fillRect(g, 7, 4, 13, 6, "base");
  fillRect(g, 2, 9, 19, 9, "base");
  // highlight (top-left lumps)
  fillRect(g, 8, 4, 12, 5, "hi");
  fillRect(g, 6, 6, 10, 6, "hi");
  // shadow (bottom band)
  fillRect(g, 3, 9, 18, 10, "shadow");
  fillRect(g, 5, 8, 16, 8, "shadow");
  // outline: any "base/hi/shadow" cell touching a "0" neighbor becomes outline
  const filled = (x: number, y: number) => g[y]?.[x] && g[y][x] !== "0";
  const src = g.map((row) => [...row]);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (src[y][x] !== "0") {
        const edge =
          !filled(x - 1, y) || !filled(x + 1, y) || !filled(x, y - 1) || !filled(x, y + 1);
        if (edge) g[y][x] = "outline";
      }
    }
  }
  return g;
}

/* --- Terminal / CRT (20x16): frame, screen, code lines --- */
function buildTerminal(): Grid {
  const W = 20, H = 16;
  const g = emptyGrid(W, H);
  fillRect(g, 1, 1, 18, 11, "frame");
  fillRect(g, 2, 2, 17, 10, "screen");
  fillRect(g, 8, 12, 11, 12, "frame");
  fillRect(g, 5, 13, 14, 14, "frame");
  // code lines on screen
  fillRect(g, 3, 3, 6, 3, "pink");
  fillRect(g, 8, 3, 12, 3, "green");
  fillRect(g, 3, 5, 9, 5, "amber");
  fillRect(g, 3, 7, 7, 7, "cyan");
  fillRect(g, 9, 7, 13, 7, "pink");
  fillRect(g, 3, 9, 10, 9, "green");
  return g;
}

/* --- Server rack (16x14): frame + LEDs --- */
function buildServer(): Grid {
  const W = 16, H = 14;
  const g = emptyGrid(W, H);
  fillRect(g, 1, 1, 14, 4, "frame");
  fillRect(g, 1, 5, 14, 8, "frame");
  fillRect(g, 1, 9, 14, 12, "frame");
  fillRect(g, 2, 2, 12, 3, "screen");
  fillRect(g, 2, 6, 12, 7, "screen");
  fillRect(g, 2, 10, 12, 11, "screen");
  set(g, 12, 2, "green");
  set(g, 12, 6, "amber");
  set(g, 12, 10, "pink");
  return g;
}

const COLORS: Record<string, string> = {
  "0": "transparent",
  base: "#f2eefc",
  hi: "#ffffff",
  shadow: "#c9b8ec",
  outline: "#4c3a7a",
  frame: "#a78bfa",
  screen: "#14101f",
  pink: "#f472b6",
  green: "#4ade80",
  amber: "#f0a868",
  cyan: "#5ee6d0",
};

function PixelIcon({ grid }: { grid: Grid }) {
  const h = grid.length;
  const w = grid[0].length;
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${w}, 1fr)`,
        width: "100%",
        aspectRatio: `${w} / ${h}`,
        imageRendering: "pixelated",
      }}
    >
      {grid.flatMap((row, y) =>
        row.map((c, x) => (
          <div key={`${x}-${y}`} style={{ background: COLORS[c] }} />
        ))
      )}
    </div>
  );
}

const ICONS = [
  { label: "Cloud", grid: buildCloud() },
  { label: "Code", grid: buildTerminal() },
  { label: "Infra", grid: buildServer() },
];

export function PixelShowcase() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
      {ICONS.map((icon) => (
        <div key={icon.label} className="flex flex-col items-center gap-3">
          <div className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-violet-400/50 hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.6)] transition-all">
            <PixelIcon grid={icon.grid} />
          </div>
          <span className="text-xs text-neutral-500">{icon.label}</span>
        </div>
      ))}
    </div>
  );
}