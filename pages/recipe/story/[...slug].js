import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const posts = getFiles('recipe')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('recipe')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('recipe', params.slug.join('/'))
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return { props: { post, authorDetails, prev, next } }
}

export const config = { amp: true }

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post
  const {
    frontMatter: { title, cover, subrecipe = [] },
  } = post

  return (
    <amp-story standalone supports-landscape title={title} published="kirthi">
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img class="contain" src={cover} width="700" height="900" layout="responsive" />
        </amp-story-grid-layer>
        <amp-story-grid-layer template="contain">
          <h1>{title}</h1>
          {authorDetails.map((author, index) => (
            <p key={index}> {author.name} </p>
          ))}
        </amp-story-grid-layer>
      </amp-story-page>

      {subrecipe.map((section, index) => (
        <>
          {section.story.map((step, stepIndex) => (
            <amp-story-page id={section.name + stepIndex} key={section.name + stepIndex}>
              <amp-story-grid-layer template="cover">
                <h1>{step.title}</h1>
                <amp-img
                  class="contain"
                  src={step.image}
                  width="900"
                  height="600"
                  layout="responsive"
                ></amp-img>
                <q>{step.description}</q>
              </amp-story-grid-layer>
            </amp-story-page>
          ))}
        </>
      ))}
    </amp-story>
  )
}
