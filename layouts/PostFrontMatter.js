import Link from '@/components/Link'
import Image from '@/components/Image'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title, subrecipe = [], cover } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/recipe/${frontMatter.slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            <div className="pb-10 space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 "
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
                {cover && (
                  <Image
                    src={cover}
                    width="900"
                    height="900"
                    layout="responsive"
                    objectFit="cover"
                  />
                )}
                {subrecipe.map((section, index) => (
                  <div key={index}>
                    <h2> {section.name} </h2>
                    <h3> Things you'll need </h3>
                    <ol className="whitespace-pre-line">
                      {section.ingredients.split(/\r?\n/).map((ingredient, index) => (
                        <li key={index}> {ingredient} </li>
                      ))}
                    </ol>
                    <h3> Instructions </h3>
                    <ol className="whitespace-pre-line">
                      {section.instructions.split(/\r?\n/).map((instruction, index) => (
                        <li key={index}> {instruction} </li>
                      ))}
                    </ol>
                    <h3 className="mb-10"> Pictorial Instructions </h3>
                    <div className="container grid lg:grid-cols-2 gap-6 mx-auto pt-1">
                      {section.story.map((step, index) => (
                        <div className="w-full bg-gray-200  dark:bg-gray-700" key={index}>
                          <div className="relative text-center z-10">
                            <div className="bg-gray-500 dark:bg-gray-200 text-white dark:text-black p-2 absolute -top-5 left-5">
                              {index + 1}
                            </div>
                          </div>
                          <Image width="600" height="600" layout="responsive" src={step.image} />
                          <div className="text-center p-5"> {step.description} </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Comments frontMatter={frontMatter} />
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/recipe/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/recipe/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
