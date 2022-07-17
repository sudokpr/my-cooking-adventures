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
        <amp-story-grid-layer template="fill" position="landscape-half-left">
          <amp-img src={cover} width="700" height="900" layout="responsive" />
        </amp-story-grid-layer>
        <amp-story-grid-layer
          className="noedge center-text"
          template="vertical"
          position="landscape-half-right"
        >
          <div className="transparent-holder hero">{title}</div>
        </amp-story-grid-layer>
      </amp-story-page>

      {subrecipe.map((section, index) => (
        <>
          {section.name && (
            <amp-story-page id={section.name} key={section.name}>
              <amp-story-grid-layer template="thirds" className="center-text">
                <h1 grid-area="middle-third" className="banner-text">
                  {' '}
                  {section.name}{' '}
                </h1>
              </amp-story-grid-layer>
            </amp-story-page>
          )}
          <amp-story-page id={section.name + 'ingredients'} key={section.name + 'ingrdients'}>
            <amp-story-grid-layer template="thirds">
              <div grid-area="upper-third">
                <h1>Ingredients</h1>
              </div>
              <div grid-area="middle-third">
                <div className="wrap">
                  {section.ingredients.split(/\r?\n/).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </div>
              </div>
            </amp-story-grid-layer>
          </amp-story-page>
          {section.story.map((step, stepIndex) => (
            <>
              <amp-story-page id={section.name + stepIndex} key={section.name + stepIndex}>
                <>
                  <amp-story-grid-layer template="fill">
                    <amp-img
                      src={step.image}
                      width="720"
                      height="1280"
                      layout="responsive"
                    ></amp-img>
                  </amp-story-grid-layer>
                  <amp-story-grid-layer template="vertical" class="bottom">
                    <div className="transparent-holder">
                      <p>{step.description}</p>
                    </div>
                  </amp-story-grid-layer>
                </>
                )
              </amp-story-page>
            </>
          ))}
        </>
      ))}
    </amp-story>
  )
}
