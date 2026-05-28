export default {
  name: 'book',
  title: 'Book & Site Settings',
  type: 'document',
  description: 'Manage the core book details, author settings, hero section controls, and global site assets like the favicon.',
  fields: [
    {
      name: 'title',
      title: 'Title / Brand Name',
      type: 'string',
      initialValue: 'Wilted Promises'
    },
    {
      name: 'author',
      title: 'Author Name',
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
    // Hero Section Fields
    {
      name: 'heroLabel',
      title: 'Hero Top Label',
      type: 'string',
      description: 'The small text above the main title (e.g., "a poet\'s sanctuary")',
      initialValue: "a poet's sanctuary"
    },
    {
      name: 'heroSubscript',
      title: 'Hero Subscript',
      type: 'string',
      description: 'The cursive subtitle below the main title (e.g., "where love goes to confess")',
      initialValue: 'where love goes to confess'
    },
    {
      name: 'heroBtn1Text',
      title: 'Hero Button 1 Text',
      type: 'string',
      initialValue: 'Read Poetry'
    },
    {
      name: 'heroBtn1Link',
      title: 'Hero Button 1 Link',
      type: 'string',
      description: 'Section ID (e.g. "poetry") or external URL (e.g. "https://example.com")',
      initialValue: 'poetry'
    },
    {
      name: 'heroBtn2Text',
      title: 'Hero Button 2 Text',
      type: 'string',
      initialValue: 'Get the Book'
    },
    {
      name: 'heroBtn2Link',
      title: 'Hero Button 2 Link',
      type: 'string',
      description: 'Section ID (e.g. "shop") or external URL (e.g. "https://example.com")',
      initialValue: 'shop'
    },
    // Book details
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
