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
  console.log('story page')
  const {
    frontMatter: {
      title,
      story = [
        {
          image: '',
        },
      ],
    },
  } = post

  let coverPage
  const coverPages = story.filter((page) => page.cover)
  if (coverPages.length > 0) {
    coverPage = coverPages[0]
  } else {
    coverPage = story[0]
  }
  return (
    <amp-story standalone supports-landscape title={title} published="kirthi">
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img
            class="contain"
            src={coverPage.image}
            width="700"
            height="900"
            layout="responsive"
          />
        </amp-story-grid-layer>
        <amp-story-grid-layer template="contain">
          <h1>{title}</h1>
          {authorDetails.map((author, index) => (
            <p key={index}> {author.name} </p>
          ))}
        </amp-story-grid-layer>
      </amp-story-page>

      {story.map((step, index) => (
        <amp-story-page id={index} key={index}>
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
    </amp-story>
  )
}
