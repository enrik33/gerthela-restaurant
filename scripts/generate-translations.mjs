#!/usr/bin/env node
/**
 * generate-translations.mjs
 *
 * Uses the DeepL API to auto-translate en.json → it.json and el.json.
 *
 * Usage:
 *   1. Add DEEPL_API_KEY to your .env.local file
 *   2. Run: npm run translate
 *
 * DeepL free tier: https://api-free.deepl.com  (500K chars/month)
 * DeepL paid tier: https://api.deepl.com
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ── Config ───────────────────────────────────────────────────────────────────

// Load DEEPL_API_KEY from .env.local manually (no dotenv dependency needed)
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

function loadEnv() {
  try {
    const raw = readFileSync(join(rootDir, '.env.local'), 'utf-8');
    for (const line of raw.split('\n')) {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    }
  } catch {
    // .env.local not found — rely on actual env vars
  }
}

loadEnv();

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_API_KEY) {
  console.error('DEEPL_API_KEY is not set. Add it to .env.local and try again.');
  process.exit(1);
}

// Use api-free.deepl.com for free-tier keys, api.deepl.com for paid keys
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';

// ── Translation targets ───────────────────────────────────────────────────────

const TARGETS = [
  { lang: 'IT', outFile: 'it.json' },
  { lang: 'EL', outFile: 'el.json' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Recursively collect all string values with their dot-path keys */
function flatten(obj, prefix = '') {
  const entries = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      entries.push({ path, value });
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (typeof item === 'string') entries.push({ path: `${path}[${i}]`, value: item });
      });
    } else if (value && typeof value === 'object') {
      entries.push(...flatten(value, path));
    }
  }
  return entries;
}

/** Set a nested value on an object by dot-path (supports array notation) */
function setPath(obj, path, value) {
  const arrayMatch = path.match(/^(.+)\[(\d+)\]$/);
  if (arrayMatch) {
    const [, arrPath, idx] = arrayMatch;
    const arr = getPath(obj, arrPath) ?? [];
    arr[parseInt(idx)] = value;
    setPath(obj, arrPath, arr);
    return;
  }
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]]) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

/** Call DeepL API to translate an array of strings */
async function translateBatch(texts, targetLang) {
  const res = await fetch(DEEPL_URL, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: texts,
      source_lang: 'EN',
      target_lang: targetLang,
      // Preserve {placeholders} like {page} and {total}
      tag_handling: 'xml',
      ignore_tags: ['x'],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`DeepL API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.translations.map((t) => t.text);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function generate(targetLang, outFile) {
  console.log(`\n Translating to ${targetLang}...`);

  const enPath = join(rootDir, 'src', 'i18n', 'en.json');
  const en = JSON.parse(readFileSync(enPath, 'utf-8'));

  const flat = flatten(en);
  const strings = flat.map((f) => f.value);

  console.log(`   Sending ${strings.length} strings to DeepL...`);
  const translated = await translateBatch(strings, targetLang);

  // Deep-clone the en structure and fill in translated values
  const result = JSON.parse(JSON.stringify(en));
  flat.forEach(({ path }, i) => setPath(result, path, translated[i]));

  const outPath = join(rootDir, 'src', 'i18n', outFile);
  writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n', 'utf-8');
  console.log(`   Written to src/i18n/${outFile}`);
}

for (const { lang, outFile } of TARGETS) {
  await generate(lang, outFile);
}

console.log('\n  All translations generated successfully!');
