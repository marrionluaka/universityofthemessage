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
  const { context, i18n } = useContext()

  const getTranslatedSlug = (story: IStory, path: string) => {
    const slugs = _getTranslatedSlugs(story)
    return `${getTranslatedPath(path)}/${slugs[i18n.locale].slug}`
  }

  const getTranslatedPath = (path: string): string => {
    const localePath = i18n.locale === 'fr' ? '' : 'en/'
    return `${localePath}${i18n.t(path)}`
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

  return { getTranslatedSlug, setTranslatedSlugs, getTranslatedPath }
}
