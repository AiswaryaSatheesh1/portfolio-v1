"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TerminalFeed } from "./TerminalFeed";
import { HARDWARE } from "./hardwareData";

const NAME = "Aiswarya";

const SKILLS = [
  { group: "Cloud & Infra", items: ["CI/CD", "Docker", "Terraform", "AWS", "Kubernetes"] },
  {
    group: "Networking & Systems",
    items: [
      "TCP/IP & Subnetting",
      "DNS & DHCP",
      "Routing & NAT",
      "VPN",
      "FortiGate Firewalls",
      "Windows Server",
      "Linux / SSH",
      "SSL/TLS",
    ],
  },
  { group: "Software", items: ["Python", "React", "Next.js", "TypeScript", "Three.js"] },
];

const EXPERIENCE = [
  {
    year: "2025",
    role: "IT Infrastructure & Cloud Engineering",
    org: "Technocrat Technical Services — Current",
    desc: "Manage IT infrastructure, networking, servers, security, and cloud systems, including FortiGate firewalls, VPNs, Windows Server environments, Microsoft 365, SharePoint, databases, NAS/storage, backups, and business applications. Lead cloud migration and infrastructure automation initiatives with hands-on work across AWS (VPC, EC2, S3, IAM, RDS, CloudWatch), Terraform, Docker, Linux, and CI/CD — troubleshooting issues, hardening security, and building more reliable, efficient environments.",
  },
  {
    year: "2024",
    role: "Software Engineering & Operations",
    org: "Thrillark",
    desc: "Worked across software engineering, product development, and operations — building and improving digital products while managing day-to-day operational needs. Partnered closely with cross-functional teams to develop solutions, streamline processes, and keep both products and operations running smoothly.",
  },
];

const SOFTWARE_PROJECTS = [
  {
    title: "Cloud & Network Ops Automation",
    desc: "Internal platform centralizing networking and cloud operations, with AI agents that detect and auto-remediate infrastructure issues.",
    tags: ["AWS", "AI Agents", "Automation"],
    githubUrl: "https://github.com/AiswaryaSatheesh1/AI-powered-auto-remediation",
    liveUrl: null,
  },
  {
    title: "Accounts Team Dashboard",
    desc: "Internal dashboard built for the accounts team to manage their workflow, replacing manual spreadsheets.",
    tags: ["Full-Stack", "Internal Tool"],
    githubUrl: "https://github.com/AiswaryaSatheesh1",
    liveUrl: null,
  },
  {
    title: "technocratoman.com",
    desc: "Public website — designed, built, and deployed independently.",
    tags: ["Web"],
    githubUrl: "https://github.com/AiswaryaSatheesh1",
    liveUrl: "https://technocratoman.com",
  },
  {
    title: "briopus.com",
    desc: "Public website — designed, built, and deployed independently.",
    tags: ["Web"],
    githubUrl: "https://github.com/AiswaryaSatheesh1",
    liveUrl: "https://briopus.com",
  },
  {
    title: "devport.dev",
    desc: "Public website — designed, built, and deployed independently.",
    tags: ["Web"],
    githubUrl: "https://github.com/AiswaryaSatheesh1",
    liveUrl: "https://devport.dev",
  },
];

/* ---------- scroll reveal ---------- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const IconInstagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconMail = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
  </svg>
);
const IconX = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
    <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
const IconLinkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
    <path d="M6.94 8.5H3.56V21h3.38V8.5zM5.25 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94zM21 21h-3.37v-6.06c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.2V21H9.9V8.5h3.24v1.71h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.06 2.25 4.06 5.17V21z" />
  </svg>
);
const IconGithub = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
  </svg>
);

function FeaturedCarousel({
  items,
}: {
  items: { title: string; desc: string; tags: string[]; githubUrl: string }[];
}) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  const go = (dir: number) => {
    setIndex((i) => (i + dir + items.length) % items.length);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#3A0353] h-64 sm:h-72 flex flex-col items-center justify-center text-center px-6">
      <button
        onClick={() => go(-1)}
        aria-label="Previous project"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
      >
        ‹
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next project"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
      >
        ›
      </button>

      <h3 className="text-2xl sm:text-3xl font-bold text-[#F3EAE0] mb-3">{item.title}</h3>
      <p className="text-neutral-300 text-sm max-w-md mb-3">{item.desc}</p>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {item.tags.map((t) => (
          <span key={t} className="text-[11px] text-[#F8D299] border border-[#804A8A]/40 rounded-full px-2.5 py-1">
            {t}
          </span>
        ))}
      </div>
      <a
        href={item.githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${item.title} on GitHub`}
        className="text-[#F8D299] hover:text-[#F8D299] transition-colors"
      >
        <IconGithub />
      </a>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-[#F59E51]" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const ids = ["home", "about", "experience", "projects", "hardware"];
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#150a1c] text-neutral-300 font-sans overflow-x-hidden">
      {/* nav */}
      <nav className="sticky top-0 z-20 backdrop-blur-md bg-[#150a1c]/80 border-b border-white/5">
  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-10">
    <span className="text-xl font-bold text-[#F3EAE0]">
      Aiswarya
    </span>
    <div className="hidden md:flex gap-8 text-sm text-neutral-400">
      {["Home", "About", "Experience", "Projects", "Hardware"].map((n) => {
        const id = n.toLowerCase();
        return (
          <a
            key={n}
            href={`#${id}`}
            className={`transition-colors hover:text-[#F59E51] ${active === id ? "text-[#F59E51]" : ""}`}
          >
            {n}
          </a>
        );
      })}
    </div>
  </div>
</nav>

      <main className="max-w-6xl mx-auto px-6">
        {/* hero */}
        <section id="home" className="pt-20 pb-24">
         

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal delay={100} className="w-full order-2 md:order-1">
              <TerminalFeed />
            </Reveal>

            <div className="order-1 md:order-2 text-left">
              <Reveal delay={150}>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F3EAE0] break-words">
                  Hey! , I am <span className="text-[#F59E51]">{NAME}</span>
                </h1>
              </Reveal>
              <Reveal delay={250}>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-300 mt-4">
                  IT infrastructure professional moving deeper into cloud engineering
                </h2>
              </Reveal>
              <Reveal delay={350}>
                <p className="mt-6 text-neutral-400 leading-relaxed">
                  I build and manage infrastructure with AWS, networking, Linux, and automation by day, and spend my time exploring Terraform, Docker, DevOps, and ways to automate the work that keeps systems running.
                </p>
              </Reveal>
              <Reveal delay={450}>
                <div className="flex gap-4 mt-9 flex-wrap">
                  <a href="mailto:aishuaiswarya2051@gmail.com"
                    className="bg-[#F59E51] text-[#2A1033] font-medium rounded-full px-6 py-3 text-sm hover:bg-[#F8D299] transition-colors inline-flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    Say hi!
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* about */}
        <section id="about" className="py-20 border-t border-white/5 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[#F59E51] text-2xl font-bold">/</span>
              <h2 className="text-3xl font-bold text-[#F3EAE0]">About Me</h2>
            </div>
            <p className="text-neutral-400 leading-relaxed mb-5">
              I'm currently focused on Cloud Engineering, with a strong interest in AWS and cloud
              infrastructure. I work with technologies like AWS, Terraform, Docker, Linux, networking,
              cloud security, and CI/CD, building my skills around designing secure, scalable, and
              reliable cloud environments.
            </p>
            <p className="text-neutral-300 font-medium mb-3">Here are some technologies I've been working with:</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
              {[
                "AWS",
                "Terraform",
                "Docker",
                "Linux",
                "Networking",
                "Cloud Security",
                "CI/CD",
                "Infrastructure Automation",
              ].map((tech) => (
                <li key={tech} className="flex items-center gap-2 text-neutral-400 text-sm">
                  <span className="text-[#F59E51]">•</span>
                  {tech}
                </li>
              ))}
            </ul>
            <p className="text-neutral-400 leading-relaxed">
              In my free time, I enjoy exploring new cloud technologies, building infrastructure
              projects, and experimenting with automation and DevOps.
            </p>
          </Reveal>
          <Reveal delay={150} className="flex justify-center">
            <img
              src="/computer.png"
              alt="Retro CRT computer"
              className="w-56"
            />
          </Reveal>
        </section>

        {/* skills */}
        <section className="py-20 border-t border-white/5">
          <Reveal>
            <h2 className="text-3xl font-bold text-[#F3EAE0] mb-10">Skills & Technologies</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {SKILLS.map((col, i) => (
              <Reveal key={col.group} delay={i * 100}>
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 h-full">
                  <h4 className="font-semibold text-neutral-100 mb-3">{col.group}</h4>
                  <div className="flex flex-wrap gap-2">
                    {col.items.map((s) => (
                      <span key={s} className="text-xs text-[#F8D299] border border-[#804A8A]/40 rounded-full px-3 py-1">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* experience */}
        <section id="experience" className="py-20 border-t border-white/5">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-12">
              <span className="text-[#F59E51] text-2xl font-bold">/</span>
              <h2 className="text-3xl font-bold text-[#F3EAE0]">Experience</h2>
            </div>
          </Reveal>
          <div className="space-y-8">
            {EXPERIENCE.map((item, i) => (
              <Reveal key={item.role} delay={i * 120}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 shrink-0 rounded-full bg-[#3A0353] flex items-center justify-center text-xs font-bold text-[#F3EAE0] text-center leading-tight">
                      {item.year}
                    </div>
                    {i < EXPERIENCE.length - 1 && <div className="w-px flex-1 bg-[#804A8A]/30 mt-2" />}
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 flex-1 mb-2">
                    <h3 className="font-semibold text-neutral-100">{item.role}</h3>
                    <div className="text-[#F59E51] text-sm mb-2">at {item.org}</div>
                    <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* projects */}
        <section id="projects" className="py-20 border-t border-white/5">
          {/* software */}
          <Reveal>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-[#F59E51] text-2xl font-bold">/</span>
              <h2 className="text-3xl font-bold text-[#F3EAE0]">software</h2>
              <div className="h-px bg-white/10 flex-1 ml-2" />
              <a href="https://github.com/AiswaryaSatheesh1" target="_blank" rel="noreferrer" className="text-[#F59E51] text-sm hover:text-[#F8D299] transition-colors whitespace-nowrap">
                View all projects →
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="mb-6">
            <FeaturedCarousel items={SOFTWARE_PROJECTS} />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-20">
            {SOFTWARE_PROJECTS.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 80}
                className={`lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""}`}
              >
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group block bg-white/[0.03] border border-white/10 rounded-xl h-full min-h-[280px] flex flex-col p-6 hover:border-[#F59E51]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-6">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#F59E51]">
                      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
                    </svg>
                    <div className="flex items-center gap-3">
                      {p.liveUrl && (
                        <span
                          role="link"
                          tabIndex={0}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(p.liveUrl!, "_blank", "noreferrer");
                          }}
                          aria-label={`Open ${p.title} live site`}
                          className="text-neutral-500 hover:text-[#F8D299] transition-colors cursor-pointer"
                        >
                          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M14 4h6v6M10 14 20 4M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6" />
                          </svg>
                        </span>
                      )}
                      <span className="text-neutral-500 group-hover:text-[#F8D299] transition-colors">
                        <IconGithub />
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-neutral-100 text-lg mb-3">{p.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-6">{p.desc}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-auto text-neutral-500 text-xs">
                    {p.tags.join(", ")}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* hardware */}
          <div id="hardware">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-[#F59E51] text-2xl font-bold">/</span>
              <h2 className="text-3xl font-bold text-[#F3EAE0]">hardware</h2>
              <div className="h-px bg-white/10 flex-1 ml-2" />
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HARDWARE.map((h, i) => (
              <Reveal key={h.slug} delay={i * 80}>
                <Link
                  href={`/hardware/${h.slug}`}
                  className="group block bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden h-full flex flex-col hover:border-[#F59E51]/40 transition-colors"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img src={h.image} alt={h.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-neutral-100 text-xl mb-3">{h.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">{h.shortDesc}</p>
                    <span className="text-[#F59E51] text-sm font-medium group-hover:text-[#F8D299] transition-colors mb-6 inline-flex items-center gap-1">
                      Full project log →
                    </span>
                    <div className="mt-auto text-neutral-500 text-xs">{h.tags.join(", ")}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          </div>
        </section>

        

        <footer className="py-10 text-center text-neutral-600 text-xs border-t border-white/5">
          Built and designed by Aiswarya.<br />
All rights reserved.© 2026
        </footer>
      </main>
    </div>
  );
}