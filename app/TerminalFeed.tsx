"use client";

import { useEffect, useRef, useState } from "react";

type Line = { type: "cmd" | "out"; text: string };

const SCRIPT: Line[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "Aiswarya — Cloud & IT Infrastructure Engineer" },
  { type: "cmd", text: "cat role.txt" },
  { type: "out", text: "IT Infrastructure & Cloud Engineering at Technocrat Technical Services." },
  { type: "cmd", text: "echo $STACK" },
  { type: "out", text: "AWS, Terraform, Docker, Linux, networking, cloud security, CI/CD" },
  { type: "cmd", text: "echo $FOCUS" },
  { type: "out", text: "Designing secure, scalable, reliable cloud environments." },
  { type: "cmd", text: "cat responsibilities.txt" },
  { type: "out", text: "Firewalls, VPNs, Windows Server, Microsoft 365, NAS/storage, backups." },
  { type: "out", text: "Cloud migration and infrastructure automation across AWS." },
  { type: "cmd", text: "echo $CURRENTLY_LEARNING" },
  { type: "out", text: "Deeper AWS architecture, Terraform, and DevOps automation." },
  { type: "cmd", text: "echo $FREE_TIME" },
  { type: "out", text: "Exploring new cloud tech and building infrastructure projects." },
  { type: "cmd", text: "cat mission.txt" },
  { type: "out", text: "Keep infrastructure running clean, then automate the rest." },
];

const TYPE_SPEED = 28; // ms per character
const LINE_PAUSE = 260; // ms pause after a completed line
const RESTART_PAUSE = 1400; // ms pause before looping back to the start
const MAX_VISIBLE_LINES = 11;

export function TerminalFeed({ className = "" }: { className?: string }) {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const scriptIndex = useRef(0);
  const charIndex = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      const line = SCRIPT[scriptIndex.current];
      const prefix = line.type === "cmd" ? "$ " : "";

      if (charIndex.current < line.text.length) {
        charIndex.current += 1;
        setCurrent(prefix + line.text.slice(0, charIndex.current));
        timeout = setTimeout(step, TYPE_SPEED);
      } else {
        setLines((prev) => {
          const next = [...prev, prefix + line.text];
          return next.slice(-MAX_VISIBLE_LINES);
        });
        setCurrent("");
        charIndex.current = 0;
        scriptIndex.current += 1;

        if (scriptIndex.current >= SCRIPT.length) {
          scriptIndex.current = 0;
          timeout = setTimeout(() => {
            setLines([]);
            timeout = setTimeout(step, TYPE_SPEED);
          }, RESTART_PAUSE);
        } else {
          timeout = setTimeout(step, LINE_PAUSE);
        }
      }
    };

    timeout = setTimeout(step, TYPE_SPEED);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`text-left bg-[#0c0a14]/90 border border-[#804A8A]/25 rounded-xl overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <span className="ml-3 text-[11px] text-neutral-500 font-mono">aiswarya@cloud-ops: ~</span>
      </div>
      <div className="p-4 h-64 overflow-hidden font-mono text-[12px] leading-relaxed text-left">
        {lines.map((l, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap break-words ${
              l.startsWith("$ ") ? "text-[#F8D299]" : "text-neutral-500"
            }`}
          >
            {l}
          </div>
        ))}
        <div
          className={`whitespace-pre-wrap break-words ${
            current.startsWith("$ ") ? "text-[#F8D299]" : "text-neutral-500"
          }`}
        >
          {current}
          <span className="inline-block w-[7px] h-[13px] bg-[#F59E51] ml-0.5 align-middle animate-pulse" />
        </div>
      </div>
    </div>
  );
}