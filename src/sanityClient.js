import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'giuw0hwj',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Set to false for instant updates in development
  apiVersion: '2026-05-28', // Use today's date or standard version
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  if (!source) return ''
  return builder.image(source)
}
