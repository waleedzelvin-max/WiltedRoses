export default {
  name: 'poem',
  title: 'Poem',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'lines',
      title: 'Lines',
      type: 'text',
      description: 'Poem lines. Use newlines to separate lines.',
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'The order in which the poem is displayed (lowest first).'
    }
  ]
}
