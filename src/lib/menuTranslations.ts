import type { MenuItem } from '@/types';
import itMenuItems from '@/i18n/menu-items.it.json';
import elMenuItems from '@/i18n/menu-items.el.json';
import itStrings from '@/i18n/menu-strings.it.json';
import elStrings from '@/i18n/menu-strings.el.json';

type ItemTranslation = { name: string; description: string };
type TranslationMap = Record<string, ItemTranslation>;
type StringsMap = { allergens: Record<string, string>; preparation: Record<string, string>; origin: Record<string, string> };

const menuTranslations: Record<string, TranslationMap> = {
  it: itMenuItems as TranslationMap,
  el: elMenuItems as TranslationMap,
};

const menuStrings: Record<string, StringsMap> = {
  it: itStrings as StringsMap,
  el: elStrings as StringsMap,
};

function translateField(value: string | undefined, map: Record<string, string>): string | undefined {
  if (value === undefined) return undefined;
  return map[value] ?? value;
}

export function getLocalizedItem(item: MenuItem, language: string): MenuItem {
  const itemMap = menuTranslations[language];
  const strings = menuStrings[language];

  const localized = { ...item };

  if (itemMap) {
    const t = itemMap[item.id];
    if (t) {
      localized.name = t.name;
      localized.description = t.description;
    }
  }

  if (strings) {
    localized.allergens = translateField(item.allergens, strings.allergens);
    localized.preparation = translateField(item.preparation, strings.preparation);
    localized.origin = translateField(item.origin, strings.origin);
  }

  return localized;
}
