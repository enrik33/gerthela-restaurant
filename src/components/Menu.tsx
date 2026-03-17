'use client';

import { useState } from 'react';
import type { MenuItem } from '@/types';

const DUMMY_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Sea Bass',
    description: 'Fresh sea bass grilled to perfection with lemon and herbs',
    price: 1800,
    category: 'seafood',
    available: true,
  },
  {
    id: '2',
    name: 'Linguine al Granchio',
    description: 'Fresh pasta with crab, white wine and house herbs',
    price: 1600,
    category: 'mains',
    available: true,
  },
  {
    id: '3',
    name: 'Grilled Calamari',
    description: 'Tender squid grilled with garlic and olive oil',
    price: 1400,
    category: 'seafood',
    available: true,
  },
  {
    id: '4',
    name: 'Greek Salad',
    description: 'Fresh tomatoes, feta, olives and olive oil',
    price: 700,
    category: 'starters',
    available: true,
  },
  {
    id: '5',
    name: 'Tzatziki',
    description: 'Creamy yogurt dip with cucumber and garlic',
    price: 500,
    category: 'starters',
    available: true,
  },
  {
    id: '6',
    name: 'House Wine',
    description: 'Local white wine, perfectly chilled',
    price: 600,
    category: 'drinks',
    available: true,
  },
];

const CATEGORY_CONFIG: Record<string, { label: string; emoji: string }> = {
  starters: { label: 'Starters', emoji: '🥗' },
  mains: { label: 'Mains', emoji: '🍝' },
  seafood: { label: 'Seafood', emoji: '🐟' },
  drinks: { label: 'Drinks', emoji: '🍷' },
  desserts: { label: 'Desserts', emoji: '🍮' },
};


export default function Menu() {
  const menuItems: MenuItem[] = DUMMY_MENU;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['starters', 'mains', 'seafood', 'drinks', 'desserts'] as const;

  const filteredItems =
    activeCategory === 'all'
      ? menuItems.filter((item) => item.available)
      : menuItems.filter((item) => item.available && item.category === activeCategory);

  const groupedItems =
    activeCategory === 'all'
      ? categories.reduce((acc, category) => {
          const items = filteredItems.filter((item) => item.category === category);
          if (items.length > 0) acc[category] = items;
          return acc;
        }, {} as Record<string, MenuItem[]>)
      : { [activeCategory]: filteredItems };

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#f8f4ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
            What We Serve
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0d1b2a] mb-4">
            Our Menu
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Authentic Mediterranean cuisine featuring fresh daily catch. Prices in ALL (Albanian Lek).
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeCategory === 'all'
                ? 'bg-[#0d1b2a] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            🍽️ All Items
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                activeCategory === category
                  ? 'bg-[#c9972c] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {CATEGORY_CONFIG[category].emoji} {CATEGORY_CONFIG[category].label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-10">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              {/* Category heading */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl">{CATEGORY_CONFIG[category]?.emoji}</span>
                <h3 className="font-display text-2xl font-bold text-[#0d1b2a] capitalize">
                  {CATEGORY_CONFIG[category]?.label || category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-[#c9972c]/30 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#c9972c]/20"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-[#0d1b2a] mb-1.5 group-hover:text-[#c9972c] transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className="inline-block bg-[#0d1b2a] text-white rounded-full px-3 py-1 text-sm font-bold whitespace-nowrap">
                          {item.price.toLocaleString()} ALL
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No menu items available for selected category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
