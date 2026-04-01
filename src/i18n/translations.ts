import en from './en.json';
import it from './it.json';
import el from './el.json';

export type Translations = typeof en;
export const translations: Record<'en' | 'it' | 'el', Translations> = {
  en: en as Translations,
  it: it as Translations,
  el: el as Translations,
};
