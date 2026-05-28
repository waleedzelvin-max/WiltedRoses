export default {
  name: 'painting',
  title: 'Painting',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'E.g., oil on canvas, 2024',
      validation: Rule => Rule.required()
    },
    {
      name: 'bgGradient',
      title: 'Background Gradient',
      type: 'string',
      description: 'CSS gradient for the canvas mockup',
      initialValue: 'linear-gradient(135deg, #1a0810 0%, #3d1525 40%, #1a0a0a 100%)',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'The order in which the painting is displayed (lowest first).'
    }
  ]
}
