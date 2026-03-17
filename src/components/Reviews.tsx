'use client';

import { Star, ExternalLink } from 'lucide-react';

const REVIEWS = [
    {
        id: 1,
        author: 'FoodMonsterTravels',
        platform: 'TripAdvisor',
        rating: 5,
        content:
            "I don't even have words to describe how fabulous this place is. The seafood is beyond fresh. They took us to the back to pick out our own fish. It was a 15 out of 10. Fabulous!",
        date: 'September 2025',
        link: 'https://www.tripadvisor.com/Restaurant_Review-g303165-d4926971-Reviews-Gerthela-Saranda_Vlore_County.html',
    },
    {
        id: 2,
        author: 'Daniel Daroui',
        platform: 'Google',
        rating: 5,
        content:
            "I would give 6 stars if I could! The food is amazing. It's a family business, the fish is always fresh. You won't find the same dishes everyday because they prepare based on daily catch.",
        date: '10 months ago',
        link: 'https://www.google.com/maps/place/Gerthela/@39.8731,20.00504',
    },
    {
        id: 3,
        author: 'Klejdi Murtaj',
        platform: 'Restaurant Guru',
        rating: 5,
        content:
            'Taverna Gerthela is an absolute gem for seafood lovers! The atmosphere is cozy and welcoming with charming sea-inspired decor. Highly recommend if you are in Saranda!',
        date: '1 year ago',
        link: 'https://restaurantguru.com/Gerthela-Sarande',
    },
    {
        id: 4,
        author: 'KatieAKR',
        platform: 'TripAdvisor',
        rating: 5,
        content:
            'Great, NOT touristy, delicious food! You will find local Albanians at dinner, great food quality with fresh and spotless fish. Friendliness and politeness. We will definitely be back!',
        date: 'May 2025',
        link: 'https://www.tripadvisor.com/Restaurant_Review-g303165-d4926971-Reviews-Gerthela-Saranda_Vlore_County.html',
    },
];

export default function Reviews() {
    return (
        <section id="reviews" className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Guest Reviews</h2>
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-gray-600 text-lg ml-2">4.0+ Rating across all platforms</p>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {REVIEWS.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-600"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{review.author}</h4>
                                    <p className="text-sm text-gray-600">
                                        {review.platform} • {review.date}
                                    </p>
                                </div>
                                <div className="flex">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4 italic">"{review.content}"</p>

                            <a
                                href={review.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                            >
                                Read full review
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    ))}
                </div>

                {/* Review Platform Links */}
                <div className="text-center">
                    <p className="text-gray-600 mb-6">Read more reviews on our platforms:</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="https://www.tripadvisor.com/Restaurant_Review-g303165-d4926971-Reviews-Gerthela-Saranda_Vlore_County.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            TripAdvisor (222 reviews) <ExternalLink size={16} />
                        </a>
                        <a
                            href="https://www.google.com/maps/place/Gerthela/@39.8731,20.00504"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                        >
                            Google Maps <ExternalLink size={16} />
                        </a>
                        <a
                            href="https://restaurantguru.com/Gerthela-Sarande"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
                        >
                            Restaurant Guru <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
