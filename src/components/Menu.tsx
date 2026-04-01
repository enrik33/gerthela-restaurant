'use client';

import { useState, useRef, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { MenuItem } from '@/types';
import { useT } from '@/hooks/useTranslations';
import type { Translations } from '@/i18n/translations';
import { useLanguageStore } from '@/store/languageStore';
import { getLocalizedItem } from '@/lib/menuTranslations';

const DUMMY_MENU: MenuItem[] = [
  // ── STARTERS ─────────────────────────────────────────────────────────────
  { id: 's1', name: 'Green Salad', description: 'Green lettuce, onions, olives', price: 300, category: 'starters', available: true, allergens: 'None', preparation: '5 min', origin: 'Local produce, Saranda' },
  { id: 's2', name: 'Country Salad', description: 'Tomatoes, cucumber, pepper, onions, olives, white feta cheese', price: 400, category: 'starters', available: true, allergens: 'Dairy (feta)', preparation: '5 min', origin: 'Local produce, Saranda' },
  { id: 's3', name: 'Arugula Salad', description: 'Arugula, cherry tomato, parmigiano, aceto balsamico', price: 600, category: 'starters', available: true, allergens: 'Dairy (parmigiano)', preparation: '5 min', origin: 'Local & imported Italian ingredients' },
  { id: 's4', name: 'Wild Vegetables', description: 'Seasonal wild greens, lightly prepared', price: 300, category: 'starters', available: true, allergens: 'None', preparation: '10 min', origin: 'Foraged locally, Albanian hills' },
  { id: 's5', name: 'Boiled Vegetables', description: 'Broccoli, cauliflower, carrot, red-beet, potatoes', price: 500, category: 'starters', available: true, allergens: 'None', preparation: '10–15 min', origin: 'Local produce, Saranda' },
  { id: 's6', name: 'Grilled Vegetables', description: 'Zucchini, peppers, eggplants, grated hard cheese, garlic, aceto balsamico', price: 500, category: 'starters', available: true, allergens: 'Dairy (hard cheese)', preparation: '10–15 min', origin: 'Local produce, Saranda' },
  { id: 's7', name: 'Curd', description: 'Fresh curd, house-style', price: 400, category: 'starters', available: true, allergens: 'Dairy', preparation: 'Ready to serve', origin: 'Local dairy, Albania' },
  { id: 's8', name: 'Tyrokafteri', description: 'Spicy feta cheese dip', price: 400, category: 'starters', available: true, allergens: 'Dairy (feta)', preparation: 'Ready to serve', origin: 'House-made, Greek recipe' },
  { id: 's9', name: 'Tzatziki', description: 'Creamy yogurt dip with cucumber and garlic', price: 400, category: 'starters', available: true, allergens: 'Dairy (yogurt)', preparation: 'Ready to serve', origin: 'House-made, Greek recipe' },
  { id: 's10', name: 'Skordalia', description: 'Traditional garlic and potato dip', price: 400, category: 'starters', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'House-made, Greek recipe' },
  { id: 's11', name: 'Marinated Red-Beet', description: 'Tender red beet marinated in-house', price: 400, category: 'starters', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Local produce, marinated in-house' },
  { id: 's12', name: 'Marinated Carrot', description: 'Fresh carrots marinated in-house', price: 400, category: 'starters', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Local produce, marinated in-house' },
  { id: 's13', name: 'White Feta Cheese', description: 'Roasted white feta cheese', price: 400, category: 'starters', available: true, allergens: 'Dairy (feta)', preparation: '10 min', origin: 'Local dairy, Albania' },
  { id: 's14', name: 'Roasted Hard Cheese', description: 'Grilled kaçkavall hard cheese', price: 400, category: 'starters', available: true, allergens: 'Dairy (kaçkavall)', preparation: '10 min', origin: 'Local dairy, Albania' },
  { id: 's15', name: 'Deep Fried Potatoes', description: 'Crispy golden french fries', price: 400, category: 'starters', available: true, allergens: 'None', preparation: '10 min', origin: 'Local produce, Saranda' },
  // ── MAINS ─────────────────────────────────────────────────────────────────
  { id: 'm1', name: 'Fish Soup', description: 'Dusky grouper, John Dory, sea capon, sorkopjo, potatoes, carrots', price: 500, category: 'mains', available: true, allergens: 'Fish', preparation: '20–25 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'm2', name: 'Shrimp Linguine', description: 'Linguine with deep sea shrimp, fresh tomato sauce, parsley', price: 1100, category: 'mains', available: true, allergens: 'Gluten (pasta), crustaceans', preparation: '15–20 min', origin: 'Wild-caught shrimp, Ionian Sea' },
  { id: 'm3', name: 'Shrimp & Squid Linguine', description: 'Linguine with deep sea shrimp, squid, fresh tomato sauce, parsley', price: 1200, category: 'mains', available: true, allergens: 'Gluten (pasta), crustaceans, molluscs', preparation: '15–20 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'm4', name: 'Crab Linguine', description: 'Linguine with crab, fresh tomato sauce, parsley', price: 1300, category: 'mains', available: true, allergens: 'Gluten (pasta), crustaceans', preparation: '15–20 min', origin: 'Wild-caught crab, Ionian Sea' },
  { id: 'm5', name: 'Prawn Linguine', description: 'Linguine with prawns, fresh tomato sauce, parsley', price: 1500, category: 'mains', available: true, allergens: 'Gluten (pasta), crustaceans', preparation: '15–20 min', origin: 'Wild-caught prawns, Ionian Sea' },
  // ── SEAFOOD ───────────────────────────────────────────────────────────────
  { id: 'sf1', name: 'Squid — Grilled', description: '300g squid, grilled', price: 1300, category: 'seafood', available: true, allergens: 'Molluscs', preparation: '15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf2', name: 'Squid — Fried', description: '300g squid, fried', price: 1500, category: 'seafood', available: true, allergens: 'Molluscs, gluten (batter)', preparation: '15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf3', name: 'Unpeeled Shrimps', description: '300g shrimps, grilled with shell on', price: 900, category: 'seafood', available: true, allergens: 'Crustaceans', preparation: '10–15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf4', name: 'Peeled Shrimps', description: '300g shrimps — fried, crudo, or tomato sauce & cheese saganaki', price: 1100, category: 'seafood', available: true, allergens: 'Crustaceans, dairy (saganaki option)', preparation: '10–15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf5', name: 'Cuttlefish', description: '300g cuttlefish — grilled, fried, or ouzo flambéed', price: 1200, category: 'seafood', available: true, allergens: 'Molluscs', preparation: '15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf6', name: 'Prawns', description: 'Per 100g — grilled, crudo, or tomato sauce & cheese saganaki', price: 700, category: 'seafood', available: true, allergens: 'Crustaceans, dairy (saganaki option)', preparation: '10–15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf7', name: 'Octopus', description: '300g octopus — grilled or marinated', price: 1600, category: 'seafood', available: true, allergens: 'Molluscs', preparation: '20–25 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf8', name: 'Anchovies', description: 'Marinated anchovies with vinegar, parsley & garlic', price: 600, category: 'seafood', available: true, allergens: 'Fish', preparation: 'Ready to serve', origin: 'Wild-caught, Ionian Sea, marinated in-house' },
  { id: 'sf9', name: 'Mix Seafood', description: '600g mix — prawns, squid, cuttlefish, octopus. Grilled, fried, or served cold', price: 2700, category: 'seafood', available: true, allergens: 'Crustaceans, molluscs', preparation: '20–25 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf10', name: 'Mussels', description: '1kg mussels — steamed or fried', price: 700, category: 'seafood', available: true, allergens: 'Molluscs', preparation: '15 min', origin: 'Seasonal, Ionian coast' },
  { id: 'sf11', name: 'Oysters', description: 'Per 100g, freshly served', price: 300, category: 'seafood', available: true, allergens: 'Molluscs', preparation: 'Ready to serve', origin: 'Seasonal, Ionian coast' },
  { id: 'sf12', name: 'Lobster', description: 'Per 100g — available with linguine', price: 1200, category: 'seafood', available: true, allergens: 'Crustaceans, gluten (linguine option)', preparation: '20–30 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'sf13', name: 'Cicala Greca', description: 'Per 100g — available with linguine', price: 1200, category: 'seafood', available: true, allergens: 'Crustaceans, gluten (linguine option)', preparation: '20–30 min', origin: 'Wild-caught, Ionian Sea' },
  // ── FISH ──────────────────────────────────────────────────────────────────
  { id: 'f1', name: 'Codfish', description: '300g wild-caught codfish, fried', price: 1200, category: 'fish', available: true, allergens: 'Fish, gluten (batter)', preparation: '15–20 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f2', name: 'Red Mullet', description: '300g wild-caught red mullet, fried', price: 1200, category: 'fish', available: true, allergens: 'Fish, gluten (batter)', preparation: '15–20 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f3', name: 'Striped Red Mullet', description: 'Per 100g — grilled or fried', price: 450, category: 'fish', available: true, allergens: 'Fish', preparation: '15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f4', name: 'Tonguefish', description: 'Per 100g — grilled, fried, or with wine & lemon reduction', price: 450, category: 'fish', available: true, allergens: 'Fish', preparation: '15 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f5', name: 'White Sea Bream', description: 'Per 100g — grilled or fried', price: 700, category: 'fish', available: true, allergens: 'Fish', preparation: '20 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f6', name: 'Gilthead', description: 'Per 100g — grilled, carpaccio, or vegetable casserole', price: 700, category: 'fish', available: true, allergens: 'Fish', preparation: '20 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f7', name: 'Seabass', description: 'Per 100g — grilled, carpaccio, or vegetable casserole', price: 500, category: 'fish', available: true, allergens: 'Fish', preparation: '20 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f8', name: 'Sea Bream', description: 'Per 100g — grilled or vegetable casserole', price: 800, category: 'fish', available: true, allergens: 'Fish', preparation: '20 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f9', name: 'Common Dentex', description: 'Per 100g — grilled or vegetable casserole', price: 800, category: 'fish', available: true, allergens: 'Fish', preparation: '20 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f10', name: 'Dusky Grouper', description: 'Wild-caught — grilled or vegetable casserole', price: 600, category: 'fish', available: true, allergens: 'Fish', preparation: '20–25 min', origin: 'Wild-caught, Ionian Sea' },
  { id: 'f11', name: 'John Dory', description: 'Wild-caught — grilled or vegetable casserole', price: 450, category: 'fish', available: true, allergens: 'Fish', preparation: '20 min', origin: 'Wild-caught, Ionian Sea' },
  // ── DESSERTS ─────────────────────────────────────────────────────────────
  { id: 'd1', name: 'Orange Cake', description: 'Traditional portokalopita — moist Greek orange cake', price: 300, category: 'desserts', available: true, allergens: 'Gluten, eggs', preparation: 'Ready to serve', origin: 'House-made daily' },
  { id: 'd2', name: 'Cheesecake', description: 'Creamy house-made cheesecake', price: 300, category: 'desserts', available: true, allergens: 'Gluten, dairy, eggs', preparation: 'Ready to serve', origin: 'House-made daily' },
  { id: 'd3', name: 'Caramel Cream', description: 'Classic crème caramel, silky smooth', price: 300, category: 'desserts', available: true, allergens: 'Dairy, eggs', preparation: 'Ready to serve', origin: 'House-made daily' },
  { id: 'd4', name: 'Revani', description: 'Traditional semolina syrup cake', price: 300, category: 'desserts', available: true, allergens: 'Gluten, eggs', preparation: 'Ready to serve', origin: 'House-made daily' },
  // ── DRINKS ───────────────────────────────────────────────────────────────
  { id: 'dr1', name: 'Natural Water 0.75L', description: 'Still mineral water', price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Albania' },
  { id: 'dr2', name: 'Sparkling Water 0.75L', description: 'Sparkling mineral water', price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Albania' },
  { id: 'dr3', name: 'Sprite', description: 'Lemon-lime sparkling soft drink', price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr4', name: 'Coca-Cola', description: 'Classic Coca-Cola or Coca-Cola Zero', price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr5', name: 'Fanta', description: 'Orange or Exotic flavour', price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr6', name: 'Soda', description: 'Lemon soda', price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr7', name: 'Bravo Juice', description: 'Red grape, strawberry & banana blend', price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Bottled' },
  { id: 'dr8', name: 'Tonic (Britvic)', description: 'Premium tonic water', price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Britvic, UK' },
  { id: 'dr9', name: 'Lemon Soda', description: 'Non-alcoholic — fresh lemon juice, soda, sugar, ice', price: 400, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr10', name: 'Orange Fizz', description: 'Non-alcoholic — fresh orange juice, soda, ice', price: 400, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr11', name: 'Berry Spark', description: 'Non-alcoholic — lemon juice, grenadine, soda, ice', price: 400, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr12', name: 'Sunset Glow', description: 'Aperol, Prosecco, soda water, ice, orange slice', price: 700, category: 'drinks', available: true, allergens: 'Sulphites (Prosecco)', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr13', name: 'Seaside Tonic', description: 'Gin, tonic water, ice, lime wedge', price: 700, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr14', name: 'Lemon Grove', description: 'Gin, fresh lemon juice, ice', price: 700, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr15', name: 'Mimosa', description: 'Prosecco, fresh orange juice, ice', price: 700, category: 'drinks', available: true, allergens: 'Sulphites (Prosecco)', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr16', name: 'Sunny Lemon', description: 'Vodka, fresh lemon juice, ice', price: 700, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr17', name: 'Vodka Redbull', description: 'Vodka, Redbull, orange slice, ice', price: 700, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr18', name: "Planter's Punch", description: 'Rum, orange juice, grenadine, pineapple juice, lime wedge, ice', price: 700, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr19', name: 'Cuba Libre', description: 'Rum, Coca-Cola, lime wedge, ice', price: 700, category: 'drinks', available: true, allergens: 'None', preparation: '3–5 min', origin: 'House-made' },
  { id: 'dr20', name: 'Korça 0.33L', description: 'Albanian lager beer', price: 200, category: 'drinks', available: true, allergens: 'Gluten (barley)', preparation: 'Ready to serve', origin: 'Korça Brewery, Albania' },
  { id: 'dr21', name: 'Korça 0.5L', description: 'Albanian lager beer', price: 300, category: 'drinks', available: true, allergens: 'Gluten (barley)', preparation: 'Ready to serve', origin: 'Korça Brewery, Albania' },
  { id: 'dr22', name: 'Hofbräu 0.5L', description: 'German premium lager', price: 600, category: 'drinks', available: true, allergens: 'Gluten (barley)', preparation: 'Ready to serve', origin: 'Hofbräuhaus, Munich, Germany' },
  { id: 'dr23', name: 'Paulaner 0.5L', description: 'German wheat beer', price: 400, category: 'drinks', available: true, allergens: 'Gluten (wheat, barley)', preparation: 'Ready to serve', origin: 'Paulaner Brewery, Munich, Germany' },
  { id: 'dr24', name: 'Paulaner 0% 0.5L', description: 'Non-alcoholic German wheat beer', price: 400, category: 'drinks', available: true, allergens: 'Gluten (wheat, barley)', preparation: 'Ready to serve', origin: 'Paulaner Brewery, Munich, Germany' },
  { id: 'dr25', name: 'Budweiser 0.33L', description: 'American lager', price: 400, category: 'drinks', available: true, allergens: 'Gluten (barley)', preparation: 'Ready to serve', origin: 'Anheuser-Busch, USA' },
  { id: 'dr26', name: 'House Red Wine 1L', description: 'House red wine — 1 litre carafe', price: 1200, category: 'drinks', available: true, allergens: 'Sulphites', preparation: 'Ready to serve', origin: 'Albanian house wine' },
  { id: 'dr27', name: 'House White Wine 1L', description: 'House white wine — 1 litre carafe', price: 1200, category: 'drinks', available: true, allergens: 'Sulphites', preparation: 'Ready to serve', origin: 'Albanian house wine' },
  { id: 'dr28', name: 'Grape Raki', description: 'Albanian grape raki digestif', price: 100, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Traditional Albanian spirit' },
  { id: 'dr29', name: 'Ouzo', description: 'Greek anise-flavoured spirit', price: 200, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Greece' },
  { id: 'dr30', name: 'Vodka', description: 'Premium vodka, served straight', price: 400, category: 'drinks', available: true, allergens: 'None', preparation: 'Ready to serve', origin: 'Imported' },
];

const CATEGORY_META_STATIC: Record<string, { emoji: string; accent: string }> = {
  starters: { emoji: '🥗', accent: '#4a7c59' },
  mains: { emoji: '🍝', accent: '#8b4513' },
  seafood: { emoji: '🦐', accent: '#1a5276' },
  fish: { emoji: '🐟', accent: '#117a65' },
  desserts: { emoji: '🍮', accent: '#7d3c98' },
  drinks: { emoji: '🍷', accent: '#922b21' },
};

function getCategoryMeta(t: Translations): Record<string, { label: string; emoji: string; accent: string; subtitle: string; description: string }> {
  return {
    starters: { ...CATEGORY_META_STATIC.starters, ...t.menu.categories.starters },
    mains: { ...CATEGORY_META_STATIC.mains, ...t.menu.categories.mains },
    seafood: { ...CATEGORY_META_STATIC.seafood, ...t.menu.categories.seafood },
    fish: { ...CATEGORY_META_STATIC.fish, ...t.menu.categories.fish },
    desserts: { ...CATEGORY_META_STATIC.desserts, ...t.menu.categories.desserts },
    drinks: { ...CATEGORY_META_STATIC.drinks, ...t.menu.categories.drinks },
  };
}

const ITEMS_PER_PAGE = 10;

type BookPage = {
  id: string;
  category: string;
  items: MenuItem[];
  pageNum: number;
  totalForCategory: number;
};

function buildPages(items: MenuItem[]): BookPage[] {
  const order = ['starters', 'mains', 'seafood', 'fish', 'desserts', 'drinks'];
  const pages: BookPage[] = [];
  for (const category of order) {
    const catItems = items.filter((i) => i.available && i.category === category);
    if (!catItems.length) continue;
    const numPages = Math.ceil(catItems.length / ITEMS_PER_PAGE);
    for (let p = 0; p < numPages; p++) {
      pages.push({
        id: `${category}-${p}`,
        category,
        items: catItems.slice(p * ITEMS_PER_PAGE, (p + 1) * ITEMS_PER_PAGE),
        pageNum: p + 1,
        totalForCategory: numPages,
      });
    }
  }
  return pages;
}

const PAGES = buildPages(DUMMY_MENU);

export default function Menu() {
  const t = useT();
  const language = useLanguageStore((s) => s.language);
  const CATEGORY_META = useMemo(() => getCategoryMeta(t), [t]);
  const [pageIndex, setPageIndex] = useState(0);
  const [flipDir, setFlipDir] = useState<'forward' | 'backward'>('forward');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const touchStartX = useRef<number | null>(null);

  const navigateTo = (target: number, dir: 'forward' | 'backward') => {
    if (target < 0 || target >= PAGES.length || target === pageIndex) return;
    setFlipDir(dir);
    setPageIndex(target);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0
        ? navigateTo(pageIndex + 1, 'forward')
        : navigateTo(pageIndex - 1, 'backward');
    }
    touchStartX.current = null;
  };

  const page = PAGES[pageIndex];
  const meta = CATEGORY_META[page.category];

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#f8f4ed]">
      <style>{`
        @keyframes flipInForward {
          from {
            transform: perspective(1400px) rotateY(12deg) translateX(24px);
            opacity: 0;
            box-shadow: -16px 0 32px rgba(0,0,0,0.18);
          }
          to {
            transform: perspective(1400px) rotateY(0deg) translateX(0);
            opacity: 1;
            box-shadow: none;
          }
        }
        @keyframes flipInBackward {
          from {
            transform: perspective(1400px) rotateY(-12deg) translateX(-24px);
            opacity: 0;
            box-shadow: 16px 0 32px rgba(0,0,0,0.18);
          }
          to {
            transform: perspective(1400px) rotateY(0deg) translateX(0);
            opacity: 1;
            box-shadow: none;
          }
        }
        .flip-in-forward  { animation: flipInForward  0.45s cubic-bezier(0.22,0.61,0.36,1) both; }
        .flip-in-backward { animation: flipInBackward 0.45s cubic-bezier(0.22,0.61,0.36,1) both; }
        .menu-dotline {
          flex: 1;
          border-bottom: 1px dotted #c9a96e;
          margin: 0 6px 3px;
          min-width: 16px;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
            {t.menu.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0d1b2a] mb-4">
            {t.menu.title}
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            {t.menu.subtitle}
          </p>
        </div>

        {/* Category jump tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {Object.entries(CATEGORY_META).map(([cat, catMeta]) => {
            const firstIdx = PAGES.findIndex((p) => p.category === cat);
            const isActive = page.category === cat;
            return (
              <button
                key={cat}
                onClick={() => navigateTo(firstIdx, firstIdx > pageIndex ? 'forward' : 'backward')}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border"
                style={
                  isActive
                    ? { backgroundColor: catMeta.accent, borderColor: catMeta.accent, color: '#fff' }
                    : { backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#4b5563' }
                }
              >
                {catMeta.emoji} {catMeta.label}
              </button>
            );
          })}
        </div>

        {/* ── Book ─────────────────────────────────────────────────────────── */}
        {/* Side-arrow + book row */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* LEFT arrow */}
          <button
            onClick={() => navigateTo(pageIndex - 1, 'backward')}
            disabled={pageIndex === 0}
            aria-label="Previous page"
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-500 hover:enabled:border-[#c9972c] hover:enabled:text-[#c9972c] shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Book */}
          <div className="relative flex-1" style={{ perspective: '2000px' }}>
            {/* Subtle drop-shadow behind the book */}
            <div
              className="absolute inset-x-4 bottom-0 h-8 rounded-b-2xl blur-md"
              style={{ background: 'rgba(0,0,0,0.15)', transform: 'translateY(6px)' }}
            />

            {/* Animated page */}
            <div
              key={page.id}
              className={flipDir === 'forward' ? 'flip-in-forward' : 'flip-in-backward'}
              style={{ transformOrigin: flipDir === 'forward' ? 'left center' : 'right center' }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-xl border"
                style={{
                  background: '#fdf8f0',
                  borderColor: '#d4b896',
                  minHeight: '520px',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">

                  {/* LEFT PAGE — category identity */}
                  <div
                    className="relative flex flex-col justify-between p-8 md:p-10 border-b md:border-b-0 md:border-r"
                    style={{
                      borderColor: '#d4b896',
                      background: `linear-gradient(150deg, ${meta.accent}18 0%, ${meta.accent}08 100%)`,
                    }}
                  >
                    {/* Top rule */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex-1 h-px" style={{ background: meta.accent, opacity: 0.35 }} />
                      <span className="text-base" style={{ color: meta.accent }}>✦</span>
                      <div className="flex-1 h-px" style={{ background: meta.accent, opacity: 0.35 }} />
                    </div>

                    <div className="flex-1">
                      <div className="text-5xl mb-5">{meta.emoji}</div>
                      <h3
                        className="font-display text-3xl md:text-4xl font-bold mb-1 leading-tight"
                        style={{ color: meta.accent }}
                      >
                        {meta.label}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                        {meta.subtitle}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed italic">
                        {meta.description}
                      </p>

                      {page.totalForCategory > 1 && (
                        <span
                          className="inline-block mt-5 text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ background: `${meta.accent}20`, color: meta.accent }}
                        >
                          {t.menu.partOf.replace('{page}', String(page.pageNum)).replace('{total}', String(page.totalForCategory))}
                        </span>
                      )}
                    </div>

                    {/* Bottom rule */}
                    <div className="flex items-center gap-2 mt-6">
                      <div className="flex-1 h-px" style={{ background: meta.accent, opacity: 0.35 }} />
                      <span className="text-xs" style={{ color: meta.accent }}>◆</span>
                      <div className="flex-1 h-px" style={{ background: meta.accent, opacity: 0.35 }} />
                    </div>

                    {/* Spine shadow (desktop only) */}
                    <div
                      className="absolute top-0 right-0 bottom-0 w-3 hidden md:block pointer-events-none"
                      style={{
                        background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))',
                      }}
                    />
                  </div>

                  {/* RIGHT PAGE — item list */}
                  <div className="flex flex-col p-8 md:p-10">

                    {/* Subtle page lines */}
                    <div
                      className="absolute inset-0 pointer-events-none hidden md:block"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e8dcc820 31px, #e8dcc820 32px)',
                        backgroundPositionY: '16px',
                        borderRadius: '0 1rem 1rem 0',
                      }}
                    />

                    <div className="relative flex-1 space-y-4">
                      {page.items.map((item) => {
                        const localItem = getLocalizedItem(item, language);
                        return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className="group cursor-pointer"
                        >
                          <div className="flex items-baseline">
                            <span className="text-sm font-semibold text-[#0d1b2a] group-hover:text-[#c9972c] transition-colors leading-snug">
                              {localItem.name}
                            </span>
                            <span className="menu-dotline" />
                            <span className="text-sm font-bold text-[#0d1b2a] whitespace-nowrap tabular-nums">
                              {item.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5 leading-tight line-clamp-1 pl-0.5">
                            {localItem.description}
                          </p>
                        </div>
                        );
                      })}
                    </div>

                    <p className="relative text-[10px] text-gray-400 text-right mt-6 italic">
                      {t.menu.pricesNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Dot indicators ───────────────────────────────────────────── */}
            <div className="flex gap-1.5 items-center justify-center flex-wrap mt-5 pb-1">
              {PAGES.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => navigateTo(i, i > pageIndex ? 'forward' : 'backward')}
                  aria-label={`Page ${i + 1}`}
                  className="rounded-full transition-all duration-300 flex-shrink-0"
                  style={{
                    width: i === pageIndex ? 18 : 6,
                    height: 6,
                    background: i === pageIndex ? meta.accent : '#d1d5db',
                  }}
                />
              ))}
            </div>
          </div>
          {/* End Book */}

          {/* RIGHT arrow */}
          <button
            onClick={() => navigateTo(pageIndex + 1, 'forward')}
            disabled={pageIndex === PAGES.length - 1}
            aria-label="Next page"
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-500 hover:enabled:border-[#c9972c] hover:enabled:text-[#c9972c] shadow-sm"
          >
            <ChevronRight size={20} />
          </button>

        </div>
        {/* End side-arrow + book row */}
      </div>

      {/* ── Dish Detail Modal ─────────────────────────────────────────────── */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const localSelected = getLocalizedItem(selectedItem, language);
              return (
                <>
                  {selectedItem.image_url && (
                    <div className="relative h-56 sm:h-64 w-full">
                      <img
                        src={selectedItem.image_url}
                        alt={localSelected.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-4 left-4 bg-[#0d1b2a] text-white px-3 py-1 rounded-full text-sm font-bold">
                        {selectedItem.price.toLocaleString()} ALL
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-display text-2xl font-bold text-[#0d1b2a]">
                        {localSelected.name}
                      </h3>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                        aria-label="Close"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{localSelected.description}</p>
                    <div className="space-y-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-[#0d1b2a] shrink-0">{t.menu.allergens}</span>
                        <span>{localSelected.allergens ?? t.menu.askServer}</span>
                      </div>
                      {selectedItem.category !== 'drinks' && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-[#0d1b2a] shrink-0">{t.menu.preparation}</span>
                          <span>{localSelected.preparation ?? t.menu.madeToOrder}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-[#0d1b2a] shrink-0">{t.menu.origin}</span>
                        <span>{localSelected.origin ?? t.menu.locallySourced}</span>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/+355686660000?text=${encodeURIComponent(`Hi! I'd like to make a reservation and mention the dish: ${localSelected.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1ebe5d] text-white py-3 rounded-full font-semibold text-sm transition-all"
                    >
                      {t.menu.reserve}
                    </a>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
