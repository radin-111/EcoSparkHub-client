"use client";
import CountUp from "react-countup";
import { Users, Lightbulb, CheckCircle } from "lucide-react";

export function Stats() {
  const stats = [
    {
      number: 1200,
      suffix: "+",
      label: "Ideas Shared",
      description: "Innovative concepts from our community.",
      icon: <Lightbulb className="w-5 h-5 text-emerald-600" />,
    },
    {
      number: 800,
      suffix: "+",
      label: "Active Members",
      description: "Collaborators working together daily.",
      icon: <Users className="w-5 h-5 text-emerald-600" />,
    },
    {
      number: 300,
      suffix: "+",
      label: "Approved Projects",
      description: "Vetted and ready for implementation.",
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Refined Central Gradient Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-100/40 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200/50 rounded-3xl overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-200/20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative bg-white/70 backdrop-blur-md p-10 lg:p-14 transition-all duration-500 hover:bg-emerald-50/40"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 mb-8 group-hover:rotate-[360deg] transition-transform duration-700">
                  {stat.icon}
                </div>

                {/* Animated Number */}
                <div className="text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900 mb-2">
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  <span className="text-emerald-500">{stat.suffix}</span>
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-4">
                  {stat.label}
                </span>

                <p className="text-slate-500 text-sm max-w-[180px] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {stat.description}
                </p>
              </div>

              {/* Decorative hover accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
