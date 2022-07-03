import PostLayout from '@/layouts/PostFrontMatter'

export default function RecipePreview(props) {
  const { entry } = props
  const frontMatter = entry.get('data').toJSON()
  frontMatter.isPreview = true
  return (
    <div>
      Hello Preview
      <PostLayout frontMatter={frontMatter} />
    </div>
  )
}
