import PostLayout from '@/layouts/PostFrontMatter'

export default function RecipePreview(props) {
  let frontMatter = {}
  const { entry } = props
  if (entry != undefined) {
    frontMatter = entry.get('data').toJSON()
  }
  frontMatter.isPreview = true
  return (
    <div>
      Hello Preview
      <PostLayout frontMatter={frontMatter} />
    </div>
  )
}
