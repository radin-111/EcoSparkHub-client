import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function SubmitCTA() {
  return (
    <section className="px-6 py-20 md:px-16">
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[3rem] border border-emerald-100 bg-white p-8 md:p-20 shadow-2xl shadow-emerald-100/50">
        {/* The "Center Glow" Design */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white pointer-events-none" />

        {/* Blurry accent Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-100/40 rounded-full blur-[100px] animate-pulse delay-700" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Community Driven
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Ready to share your{" "}
            <span className="text-emerald-600">vision?</span>
          </h2>

          <p className="max-w-xl mx-auto text-lg text-slate-500 leading-relaxed mb-10">
            Join 800+ members in building sustainable solutions. Share your idea
            today and get the validation you need to move forward.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="group relative h-14 px-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 overflow-hidden shadow-xl"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[20deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000" />

              <span className="relative flex items-center gap-2 text-base font-semibold">
                Submit Idea{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            {/* <button className="px-8 py-3 text-slate-500 font-medium hover:text-emerald-600 transition-colors">
              View Guidelines
            </button> */}
          </div>
        </div>

        {/* Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </section>
  );
}
