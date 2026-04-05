import { Card, CardContent } from "@/components/ui/card";

export function Categories() {
  const categories = [
    "Recycling",
    "Solar Energy",
    "Water Conservation",
    "Transport",
    "Agriculture",
    "Waste Management",
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Central Professional Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-4">
            Browse by Topic
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
            Select a specialized category to explore community-driven innovations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, i) => (
            <Card
              key={i}
              className="group relative h-40 overflow-hidden border-slate-200/60 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(16,_185,_129,_0.1)] hover:border-emerald-200 cursor-pointer rounded-[2rem]"
            >
              <CardContent className="h-full p-8 flex flex-col justify-end">
                {/* Background Ghost Number - Subtle & Large */}
                <span className="absolute top-4 right-6 text-8xl font-black text-slate-50 group-hover:text-emerald-50/50 transition-colors duration-500 pointer-events-none select-none">
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </span>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-900 transition-colors duration-300">
                    {category}
                  </h3>
                  <div className="w-0 group-hover:w-12 h-1 bg-emerald-500 mt-2 transition-all duration-500 ease-in-out" />
                </div>

                {/* Glassy Inner Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/0 via-transparent to-emerald-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        
      </div>
    </section>
  );
}