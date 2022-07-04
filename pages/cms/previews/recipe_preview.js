import PostLayout from '@/layouts/PostFrontMatter'

export async function getInitialProps() {}

export default function RecipePreview(props) {
  let frontMatter = {}
  const { entry } = props
  if (entry != undefined) {
    const frontMatter = entry.get('data').toJSON()
  }
  frontMatter.isPreview = true
  return (
    <div>
      Hello Preview
      <PostLayout frontMatter={frontMatter} />
    </div>
  )
}
