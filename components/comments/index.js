import siteMetadata from '@/data/siteMetadata'
import dynamic from 'next/dynamic'

const UtterancesComponent = dynamic(
  () => {
    return import('@/components/comments/Utterances')
  },
  { ssr: false }
)
const GiscusComponent = dynamic(
  () => {
    return import('@/components/comments/Giscus')
  },
  { ssr: false }
)
const DisqusComponent = dynamic(
  () => {
    return import('@/components/comments/Disqus')
  },
  { ssr: false }
)

const Comments = ({ frontMatter }) => {
  const { comment: { enabled = false } = {} } = siteMetadata
  let term
  switch (
    siteMetadata.comment.giscusConfig.mapping ||
    siteMetadata.comment.utterancesConfig.issueTerm
  ) {
    case 'pathname':
      term = frontMatter.slug
      break
    case 'url':
      term = window.location.href
      break
    case 'title':
      term = frontMatter.title
      break
  }
  return (
    <>
      {enabled && (
        <div id="comment">
          {siteMetadata.comment && siteMetadata.comment.provider === 'giscus' && (
            <GiscusComponent mapping={term} />
          )}
          {siteMetadata.comment && siteMetadata.comment.provider === 'utterances' && (
            <UtterancesComponent issueTerm={term} />
          )}
          {siteMetadata.comment && siteMetadata.comment.provider === 'disqus' && (
            <DisqusComponent frontMatter={frontMatter} />
          )}
        </div>
      )}
    </>
  )
}

export default Comments
