import useContext from '~/hooks/useContext'

interface ISlug {
  [key: string]: { slug: string }
}

interface ITranslatedSlug {
  path: string
  lang: string
}

export default function useTranslatedSlugs() {
  const { context } = useContext()

  const setTranslatedSlugs = async (story: any) => {
    const slugs: ISlug = { fr: { slug: story.slug } }

    story.translated_slugs.forEach((translatedSlug: ITranslatedSlug) => {
      const tmp = translatedSlug.path.split('/')
      slugs[translatedSlug.lang] = { slug: tmp[tmp.length - 1] }
    })

    await context.store.dispatch('i18n/setRouteParams', slugs)
  }

  return { setTranslatedSlugs }
}
