import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Wilted Roses Studio',

  // Fallbacks allow user to run dev server before setting up env variables, or inputting them directly.
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'giuw0hwj',
  dataset: import.meta.env.SANITY_STUDIO_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
