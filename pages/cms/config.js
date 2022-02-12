export default {
  backend: {
    name: 'git-gateway',
    branch: 'master',
  },
  media_folder: 'public/static/images',
  public_folder: '/static/images',
  collections: [
    {
      name: 'Recipe',
      label: 'Recipe',
      folder: 'data/recipe',
      create: true,
      slug: '{{slug}}',
      fields: [
        {
          label: 'Draft',
          name: 'draft',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Layout',
          name: 'layout',
          widget: 'hidden',
          default: 'PostFrontMatter',
        },
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Summary', name: 'summary', widget: 'string' },
        { label: 'Cover Image', name: 'cover', widget: 'image' },
        { label: 'Tags', name: 'tags', widget: 'list' },
        { label: 'Publish Date', name: 'date', widget: 'date' },
        {
          label: 'Recipe',
          name: 'subrecipe',
          widget: 'list',
          fields: [
            {
              label: 'Name',
              name: 'name',
              widget: 'string',
              required: false,
            },
            {
              label: 'Ingredients',
              name: 'ingredients',
              widget: 'text',
              required: false,
            },
            {
              label: 'Instructions',
              name: 'instructions',
              widget: 'text',
              required: false,
            },
            {
              label: 'Story',
              name: 'story',
              widget: 'list',
              summary: '{{fields.title}} - {{fields.description}}',
              fields: [
                {
                  label: 'Title',
                  name: 'title',
                  widget: 'string',
                  required: false,
                },
                {
                  label: 'Description',
                  name: 'description',
                  widget: 'string',
                  required: true,
                },
                {
                  label: 'Picture',
                  name: 'image',
                  widget: 'image',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
