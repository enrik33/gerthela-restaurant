'use client';

export default function About() {
  const stats = [
    { value: '4.0★', label: 'TripAdvisor Rating', sub: 'Out of 5 stars' },
    { value: '222+', label: 'Guest Reviews', sub: 'Across all platforms' },
    { value: 'Daily', label: 'Fresh Catch', sub: 'Sourced locally' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image column */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop"
                alt="Fresh seafood at Gerthela Taverna"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating accent image */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1504674900968-a85b86418e5f?w=400&h=400&fit=crop"
                alt="Grilled fish dish"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gold accent bar */}
            <div className="absolute -left-4 top-8 w-1.5 h-24 bg-gradient-to-b from-[#c9972c] to-[#f0c060] rounded-full" />
          </div>

          {/* Content column */}
          <div className="lg:pl-6">
            <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0d1b2a] mb-6 leading-tight">
              Welcome to<br />
              <span className="italic text-[#c9972c]">Gerthela</span>
            </h2>

            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              Since its founding, Gerthela has been Saranda&apos;s premier destination for authentic
              Mediterranean seafood. Our family-owned restaurant sits directly on the waterfront
              promenade, offering stunning sea views and unforgettable dining experiences.
            </p>

            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              <span className="font-semibold text-[#0d1b2a]">Our unique experience:</span> We invite
              our guests to visit our kitchen and select their own fish from our daily fresh catch.
              Every dish is prepared with care using only the finest local ingredients sourced from
              nearby fishermen.
            </p>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Whether you&apos;re a tourist exploring the Ionian coast or a local looking for authentic
              cuisine, Gerthela welcomes you to experience the true taste of Albanian seafood dining.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <p className="text-2xl sm:text-3xl font-bold text-[#c9972c] font-display mb-1 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-[#0d1b2a] text-sm font-semibold">{stat.label}</p>
                  <p className="text-gray-400 text-xs">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
