import {
  Accessibility,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Fingerprint,
  Layers3,
  LineChart,
  Palette,
  Search,
  Server,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { ServiceSlug } from "@/lib/services";

const visualLabels: Record<ServiceSlug, string> = {
  "ui-ux-design": "Interface design canvas",
  "web-development": "Responsive website preview",
  "backend-development": "Connected backend service diagram",
  "mobile-app-development": "Mobile app interface preview",
  "ux-audits-accessibility": "Accessibility audit checklist",
  seo: "Search visibility analytics illustration",
  "branding-visual-identity": "Visual identity design board",
};

export default function ServiceVisual({ slug }: { slug: ServiceSlug }) {
  return (
    <div
      className="service-visual relative mx-auto flex min-h-[330px] w-full max-w-[500px] items-center justify-center sm:min-h-[420px]"
      role="img"
      aria-label={visualLabels[slug]}
    >
      <div className="absolute inset-[10%] rounded-full border border-accent/30" />
      <div className="absolute inset-[20%] rounded-full border border-dashed border-accent/30" />
      <div className="absolute left-[14%] top-[18%] h-2 w-2 rounded-full bg-accent shadow-[0_0_20px_5px_rgba(0,183,217,.22)]" />
      <div className="absolute bottom-[18%] right-[15%] h-3 w-3 rounded-full border border-[#00B7D9]/70" />

      {slug === "ui-ux-design" && (
        <div className="relative w-[78%] rotate-[-3deg] rounded-2xl border border-line bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-5">
          <div className="flex items-center gap-1.5 border-b border-line pb-3">
            <i className="h-2 w-2 rounded-full bg-rose-300/70" />
            <i className="h-2 w-2 rounded-full bg-amber-200/70" />
            <i className="h-2 w-2 rounded-full bg-emerald-200/70" />
            <span className="ml-3 h-2 w-24 rounded-full bg-surface-2" />
          </div>
          <div className="grid grid-cols-[.75fr_1.25fr] gap-3 pt-4">
            <div className="space-y-2 rounded-xl border border-line bg-surface p-3">
              <div className="h-2 w-4/5 rounded-full bg-slate-300/60" />
              <div className="h-2 w-full rounded-full bg-surface-2" />
              <div className="h-2 w-2/3 rounded-full bg-surface-2" />
              <div className="mt-5 h-8 rounded-lg bg-accent-tint" />
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent-tint p-3">
              <div className="flex items-center justify-between">
                <Layers3 size={15} className="text-accent-dark" />
                <span className="h-2 w-10 rounded-full bg-accent/30" />
              </div>
              <div className="mt-4 h-20 rounded-lg border border-line bg-surface" />
              <div className="mt-3 h-2 w-4/5 rounded-full bg-slate-300/60" />
            </div>
          </div>
          <div className="absolute -right-7 top-[34%] flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-white text-accent-dark shadow-xl">
            <Sparkles size={20} />
          </div>
          <span className="absolute -bottom-5 left-[12%] rounded-full border border-line bg-surface px-3 py-2 text-[10px] font-medium tracking-wide text-ink-soft">USER FLOW · PROTOTYPE</span>
        </div>
      )}

      {slug === "web-development" && (
        <div className="relative w-[82%] rounded-2xl border border-line bg-white p-3 shadow-2xl shadow-slate-900/10 sm:p-4">
          <div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2">
            <div className="flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-rose-300/70" /><i className="h-1.5 w-1.5 rounded-full bg-amber-200/70" /><i className="h-1.5 w-1.5 rounded-full bg-emerald-200/70" /></div>
            <span className="ml-2 h-2 flex-1 rounded-full bg-surface-2" />
            <Code2 size={14} className="text-accent-dark" />
          </div>
          <div className="grid grid-cols-[1.15fr_.85fr] gap-3 p-3 sm:gap-4 sm:p-4">
            <div className="flex flex-col justify-center">
              <span className="h-2 w-14 rounded-full bg-accent/40" />
              <span className="mt-3 h-3 w-full rounded-full bg-slate-700/45" />
              <span className="mt-2 h-3 w-4/5 rounded-full bg-slate-600/30" />
              <span className="mt-5 h-8 w-24 rounded-lg bg-accent" />
            </div>
            <div className="flex aspect-[.8] items-end justify-center overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-cyan-300/15 via-slate-200/5 to-indigo-400/10 p-3">
              <div className="h-[55%] w-[72%] rounded-t-xl border border-slate-200/20 bg-slate-700/10" />
            </div>
          </div>
          <span className="absolute -bottom-5 right-[12%] rounded-full border border-line bg-surface px-3 py-2 text-[10px] font-medium tracking-wide text-ink-soft">RESPONSIVE · FAST · ACCESSIBLE</span>
        </div>
      )}

      {slug === "backend-development" && (
        <div className="relative flex h-[280px] w-[82%] items-center justify-center sm:h-[330px]">
          <svg viewBox="0 0 420 300" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            <path d="M90 150h90m60 0h90M210 75v45m0 60v45" stroke="#00B7D9" strokeOpacity=".38" strokeWidth="2" strokeDasharray="5 7" />
            <circle cx="210" cy="150" r="102" stroke="#00B7D9" strokeOpacity=".12" />
          </svg>
          <div className="absolute left-[4%] top-[43%] flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-white text-accent-dark"><Braces size={22} /></div>
          <div className="absolute right-[4%] top-[43%] flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-white text-accent-dark"><Server size={22} /></div>
          <div className="absolute left-1/2 top-[4%] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl border border-line bg-white text-ink-soft"><Fingerprint size={20} /></div>
          <div className="absolute bottom-[2%] left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl border border-line bg-white text-ink-soft"><Workflow size={20} /></div>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-accent/30 bg-accent-tint text-accent-dark shadow-[0_0_50px_rgba(0,183,217,.12)]"><Code2 size={34} /></div>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-2 text-[10px] font-medium tracking-wide text-ink-soft">API · DATA · INTEGRATIONS</span>
        </div>
      )}

      {slug === "mobile-app-development" && (
        <div className="relative flex h-[340px] w-[210px] rotate-[5deg] items-center justify-center rounded-[2.4rem] border border-slate-200/25 bg-surface p-2.5 shadow-2xl shadow-slate-900/10 sm:h-[390px] sm:w-[230px]">
          <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] border border-line bg-surface px-4 pt-9">
            <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-slate-300/60" />
            <div className="flex items-center justify-between"><span className="text-[10px] font-semibold text-ink">YOUR PRODUCT</span><Smartphone size={15} className="text-accent-dark" /></div>
            <div className="mt-6 rounded-2xl border border-accent/30 bg-accent-tint p-3">
              <div className="h-2 w-14 rounded-full bg-accent/40" />
              <div className="mt-3 h-3 w-full rounded-full bg-slate-700/45" />
              <div className="mt-2 h-3 w-3/4 rounded-full bg-slate-100/40" />
              <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-cyan-300/20 to-indigo-400/10" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2"><div className="h-12 rounded-xl border border-line bg-surface" /><div className="h-12 rounded-xl border border-line bg-surface" /></div>
            <div className="mt-4 h-9 rounded-xl bg-accent" />
          </div>
          <span className="absolute -right-20 top-[25%] flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-[10px] font-medium text-ink-soft"><Check size={13} className="text-accent-dark" /> PLATFORM-AWARE UI</span>
        </div>
      )}

      {slug === "ux-audits-accessibility" && (
        <div className="relative w-[82%] rounded-2xl border border-line bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div><span className="block text-[10px] uppercase tracking-[.16em] text-ink-soft">Experience review</span><span className="mt-1 block text-sm font-semibold text-ink">Priority findings</span></div>
            <Accessibility className="text-accent-dark" size={22} />
          </div>
          <div className="space-y-3 pt-4">
            {["Keyboard & focus", "Readable contrast", "Clear form feedback", "Screen reader labels"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-3">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${index < 2 ? "bg-accent-tint text-accent-dark" : "bg-surface-2 text-ink-soft"}`}><Check size={13} /></span>
                <span className="flex-1 text-xs text-ink-soft">{item}</span>
                <span className="h-1.5 w-10 rounded-full bg-surface-2"><i className={`block h-full rounded-full ${index < 2 ? "w-full bg-accent" : "w-1/2 bg-slate-400/50"}`} /></span>
              </div>
            ))}
          </div>
          <span className="absolute -bottom-5 right-[10%] rounded-full border border-line bg-surface px-3 py-2 text-[10px] font-medium tracking-wide text-ink-soft">EVIDENCE · PRIORITY · NEXT STEPS</span>
        </div>
      )}

      {slug === "seo" && (
        <div className="relative w-[82%] rounded-2xl border border-line bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6">
          <div className="flex items-center justify-between"><div><span className="block text-[10px] uppercase tracking-[.16em] text-ink-soft">Search foundations</span><span className="mt-1 block text-sm font-semibold text-ink">Page health overview</span></div><Search className="text-accent-dark" size={20} /></div>
          <div className="mt-5 flex h-36 items-end gap-2 rounded-xl border border-line bg-surface px-4 pb-3 pt-5">
            {[32, 45, 39, 59, 54, 74, 66, 88].map((height, index) => <i key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-400/25 to-[#00B7D9]" style={{ height: `${height}%`, opacity: 0.45 + index * 0.07 }} />)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2"><span className="h-8 rounded-lg border border-line bg-surface" /><span className="h-8 rounded-lg border border-line bg-surface" /><span className="h-8 rounded-lg border border-line bg-surface" /></div>
          <div className="absolute -right-5 top-[34%] flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-surface text-accent-dark"><LineChart size={19} /></div>
          <span className="absolute -bottom-5 left-[12%] rounded-full border border-line bg-surface px-3 py-2 text-[10px] font-medium tracking-wide text-ink-soft">TECHNICAL · ON-PAGE · MEASURED</span>
        </div>
      )}

      {slug === "branding-visual-identity" && (
        <div className="relative w-[80%] rotate-[2deg] rounded-2xl border border-line bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6">
          <div className="flex items-center justify-between"><span className="text-[10px] uppercase tracking-[.16em] text-ink-soft">Identity system</span><Palette size={19} className="text-accent-dark" /></div>
          <div className="mt-5 flex items-center gap-4"><div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent-tint text-3xl font-semibold tracking-[-.08em] text-accent-dark">CV</div><div className="min-w-0 flex-1"><span className="block text-lg font-semibold tracking-wide text-ink">CEDAR VERTEX</span><span className="mt-2 block h-2 w-4/5 rounded-full bg-line" /></div></div>
          <div className="mt-6 grid grid-cols-5 gap-2">{["#00B7D9", "#2C3E50", "#1B2732", "#5C6B7A", "#F2F4F5"].map((color) => <span key={color} className="aspect-square rounded-lg border border-line" style={{ backgroundColor: color }} />)}</div>
          <div className="mt-5 flex items-end gap-3"><span className="text-4xl font-semibold leading-none text-ink">Aa</span><span className="mb-1 h-2 flex-1 rounded-full bg-line" /><span className="mb-1 h-2 w-8 rounded-full bg-accent/30" /></div>
          <div className="absolute -bottom-5 -right-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-ink"><ArrowUpRight size={18} /></div>
        </div>
      )}

      <ArrowDownRight className="absolute bottom-[12%] left-[12%] text-accent-dark/60" size={20} />
    </div>
  );
}
