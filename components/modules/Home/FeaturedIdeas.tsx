import { Card, CardContent } from "@/components/ui/card";

export function FeaturedIdeas() {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50 via-green-100 to-white">
      <h2 className="text-4xl font-extrabold text-center text-green-800 mb-16">
        Recent Ideas
      </h2>
      <div className="grid md:grid-cols-3 gap-10 px-6 md:px-20">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="rounded-3xl shadow-2xl hover:shadow-3xl transition-transform transform hover:-translate-y-3 bg-white/80 backdrop-blur-md border border-green-100"
          >
            <CardContent className="p-6">
              <h3 className="font-bold text-xl text-green-700">
                Solar Community Project
              </h3>
              <p className="text-gray-700 mt-3">
                Implement solar panels in rural communities to reduce
                electricity costs and carbon footprint while promoting clean
                energy.
              </p>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-green-600 font-semibold bg-green-100/50 px-3 py-1 rounded-full">
                  🌞 Solar
                </span>
                <span className="text-gray-500 text-sm">120 votes</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
