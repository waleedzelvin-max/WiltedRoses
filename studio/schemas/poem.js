export default {
  name: 'poem',
  title: 'Poem',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Page Number',
      type: 'string',
      description: 'The title of the poem, or page number (e.g. "Page 102" or "Ghosts")',
      validation: Rule => Rule.required()
    },
    {
      name: 'lines',
      title: 'Preview Lines',
      type: 'text',
      description: 'Short preview text shown on the grid card (use newlines to separate lines).',
      validation: Rule => Rule.required()
    },
    {
      name: 'bg',
      title: 'Background Gradient',
      type: 'string',
      description: 'CSS gradient for the background card. E.g., linear-gradient(160deg, #1a0610 0%, #2d0a1a 100%)',
      initialValue: 'linear-gradient(160deg, #1a0610 0%, #2d0a1a 100%)',
      validation: Rule => Rule.required()
    },
    {
      name: 'collection',
      title: 'Collection Name',
      type: 'string',
      description: 'E.g., "from Wilted Promises" or "from the bleeding pages"',
      initialValue: 'from Wilted Promises'
    },
    {
      name: 'stanzas',
      title: 'Full Poem Stanzas',
      type: 'array',
      description: 'Stanzas for the modal detail view. Each item represents a stanza of the poem.',
      of: [{ type: 'text' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'sig',
      title: 'Poem Signature',
      type: 'string',
      description: 'The signature line at the bottom of the full poem (e.g. "—Bleeding in silence")',
      initialValue: '—Bleeding in silence'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'The order in which the poem is displayed (lowest first).'
    }
  ]
}
