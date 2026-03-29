import { Card, CardContent } from "@/components/ui/card";
import { Send, CheckSquare, Users, Star } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      label: "Submit Idea",
      description: "Share your vision with our community.",
      icon: <Send className="w-6 h-6 text-emerald-600" />,
    },
    {
      label: "Admin Review",
      description: "Our team ensures quality and feasibility.",
      icon: <CheckSquare className="w-6 h-6 text-emerald-600" />,
    },
    {
      label: "Community Voting",
      description: "The best ideas rise to the top through votes.",
      icon: <Users className="w-6 h-6 text-emerald-600" />,
    },
    {
      label: "Get Reviews",
      description: "Receive professional feedback and ratings.",
      icon: <Star className="w-6 h-6 text-emerald-600" />,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden ">
      {/* Central Blurry Gradient Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-200/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Simple Process, Real Impact
          </h2>
          <p className="text-slate-600 text-lg">
            Follow our streamlined workflow to take your idea from concept to
            community-validated reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          {steps.map((step, i) => (
            <Card
              key={i}
              className="relative group bg-white/70 backdrop-blur-md border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <CardContent className="p-8">
                {/* Step Number Badge */}
                <div className="absolute top-4 right-4 text-slate-200 font-black text-4xl group-hover:text-emerald-100 transition-colors">
                  0{i + 1}
                </div>

                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.label}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
