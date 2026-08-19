import Link from "next/link";
import { notFound } from "next/navigation";
import { HARDWARE } from "../../hardwareData";

export async function generateStaticParams() {
  return HARDWARE.map((item) => ({ slug: item.slug }));
}

export default async function HardwareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = HARDWARE.find((h) => h.slug === slug);
  if (!item) return notFound();

  return (
    <div className="min-h-screen bg-[#08070c] text-neutral-300 font-sans">
      {/* top bar */}
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-2 flex items-center gap-4">
        <Link
          href="/hardware"
          aria-label="Back to hardware"
          className="text-[#F8D299] hover:text-[#F8D299] transition-colors"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <span className="text-[#F8D299] text-lg font-bold">/ project log</span>
      </div>

      <main className="max-w-3xl mx-auto px-6 pb-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-50 mt-8 mb-8 leading-tight">
          {item.title}
        </h1>

        <div className="rounded-2xl overflow-hidden mb-8 border border-white/10">
          <div className="aspect-[16/10] relative">
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <p className="text-neutral-400 text-lg leading-relaxed mb-4">{item.shortDesc}</p>
        <div className="text-neutral-600 text-sm font-mono mb-16">{item.date}</div>

        {item.parts && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-neutral-50 mb-3">Components / Parts</h2>
            <div className="h-px bg-white/10 mb-5" />
            <ul className="space-y-2">
              {item.parts.map((p) => (
                <li key={p} className="text-neutral-400 text-base leading-relaxed">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-16">
          {item.sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-neutral-50 mb-3">
                {i}. {s.heading}
              </h2>
              <div className="h-px bg-white/10 mb-5" />
              {s.body.map((p, j) => (
                <p key={j} className="text-neutral-400 text-base leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {s.tip && (
                <div className="border-l-2 border-[#F59E51] bg-[#804A8A]/10 rounded-r-lg px-5 py-4 mt-4">
                  <p className="text-[#F8D299] text-sm leading-relaxed">{s.tip}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-white/5">
          <Link href="/hardware" className="text-[#F59E51] text-sm font-medium hover:text-[#F8D299] transition-colors">
            ← Back to all hardware
          </Link>
        </div>
      </main>
    </div>
  );
}