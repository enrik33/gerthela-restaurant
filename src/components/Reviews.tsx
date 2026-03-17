'use client';

import { Star, ExternalLink } from 'lucide-react';

const REVIEWS = [
    {
        id: 1,
        author: 'FoodMonsterTravels',
        initials: 'FM',
        platform: 'TripAdvisor',
        rating: 5,
        content:
            "I don't even have words to describe how fabulous this place is. The seafood is beyond fresh. They took us to the back to pick out our own fish. It was a 15 out of 10. Fabulous!",
        date: 'September 2025',
        link: 'https://www.tripadvisor.com/Restaurant_Review-g303165-d4926971-Reviews-Gerthela-Saranda_Vlore_County.html',
        color: 'bg-teal-600',
    },
    {
        id: 2,
        author: 'Daniel Daroui',
        initials: 'DD',
        platform: 'Google',
        rating: 5,
        content:
            "I would give 6 stars if I could! The food is amazing. It's a family business, the fish is always fresh. You won't find the same dishes everyday because they prepare based on daily catch.",
        date: '10 months ago',
        link: 'https://maps.app.goo.gl/6a7XSdJsT6XFVtL88',
        color: 'bg-blue-600',
    },
    {
        id: 3,
        author: 'Klejdi Murtaj',
        initials: 'KM',
        platform: 'Restaurant Guru',
        rating: 5,
        content:
            'Taverna Gerthela is an absolute gem for seafood lovers! The atmosphere is cozy and welcoming with charming sea-inspired decor. Highly recommend if you are in Saranda!',
        date: '1 year ago',
        link: 'https://restaurantguru.com/Gerthela-Sarande',
        color: 'bg-orange-600',
    },
    {
        id: 4,
        author: 'KatieAKR',
        initials: 'KA',
        platform: 'TripAdvisor',
        rating: 5,
        content:
            'Great, NOT touristy, delicious food! You will find local Albanians at dinner, great food quality with fresh and spotless fish. Friendliness and politeness. We will definitely be back!',
        date: 'May 2025',
        link: 'https://www.tripadvisor.com/Restaurant_Review-g303165-d4926971-Reviews-Gerthela-Saranda_Vlore_County.html',
        color: 'bg-teal-600',
    },
];

const PLATFORM_LINKS = [
    {
        name: 'TripAdvisor',
        count: '222 reviews',
        href: 'https://www.tripadvisor.com/Restaurant_Review-g303165-d4926971-Reviews-Gerthela-Saranda_Vlore_County.html',
        bg: 'bg-[#34e0a1]/10 hover:bg-[#34e0a1]/20 border-[#34e0a1]/30',
        text: 'text-[#0d7a5b]',
        icon: '🦉',
    },
    {
        name: 'Google Maps',
        href: 'https://maps.app.goo.gl/6a7XSdJsT6XFVtL88',
        bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
        text: 'text-blue-700',
        icon: '📍',
    },
    {
        name: 'Restaurant Guru',
        href: 'https://restaurantguru.com/Gerthela-Sarande',
        bg: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
        text: 'text-orange-700',
        icon: '🍴',
    },
];

export default function Reviews() {
    return (
        <section id="reviews" className="py-20 md:py-28 bg-[#0d1b2a] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9972c] rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
            </div>

            {/* Top wave */}
            <div className="absolute top-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16" fill="white">
                    <path d="M0,30 C480,60 960,0 1440,30 L1440,0 L0,0 Z" />
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                {/* Section header */}
                <div className="text-center mb-12">
                    <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
                        What Our Guests Say
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                        Guest Reviews
                    </h2>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-gray-300 ml-1">4.0+ Rating across all platforms</p>
                    </div>
                </div>

                {/* Reviews grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {REVIEWS.map((review) => (
                        <div
                            key={review.id}
                            className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
                        >
                            {/* Large quote mark */}
                            <div className="absolute top-4 right-5 text-6xl font-serif text-[#c9972c]/20 leading-none select-none">
                                &ldquo;
                            </div>

                            {/* Stars */}
                            <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-200 text-base leading-relaxed mb-5 italic">
                                &ldquo;{review.content}&rdquo;
                            </p>

                            {/* Author row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                                        {review.initials}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{review.author}</p>
                                        <p className="text-gray-400 text-xs">{review.platform} · {review.date}</p>
                                    </div>
                                </div>
                                <a
                                    href={review.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#c9972c] hover:text-[#f0c060] transition-colors"
                                    aria-label="Read full review"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Platform links */}
                <div className="text-center">
                    <p className="text-gray-400 mb-5 text-sm tracking-wide">Read more reviews on:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {PLATFORM_LINKS.map((platform) => (
                            <a
                                key={platform.name}
                                href={platform.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded-full text-sm font-semibold transition-all ${platform.bg} ${platform.text}`}
                            >
                                <span>{platform.icon}</span>
                                {platform.name}
                                {platform.count && <span className="text-xs opacity-70">({platform.count})</span>}
                                <ExternalLink size={13} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16" fill="white">
                    <path d="M0,30 C480,0 960,60 1440,30 L1440,60 L0,60 Z" />
                </svg>
            </div>
        </section>
    );
}
