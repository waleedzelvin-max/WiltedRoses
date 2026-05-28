export default {
  name: 'book',
  title: 'Book & Site Settings',
  type: 'document',
  // Make it a single entry by adding description
  description: 'Manage the core book details, author settings, and global site assets like the favicon.',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Wilted Promises'
    },
    {
      name: 'author',
      title: 'Author / Brand Name',
      type: 'string',
      description: 'Used in navigation and footer headers (e.g., bleedinginsilence)',
      initialValue: 'bleedinginsilence'
    },
    {
      name: 'authorQuote',
      title: 'Author Quote',
      type: 'string',
      description: 'Quote in footer (e.g., "I bled ink so you could feel something.")',
      initialValue: '"I bled ink so you could feel something."'
    },
    {
      name: 'quote',
      title: 'Book Quote',
      type: 'text',
      description: 'Quote displayed on the book detail section',
      initialValue: '"For art-starved souls who have loved something that refused to stay."'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: 'A debut collection of 130 poems navigating the ruins of love, the silence between goodbyes, and the strange beauty of carrying grief. Written in the dark. Offered to the light.'
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'siteIcon',
      title: 'Site Icon / Favicon',
      type: 'image',
      description: 'Upload an icon (SVG, PNG, or ICO) to be used as the browser tab icon.',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'buyLink',
      title: 'Buy Link',
      type: 'url',
      initialValue: 'http://getbook.to/wiltedpromises'
    },
    {
      name: 'poemsCount',
      title: 'Poems Count',
      type: 'string',
      initialValue: '130'
    },
    {
      name: 'collectionName',
      title: 'Collection Name',
      type: 'string',
      initialValue: '1 debut collection'
    },
    {
      name: 'readingsCount',
      title: 'Readings Count',
      type: 'string',
      initialValue: '∞'
    }
  ]
}
