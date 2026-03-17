'use client';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg h-96 flex items-center justify-center">
            <p className="text-white text-center text-lg">Restaurant Image</p>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Gerthela</h2>
            
            <p className="text-gray-600 text-lg mb-4">
              Since its founding, Gerthela has been Saranda's premier destination for authentic Mediterranean seafood. 
              Our family-owned restaurant sits directly on the waterfront promenade, offering stunning sea views and 
              unforgettable dining experiences.
            </p>

            <p className="text-gray-600 text-lg mb-4">
              <strong>Our unique experience:</strong> We invite our guests to visit our kitchen and select their own fish 
              from our daily fresh catch. Every dish is prepared with care and attention to detail, using only the finest 
              local ingredients sourced from nearby fishermen.
            </p>

            <p className="text-gray-600 text-lg mb-6">
              Whether you're a tourist exploring the Ionian coast or a local looking for authentic cuisine, Gerthela welcomes 
              you to experience the true taste of Albanian seafood dining. Our friendly staff is here to make your visit 
              special and memorable.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">4.0★</p>
                <p className="text-gray-600 text-sm">TripAdvisor Rated</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">222+</p>
                <p className="text-gray-600 text-sm">Reviews</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">Fresh</p>
                <p className="text-gray-600 text-sm">Daily Catch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
