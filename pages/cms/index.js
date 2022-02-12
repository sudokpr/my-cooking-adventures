import { useEffect } from 'react'
import config from './config'

const Admin = () => {
  useEffect(() => {
    ;(async () => {
      if (process.env.NODE_ENV == 'development') {
        config.local_backend = true
      }
      const CMS = (await import('netlify-cms-app')).default
      CMS.init({ config })
      async function saveImageDimensions({ entry }) {
        console.log('Presave hook')
        if (
          entry.get('collection') == 'Recipe' &&
          entry.get('data').get('layout') !== 'PostFrontMatter'
        ) {
          return entry.get('data')
        }
        const subrecipe = entry.get('data').get('subrecipe').toJSON()
        const story = subrecipe.map((recipe) => {
          return recipe.story
        })
        const allStory = story.flat()
        const images = allStory.map((step) => {
          return step.image
        })
        const mediaFiles = entry.get('mediaFiles').toJSON()
        const mediaFilesObj = {}
        for (let i = 0, l = mediaFiles.length; i < l; i += 1) {
          const { url, path } = mediaFiles[i]
          mediaFilesObj[path.replace(/^public(.*)/, '$1')] = url
        }
        const dimensions = await Promise.all(
          images.map((image) => {
            return new Promise((resolve) => {
              const img = new Image()
              img.onload = function handleLoad() {
                resolve({
                  path: image,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                })
              }
              img.src = mediaFilesObj[image]
            })
          })
        )
        const dimensionsObj = {}
        for (let i = 0, l = dimensions.length; i < l; i += 1) {
          const { path, width, height } = dimensions[i]
          dimensionsObj[path] = { width, height }
        }
        const subrecipeWithDimensions = subrecipe.map((recipe) => {
          const storyWithDimensions = recipe.story.map((step) => {
            return {
              ...step,
              width: dimensionsObj[step.image].width,
              height: dimensionsObj[step.image].height,
            }
          })
          return {
            ...recipe,
            story: storyWithDimensions,
          }
        })
        return entry.get('data').setIn(['subrecipe'], subrecipeWithDimensions)
      }

      CMS.registerEventListener({
        name: 'preSave',
        handler: saveImageDimensions,
      })
    })()
  }, [])

  return <div />
}

export default Admin
