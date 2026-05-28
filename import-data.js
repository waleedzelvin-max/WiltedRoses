import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Simple helper to load environment variables from .env if present
try {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        // Remove surrounding quotes if they exist
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value;
      }
    });
  }
} catch (e) {
  console.log("Could not read local .env file. Using system environment variables.");
}

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = "skqCSe7FW8kgSNDjBNWHH9tW4YVwLukTjwSbrhVna4qFyY2rDWqComL5LwR4IA9tjDlKvSs1M8qhupUoLhJIMHZyI59Vn4dCwHatAYLdbftxW6AUJ5bMmvPuwaW3s1Ra2OGZltQzLajxnytOoCMfKXKbJ7IfbaSMFTxCALHwsQOQa9cxPmbV";

if (!projectId) {
  console.error("Error: VITE_SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID environment variable is missing.");
  process.exit(1);
}

if (!token) {
  console.error("Error: SANITY_WRITE_TOKEN environment variable is missing.");
  console.log("\nTo find or create a write token:");
  console.log("1. Go to https://manage.sanity.io");
  console.log("2. Select your project and navigate to the 'API' tab.");
  console.log("3. Click 'Add API token', give it a name, select 'Editor' (Write) permissions, and save.");
  console.log("\nUsage:");
  console.log("On PowerShell: $env:SANITY_WRITE_TOKEN=\"your_token\"; node import-data.js");
  console.log("On cmd: set SANITY_WRITE_TOKEN=your_token && node import-data.js");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2026-05-28',
});

const poems = [
  {
    title: "Requiem for a Vow",
    lines: "You pressed your oath\ninto my palms like a coin—\nI spent it on silence.",
    bg: "linear-gradient(160deg, #1a0610 0%, #2d0a1a 100%)",
    collection: "from the bleeding pages",
    stanzas: [
      "You pressed your oath\ninto my palms like a coin—\nI spent it on silence.",
      "And now I count\nthe echoes where your name\nused to live in me.",
      "Even vows have roots\nthat reach past the last goodbye\ninto everything."
    ],
    sig: "— for the one whose words outlasted their heart",
    order: 1,
  },
  {
    title: "The Last Petal",
    lines: "Even roses learn\nto let go of themselves\nbefore the frost comes.",
    bg: "linear-gradient(160deg, #0e0a1a 0%, #1c1030 100%)",
    collection: "from the bleeding pages",
    stanzas: [
      "Even roses learn\nto let go of themselves\nbefore the frost comes.",
      "There is a kind of grace\nin that—the soft release\nno one asked them for.",
      "I have been watching\nyou practice the same art,\npetal by petal.",
      "And I, the garden,\nlearn again what I already knew:\nthat beauty costs."
    ],
    sig: "— written in October, when everything was letting go",
    order: 2,
  },
  {
    title: "Ink & Ash",
    lines: "I wrote you in ink\nthat burns like memory—\nyou read none of it.",
    bg: "linear-gradient(160deg, #100a0a 0%, #241010 100%)",
    collection: "from the bleeding pages",
    stanzas: [
      "I wrote you in ink\nthat burns like memory—\nyou read none of it.",
      "The page knows your name\nbetter than you knew yourself\nwhen I gave it there.",
      "Still I keep writing,\nbecause the fire needs somewhere\nto put its hunger."
    ],
    sig: "— she is the reason the ink wouldn't dry",
    order: 3,
  },
  {
    title: "Hollow Season",
    lines: "Autumn isn't loss.\nIt is the tree confessing\nit was never whole.",
    bg: "linear-gradient(160deg, #0a0e14 0%, #101824 100%)",
    collection: "from the bleeding pages",
    stanzas: [
      "Autumn isn't loss.\nIt is the tree confessing\nit was never whole.",
      "We called it beauty—\nthe dying light, the bare branch—\nbecause we needed to.",
      "I am the same tree.\nI am the same beautiful\nlie we tell ourselves."
    ],
    sig: "— for every winter that arrived early",
    order: 4,
  },
  {
    title: "Tender Ruin",
    lines: "You called it loving.\nI called it standing still\nwhile the flood rose up.",
    bg: "linear-gradient(160deg, #10090e 0%, #200d18 100%)",
    collection: "from the bleeding pages",
    stanzas: [
      "You called it loving.\nI called it standing still\nwhile the flood rose up.",
      "There is a difference\nbetween choosing and sinking—\nyou never learned it.",
      "But I did. God, I did.\nWater teaches what it means\nto be truly known."
    ],
    sig: "— the flood remembers what we forgot",
    order: 5,
  },
  {
    title: "Unnamed Grief",
    lines: "There is no word for\nmissing someone who still breathes—\nso I made one: you.",
    bg: "linear-gradient(160deg, #0a0a0a 0%, #181010 100%)",
    collection: "from the bleeding pages",
    stanzas: [
      "There is no word for\nmissing someone who still breathes—\nso I made one: you.",
      "A noun and a verb,\na season and a wound,\na you-shaped silence.",
      "Languages have failed\neveryone who ever loved\nthe wrong way on time."
    ],
    sig: "— for the unnamed, who feel it anyway",
    order: 6,
  },
];

const thoughts = [
  { quote: "Art is the wound that refuses to close prettily.", label: "— notebook, 3am", order: 1 },
  { quote: "Every poem I write is a door I never opened in time.", label: "— on process", order: 2 },
  { quote: "Silence has a grammar. I'm still learning its rules.", label: "— journal entry", order: 3 },
  { quote: "The rose doesn't mourn its petals. We do that for it.", label: "— Wilted Promises", order: 4 },
];

const paintings = [
  { title: "Beauty Within", subtitle: "oil on canvas, 2024", bgGradient: "linear-gradient(135deg, #1a0810 0%, #3d1525 40%, #1a0a0a 100%)", order: 1 },
  { title: "The Mourning Hour", subtitle: "mixed media, 2024", bgGradient: "linear-gradient(135deg, #0a100a 0%, #1a2510 40%, #0a1208 100%)", order: 2 },
  { title: "Unnamed #4", subtitle: "watercolour, 2023", bgGradient: "linear-gradient(135deg, #0a0e14 0%, #10182a 40%, #080c10 100%)", order: 3 },
];

const book = {
  _id: "book-details",
  _type: "book",
  title: "Wilted Promises",
  author: "bleedinginsilence",
  authorQuote: "\"I bled ink so you could feel something.\"",
  quote: "\"For art-starved souls who have loved something\nthat refused to stay.\"",
  description: "A debut collection of 130 poems navigating the ruins of love, the silence between goodbyes, and the strange beauty of carrying grief. Written in the dark. Offered to the light.",
  buyLink: "http://getbook.to/wiltedpromises",
  poemsCount: "130",
  collectionName: "1 debut collection",
  readingsCount: "∞",
};

async function importData() {
  console.log(`Starting data migration to Sanity (Project: ${projectId}, Dataset: ${dataset})...\n`);

  try {
    // 1. Import Book details (Create or replace singleton)
    console.log("Importing Book Details singleton...");
    await client.createOrReplace(book);
    console.log("✓ Book details imported.");

    // 2. Import Poems
    console.log("\nImporting Poems...");
    for (const p of poems) {
      const doc = {
        _type: 'poem',
        title: p.title,
        lines: p.lines,
        bg: p.bg,
        collection: p.collection,
        stanzas: p.stanzas,
        sig: p.sig,
        order: p.order
      };
      const res = await client.create(doc);
      console.log(`✓ Imported Poem: "${res.title}" (ID: ${res._id})`);
    }

    // 3. Import Thoughts
    console.log("\nImporting Thoughts...");
    for (const t of thoughts) {
      const doc = {
        _type: 'thought',
        quote: t.quote,
        label: t.label,
        order: t.order
      };
      const res = await client.create(doc);
      console.log(`✓ Imported Thought: "${res.quote.substring(0, 30)}..." (ID: ${res._id})`);
    }

    // 4. Import Paintings
    console.log("\nImporting Paintings...");
    for (const pa of paintings) {
      const doc = {
        _type: 'painting',
        title: pa.title,
        subtitle: pa.subtitle,
        bgGradient: pa.bgGradient,
        order: pa.order
      };
      const res = await client.create(doc);
      console.log(`✓ Imported Painting: "${res.title}" (ID: ${res._id})`);
    }

    console.log("\nMigration completed successfully! All initial content is now in Sanity.");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

importData();
