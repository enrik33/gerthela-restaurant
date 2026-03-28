'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import type { MenuItem } from '@/types';

const DUMMY_MENU: MenuItem[] = [
  // ── STARTERS ─────────────────────────────────────────────────────────────
  { id: 's1',  name: 'Green Salad',          description: 'Green lettuce, onions, olives',                                                                  price: 300,  category: 'starters', available: true, allergens: 'None',                          preparation: '5 min',        origin: 'Local produce, Saranda' },
  { id: 's2',  name: 'Country Salad',        description: 'Tomatoes, cucumber, pepper, onions, olives, white feta cheese',                                  price: 400,  category: 'starters', available: true, allergens: 'Dairy (feta)',                   preparation: '5 min',        origin: 'Local produce, Saranda' },
  { id: 's3',  name: 'Arugula Salad',        description: 'Arugula, cherry tomato, parmigiano, aceto balsamico',                                            price: 600,  category: 'starters', available: true, allergens: 'Dairy (parmigiano)',             preparation: '5 min',        origin: 'Local & imported Italian ingredients' },
  { id: 's4',  name: 'Wild Vegetables',      description: 'Seasonal wild greens, lightly prepared',                                                         price: 300,  category: 'starters', available: true, allergens: 'None',                          preparation: '10 min',       origin: 'Foraged locally, Albanian hills' },
  { id: 's5',  name: 'Boiled Vegetables',    description: 'Broccoli, cauliflower, carrot, red-beet, potatoes',                                              price: 500,  category: 'starters', available: true, allergens: 'None',                          preparation: '10–15 min',    origin: 'Local produce, Saranda' },
  { id: 's6',  name: 'Grilled Vegetables',   description: 'Zucchini, peppers, eggplants, grated hard cheese, garlic, aceto balsamico',                     price: 500,  category: 'starters', available: true, allergens: 'Dairy (hard cheese)',            preparation: '10–15 min',    origin: 'Local produce, Saranda' },
  { id: 's7',  name: 'Curd',                 description: 'Fresh curd, house-style',                                                                        price: 400,  category: 'starters', available: true, allergens: 'Dairy',                          preparation: 'Ready to serve', origin: 'Local dairy, Albania' },
  { id: 's8',  name: 'Tyrokafteri',          description: 'Spicy feta cheese dip',                                                                          price: 400,  category: 'starters', available: true, allergens: 'Dairy (feta)',                   preparation: 'Ready to serve', origin: 'House-made, Greek recipe' },
  { id: 's9',  name: 'Tzatziki',             description: 'Creamy yogurt dip with cucumber and garlic',                                                     price: 400,  category: 'starters', available: true, allergens: 'Dairy (yogurt)',                 preparation: 'Ready to serve', origin: 'House-made, Greek recipe' },
  { id: 's10', name: 'Skordalia',            description: 'Traditional garlic and potato dip',                                                              price: 400,  category: 'starters', available: true, allergens: 'None',                          preparation: 'Ready to serve', origin: 'House-made, Greek recipe' },
  { id: 's11', name: 'Marinated Red-Beet',   description: 'Tender red beet marinated in-house',                                                             price: 400,  category: 'starters', available: true, allergens: 'None',                          preparation: 'Ready to serve', origin: 'Local produce, marinated in-house' },
  { id: 's12', name: 'Marinated Carrot',     description: 'Fresh carrots marinated in-house',                                                               price: 400,  category: 'starters', available: true, allergens: 'None',                          preparation: 'Ready to serve', origin: 'Local produce, marinated in-house' },
  { id: 's13', name: 'White Feta Cheese',    description: 'Roasted white feta cheese',                                                                      price: 400,  category: 'starters', available: true, allergens: 'Dairy (feta)',                   preparation: '10 min',       origin: 'Local dairy, Albania' },
  { id: 's14', name: 'Roasted Hard Cheese',  description: 'Grilled kaçkavall hard cheese',                                                                  price: 400,  category: 'starters', available: true, allergens: 'Dairy (kaçkavall)',              preparation: '10 min',       origin: 'Local dairy, Albania' },
  { id: 's15', name: 'Deep Fried Potatoes',  description: 'Crispy golden french fries',                                                                     price: 400,  category: 'starters', available: true, allergens: 'None',                          preparation: '10 min',       origin: 'Local produce, Saranda' },

  // ── MAINS ─────────────────────────────────────────────────────────────────
  { id: 'm1',  name: 'Fish Soup',               description: 'Dusky grouper, John Dory, sea capon, sorkopjo, potatoes, carrots',                            price: 500,  category: 'mains', available: true, allergens: 'Fish',                           preparation: '20–25 min',    origin: 'Wild-caught, Ionian Sea' },
  { id: 'm2',  name: 'Shrimp Linguine',          description: 'Linguine with deep sea shrimp, fresh tomato sauce, parsley',                                 price: 1100, category: 'mains', available: true, allergens: 'Gluten (pasta), crustaceans',    preparation: '15–20 min',    origin: 'Wild-caught shrimp, Ionian Sea' },
  { id: 'm3',  name: 'Shrimp & Squid Linguine',  description: 'Linguine with deep sea shrimp, squid, fresh tomato sauce, parsley',                         price: 1200, category: 'mains', available: true, allergens: 'Gluten (pasta), crustaceans, molluscs', preparation: '15–20 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'm4',  name: 'Crab Linguine',            description: 'Linguine with crab, fresh tomato sauce, parsley',                                            price: 1300, category: 'mains', available: true, allergens: 'Gluten (pasta), crustaceans',    preparation: '15–20 min',    origin: 'Wild-caught crab, Ionian Sea' },
  { id: 'm5',  name: 'Prawn Linguine',           description: 'Linguine with prawns, fresh tomato sauce, parsley',                                          price: 1500, category: 'mains', available: true, allergens: 'Gluten (pasta), crustaceans',    preparation: '15–20 min',    origin: 'Wild-caught prawns, Ionian Sea' },

  // ── SEAFOOD ───────────────────────────────────────────────────────────────
  { id: 'sf1',  name: 'Squid — Grilled',      description: '300g squid, grilled',                                                                           price: 1300, category: 'seafood', available: true, allergens: 'Molluscs',                      preparation: '15 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf2',  name: 'Squid — Fried',        description: '300g squid, fried',                                                                             price: 1500, category: 'seafood', available: true, allergens: 'Molluscs, gluten (batter)',     preparation: '15 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf3',  name: 'Unpeeled Shrimps',     description: '300g shrimps, grilled with shell on',                                                           price: 900,  category: 'seafood', available: true, allergens: 'Crustaceans',                   preparation: '10–15 min',    origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf4',  name: 'Peeled Shrimps',       description: '300g shrimps — fried, crudo, or tomato sauce & cheese saganaki',                               price: 1100, category: 'seafood', available: true, allergens: 'Crustaceans, dairy (saganaki option)', preparation: '10–15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf5',  name: 'Cuttlefish',           description: '300g cuttlefish — grilled, fried, or ouzo flambéed',                                            price: 1200, category: 'seafood', available: true, allergens: 'Molluscs',                      preparation: '15 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf6',  name: 'Prawns',               description: 'Per 100g — grilled, crudo, or tomato sauce & cheese saganaki',                                 price: 700,  category: 'seafood', available: true, allergens: 'Crustaceans, dairy (saganaki option)', preparation: '10–15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf7',  name: 'Octopus',              description: '300g octopus — grilled or marinated',                                                           price: 1600, category: 'seafood', available: true, allergens: 'Molluscs',                      preparation: '20–25 min',    origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf8',  name: 'Anchovies',            description: 'Marinated anchovies with vinegar, parsley & garlic',                                            price: 600,  category: 'seafood', available: true, allergens: 'Fish',                          preparation: 'Ready to serve', origin: 'Wild-caught, Ionian Sea, marinated in-house' },
  { id: 'sf9',  name: 'Mix Seafood',          description: '600g mix — prawns, squid, cuttlefish, octopus. Grilled, fried, or served cold',                price: 2700, category: 'seafood', available: true, allergens: 'Crustaceans, molluscs',         preparation: '20–25 min',    origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf10', name: 'Mussels',              description: '1kg mussels — steamed or fried',                                                                price: 700,  category: 'seafood', available: true, allergens: 'Molluscs',                      preparation: '15 min',       origin: 'Seasonal, Ionian coast' },
  { id: 'sf11', name: 'Oysters',              description: 'Per 100g, freshly served',                                                                      price: 300,  category: 'seafood', available: true, allergens: 'Molluscs',                      preparation: 'Ready to serve', origin: 'Seasonal, Ionian coast' },
  { id: 'sf12', name: 'Lobster',              description: 'Per 100g — available with linguine',                                                            price: 1200, category: 'seafood', available: true, allergens: 'Crustaceans, gluten (linguine option)', preparation: '20–30 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf13', name: 'Cicala Greca',         description: 'Per 100g — available with linguine',                                                            price: 1200, category: 'seafood', available: true, allergens: 'Crustaceans, gluten (linguine option)', preparation: '20–30 min', origin: 'Wild-caught, Ionian Sea' },

  // ── FISH ──────────────────────────────────────────────────────────────────
  { id: 'f1',  name: 'Codfish',               description: '300g wild-caught codfish, fried',                                                               price: 1200, category: 'fish', available: true, allergens: 'Fish, gluten (batter)',          preparation: '15–20 min',    origin: 'Wild-caught, Ionian Sea' },
  { id: 'f2',  name: 'Red Mullet',            description: '300g wild-caught red mullet, fried',                                                            price: 1200, category: 'fish', available: true, allergens: 'Fish, gluten (batter)',          preparation: '15–20 min',    origin: 'Wild-caught, Ionian Sea' },
  { id: 'f3',  name: 'Striped Red Mullet',    description: 'Per 100g — grilled or fried',                                                                   price: 450,  category: 'fish', available: true, allergens: 'Fish',                          preparation: '15 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'f4',  name: 'Tonguefish',            description: 'Per 100g — grilled, fried, or with wine & lemon reduction',                                    price: 450,  category: 'fish', available: true, allergens: 'Fish',                          preparation: '15 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'f5',  name: 'White Sea Bream',       description: 'Per 100g — grilled or fried',                                                                   price: 700,  category: 'fish', available: true, allergens: 'Fish',                          preparation: '20 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'f6',  name: 'Gilthead',              description: 'Per 100g — grilled, carpaccio, or vegetable casserole',                                         price: 700,  category: 'fish', available: true, allergens: 'Fish',                          preparation: '20 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'f7',  name: 'Seabass',               description: 'Per 100g — grilled, carpaccio, or vegetable casserole',                                         price: 500,  category: 'fish', available: true, allergens: 'Fish',                          preparation: '20 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'f8',  name: 'Sea Bream',             description: 'Per 100g — grilled or vegetable casserole',                                                     price: 800,  category: 'fish', available: true, allergens: 'Fish',                          preparation: '20 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'f9',  name: 'Common Dentex',         description: 'Per 100g — grilled or vegetable casserole',                                                     price: 800,  category: 'fish', available: true, allergens: 'Fish',                          preparation: '20 min',       origin: 'Wild-caught, Ionian Sea' },
  { id: 'f10', name: 'Dusky Grouper',         description: 'Wild-caught — grilled or vegetable casserole',                                                  price: 600,  category: 'fish', available: true, allergens: 'Fish',                          preparation: '20–25 min',    origin: 'Wild-caught, Ionian Sea' },
  { id: 'f11', name: 'John Dory',             description: 'Wild-caught — grilled or vegetable casserole',                                                  price: 450,  category: 'fish', available: true, allergens: 'Fish',                          preparation: '20 min',       origin: 'Wild-caught, Ionian Sea' },

  // ── DESSERTS ─────────────────────────────────────────────────────────────
  { id: 'd1',  name: 'Orange Cake',           description: 'Traditional portokalopita — moist Greek orange cake',                                           price: 300, category: 'desserts', available: true, allergens: 'Gluten, eggs',                  preparation: 'Ready to serve', origin: 'House-made daily' },
  { id: 'd2',  name: 'Cheesecake',            description: 'Creamy house-made cheesecake',                                                                  price: 300, category: 'desserts', available: true, allergens: 'Gluten, dairy, eggs',           preparation: 'Ready to serve', origin: 'House-made daily' },
  { id: 'd3',  name: 'Caramel Cream',         description: 'Classic crème caramel, silky smooth',                                                           price: 300, category: 'desserts', available: true, allergens: 'Dairy, eggs',                   preparation: 'Ready to serve', origin: 'House-made daily' },
  { id: 'd4',  name: 'Revani',                description: 'Traditional semolina syrup cake',                                                               price: 300, category: 'desserts', available: true, allergens: 'Gluten, eggs',                  preparation: 'Ready to serve', origin: 'House-made daily' },

  // ── DRINKS — SOFT DRINKS ─────────────────────────────────────────────────
  { id: 'dr1',  name: 'Natural Water 0.75L',  description: 'Still mineral water',                                                                           price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Albania' },
  { id: 'dr2',  name: 'Sparkling Water 0.75L',description: 'Sparkling mineral water',                                                                       price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Albania' },
  { id: 'dr3',  name: 'Sprite',               description: 'Lemon-lime sparkling soft drink',                                                               price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr4',  name: 'Coca-Cola',            description: 'Classic Coca-Cola or Coca-Cola Zero',                                                           price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr5',  name: 'Fanta',                description: 'Orange or Exotic flavour',                                                                      price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr6',  name: 'Soda',                 description: 'Lemon soda',                                                                                    price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr7',  name: 'Bravo Juice',          description: 'Red grape, strawberry & banana blend',                                                          price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr8',  name: 'Tonic (Britvic)',       description: 'Premium tonic water',                                                                          price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Britvic, UK' },
  // ── DRINKS — COCKTAILS (NON-ALCOHOLIC) ──────────────────────────────────
  { id: 'dr9',  name: 'Lemon Soda',           description: 'Non-alcoholic — fresh lemon juice, soda, sugar, ice',                                           price: 400, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr10', name: 'Orange Fizz',          description: 'Non-alcoholic — fresh orange juice, soda, ice',                                                 price: 400, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr11', name: 'Berry Spark',          description: 'Non-alcoholic — lemon juice, grenadine, soda, ice',                                             price: 400, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  // ── DRINKS — COCKTAILS (ALCOHOLIC) ──────────────────────────────────────
  { id: 'dr12', name: 'Sunset Glow',          description: 'Aperol, Prosecco, soda water, ice, orange slice',                                               price: 700, category: 'drinks', available: true, allergens: 'Sulphites (Prosecco)', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr13', name: 'Seaside Tonic',        description: 'Gin, tonic water, ice, lime wedge',                                                             price: 700, category: 'drinks', available: true, allergens: 'None',                preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr14', name: 'Lemon Grove',          description: 'Gin, fresh lemon juice, ice',                                                                   price: 700, category: 'drinks', available: true, allergens: 'None',                preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr15', name: 'Mimosa',               description: 'Prosecco, fresh orange juice, ice',                                                             price: 700, category: 'drinks', available: true, allergens: 'Sulphites (Prosecco)', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr16', name: 'Sunny Lemon',          description: 'Vodka, fresh lemon juice, ice',                                                                 price: 700, category: 'drinks', available: true, allergens: 'None',                preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr17', name: 'Vodka Redbull',        description: 'Vodka, Redbull, orange slice, ice',                                                             price: 700, category: 'drinks', available: true, allergens: 'None',                preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr18', name: "Planter's Punch",      description: 'Rum, orange juice, grenadine, pineapple juice, lime wedge, ice',                               price: 700, category: 'drinks', available: true, allergens: 'None',                preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr19', name: 'Cuba Libre',           description: 'Rum, Coca-Cola, lime wedge, ice',                                                               price: 700, category: 'drinks', available: true, allergens: 'None',                preparation: '3–5 min', origin: 'House-made' },
  // ── DRINKS — BEERS ───────────────────────────────────────────────────────
  { id: 'dr20', name: 'Korça 0.33L',          description: 'Albanian lager beer',                                                                           price: 200, category: 'drinks', available: true, allergens: 'Gluten (barley)', preparation: 'Ready to serve', origin: 'Korça Brewery, Albania' },
  { id: 'dr21', name: 'Korça 0.5L',           description: 'Albanian lager beer',                                                                           price: 300, category: 'drinks', available: true, allergens: 'Gluten (barley)', preparation: 'Ready to serve', origin: 'Korça Brewery, Albania' },
  { id: 'dr22', name: 'Hofbräu 0.5L',         description: 'German premium lager',                                                                          price: 600, category: 'drinks', available: true, allergens: 'Gluten (barley)', preparation: 'Ready to serve', origin: 'Hofbräuhaus, Munich, Germany' },
  { id: 'dr23', name: 'Paulaner 0.5L',        description: 'German wheat beer',                                                                             price: 400, category: 'drinks', available: true, allergens: 'Gluten (wheat, barley)', preparation: 'Ready to serve', origin: 'Paulaner Brewery, Munich, Germany' },
  { id: 'dr24', name: 'Paulaner 0% 0.5L',     description: 'Non-alcoholic German wheat beer',                                                               price: 400, category: 'drinks', available: true, allergens: 'Gluten (wheat, barley)', preparation: 'Ready to serve', origin: 'Paulaner Brewery, Munich, Germany' },
  { id: 'dr25', name: 'Budweiser 0.33L',      description: 'American lager',                                                                                price: 400, category: 'drinks', available: true, allergens: 'Gluten (barley)', preparation: 'Ready to serve', origin: 'Anheuser-Busch, USA' },
  // ── DRINKS — WINE ────────────────────────────────────────────────────────
  { id: 'dr26', name: 'House Red Wine 1L',    description: 'House red wine — 1 litre carafe',                                                               price: 1200, category: 'drinks', available: true, allergens: 'Sulphites', preparation: 'Ready to serve', origin: 'Albanian house wine' },
  { id: 'dr27', name: 'House White Wine 1L',  description: 'House white wine — 1 litre carafe',                                                             price: 1200, category: 'drinks', available: true, allergens: 'Sulphites', preparation: 'Ready to serve', origin: 'Albanian house wine' },
  // ── DRINKS — DIGESTIFS ───────────────────────────────────────────────────
  { id: 'dr28', name: 'Grape Raki',           description: 'Albanian grape raki digestif',                                                                  price: 100, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Traditional Albanian spirit' },
  { id: 'dr29', name: 'Ouzo',                 description: 'Greek anise-flavoured spirit',                                                                  price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Greece' },
  { id: 'dr30', name: 'Vodka',                description: 'Premium vodka, served straight',                                                                price: 400, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Imported' },
];

const CATEGORY_CONFIG: Record<string, { label: string; emoji: string }> = {
  starters: { label: 'Starters', emoji: '🥗' },
  mains: { label: 'Mains', emoji: '🍝' },
  seafood: { label: 'Seafood', emoji: '🦐' },
  fish: { label: 'Fish', emoji: '🐟' },
  drinks: { label: 'Drinks', emoji: '🍷' },
  desserts: { label: 'Desserts', emoji: '🍮' },
};


export default function Menu() {
  const menuItems: MenuItem[] = DUMMY_MENU;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = ['starters', 'mains', 'seafood', 'fish', 'drinks', 'desserts'] as const;

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
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${activeCategory === 'all'
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
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${activeCategory === category
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
                    onClick={() => setSelectedItem(item)}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#c9972c]/20 cursor-pointer"
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

      {/* Dish Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dish image */}
            {selectedItem.image_url && (
              <div className="relative h-56 sm:h-64 w-full">
                <img
                  src={selectedItem.image_url}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-[#0d1b2a] text-white px-3 py-1 rounded-full text-sm font-bold">
                  {selectedItem.price.toLocaleString()} ALL
                </span>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-display text-2xl font-bold text-[#0d1b2a]">
                  {selectedItem.name}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-4">{selectedItem.description}</p>

              <div className="space-y-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#0d1b2a]">Allergens:</span>
                  <span>{selectedItem.allergens ?? 'Ask your server.'}</span>
                </div>
                {selectedItem.category !== 'drinks' && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0d1b2a]">Preparation:</span>
                    <span>{selectedItem.preparation ?? 'Made fresh to order.'}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#0d1b2a]">Origin:</span>
                  <span>{selectedItem.origin ?? 'Locally sourced from the Ionian coast, Saranda.'}</span>
                </div>
              </div>

              <a
                href="https://wa.me/+355696215643"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1ebe5d] text-white py-3 rounded-full font-semibold text-sm transition-all"
              >
                Reserve &amp; mention this dish
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
