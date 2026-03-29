import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Globe2,
  ArrowUpRight,
} from "lucide-react";
import Logo from "../shadcn-studio/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: ["About Us", "How it Works", "Categories", "Leaderboard"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
    {
      title: "Support",
      links: ["Contact", "FAQ", "Community Guidelines"],
    },
  ];

  return (
    <footer className="relative pt-32 pb-10 overflow-hidden bg-white border-t border-slate-100">
      {/* Background Architectural Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] bg-emerald-50/30 rounded-[100%] blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24">
          {/* Brand Identity Section */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="inline-block group cursor-pointer">
                <div className="relative flex items-center gap-4">
                  <Logo/>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                      EcoSpark
                      <span className="text-emerald-600 font-medium">Hub</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-600/60 mt-1.5">
                      Future Proofing
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-slate-500 text-xl leading-relaxed font-medium max-w-md">
                The world&apos;s leading open-source ecosystem for
                climate-positive innovation and community validation.
              </p>
            </div>

            {/* Premium Social Cluster */}
            <div className="flex items-center gap-2">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Mail, label: "Email" },
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50/50 border border-transparent hover:border-emerald-100 transition-all duration-500 group"
                >
                  <Icon className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12 lg:pl-16">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-8">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">
                  {section.title}
                </h4>
                <ul className="space-y-5">
                  {section.links.map((link) => (
                    <li key={link} className="group/link">
                      <a
                        href="#"
                        className="flex items-center justify-between text-slate-500 hover:text-emerald-600 transition-all text-sm font-semibold tracking-tight"
                      >
                        <span>{link}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 ease-out" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* The "Power Bar" Bottom Section */}
        <div className="pt-10 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50/50 border border-emerald-100/50 rounded-full transition-colors hover:bg-emerald-50">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 flex items-center gap-2">
                <Globe2 className="w-3 h-3" /> System Operational
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em]">
              © {currentYear} EcoSparkHub
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              {["Security", "Privacy", "Status"].map((item) => (
                <button
                  key={item}
                  className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="hidden sm:block h-4 w-px bg-slate-200" />
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="italic opacity-70">v2.0.4-stable</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
