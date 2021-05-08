import { useContext } from '~/hooks/useContext'

interface ISlug {
  [key: string]: { slug: string }
}

interface ITranslatedSlug {
  path: string
  lang: string
}

export default function useTranslatedSlugs() {
  const { context } = useContext()

  const getTranslatedSlug = (story: any, path: string) => {
    const { i18n } = context
    const locale = i18n.locale
    const localePath = locale === 'fr' ? '' : 'en/'
    const slugs = _getTranslatedSlugs(story)

    return `${localePath}${i18n.t(path)}/${slugs[locale].slug}`
  }

  const setTranslatedSlugs = async (story: any) =>
    await context.store.dispatch('i18n/setRouteParams', _getTranslatedSlugs(story))

  const _getTranslatedSlugs = (story: any) => {
    const slugs: ISlug = { fr: { slug: story.slug } }

    story.translated_slugs.forEach((translatedSlug: ITranslatedSlug) => {
      const tmp = translatedSlug.path.split('/')
      slugs[translatedSlug.lang] = { slug: tmp[tmp.length - 1] }
    })

    return slugs
  }

  return { getTranslatedSlug, setTranslatedSlugs }
}
