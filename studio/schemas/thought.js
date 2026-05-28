export default {
  name: 'thought',
  title: 'Thought',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'E.g., — notebook, 3am',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'The order in which the thought is displayed (lowest first).'
    }
  ]
}
