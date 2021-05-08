import { useContext } from '~/hooks/useContext'

interface IStory {
  slug: string
  translated_slugs: ITranslatedSlug[]
}

interface ISlug {
  [key: string]: { slug: string }
}

interface ITranslatedSlug {
  path: string
  lang: string
}

export default function useTranslatedSlugs() {
  const { context } = useContext()

  const getTranslatedSlug = (story: IStory, path: string) => {
    const { i18n } = context
    const locale = i18n.locale
    const localePath = locale === 'fr' ? '' : 'en/'
    const slugs = _getTranslatedSlugs(story)

    return `${localePath}${i18n.t(path)}/${slugs[locale].slug}`
  }

  const setTranslatedSlugs = async (story: IStory) =>
    await context.store.dispatch('i18n/setRouteParams', _getTranslatedSlugs(story))

  const _getTranslatedSlugs = (story: IStory) => {
    const slugs: ISlug = { fr: { slug: story.slug } }

    story.translated_slugs.forEach((translatedSlug: ITranslatedSlug) => {
      const tmp = translatedSlug.path.split('/')
      slugs[translatedSlug.lang] = { slug: tmp[tmp.length - 1] }
    })

    return slugs
  }

  return { getTranslatedSlug, setTranslatedSlugs }
}
