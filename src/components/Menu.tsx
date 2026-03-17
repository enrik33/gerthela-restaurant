'use client';

import { useState, useEffect } from 'react';
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

interface MenuFilters {
  [key: string]: boolean;
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DUMMY_MENU);
  const [filters, setFilters] = useState<MenuFilters>({
    starters: true,
    mains: true,
    seafood: true,
    drinks: true,
    desserts: true,
  });

  const categories = ['starters', 'mains', 'seafood', 'drinks', 'desserts'] as const;

  const toggleFilter = (category: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredItems = menuItems.filter(item => 
    filters[item.category] && item.available
  );

  const groupedItems = categories.reduce((acc, category) => {
    const items = filteredItems.filter(item => item.category === category);
    if (items.length > 0) {
      acc[category] = items;
    }
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <section id="menu" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Authentic Mediterranean cuisine featuring fresh daily catch. Prices in ALL (Albanian Lek).
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => toggleFilter(category)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                filters[category]
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-blue-600">
                          {item.price} ALL
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-600">
            <p>No menu items available for selected categories.</p>
          </div>
        )}
      </div>
    </section>
  );
}
