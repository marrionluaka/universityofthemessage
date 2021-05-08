import { onMounted, ref, Ref } from '@vue/composition-api'

import { useContext } from '~/hooks/useContext'
import useFetchStory from '~/hooks/useFetchStory'
export interface ILink {
  path: string
  name: string
  isActiveLink?: boolean
  is_startpage?: boolean
}

export default function usePageLinks(page: string) {
  const { version } = useFetchStory()
  const { storyApi, context } = useContext()

  const links: Ref<ILink[]> = ref([])
  const parentLink: Ref<ILink | undefined> = ref(undefined)
  const locale = context.i18n.locale === 'fr' ? '' : 'en/'
  const localeLink = context.localePath(page)

  onMounted(async () => {
    try {
      const { data: { stories } } = await storyApi.get(`cdn/stories/`, {
        starts_with: `${locale}${page}`,
        version: version.value
      })

      if (!stories.length) return

      links.value = stories
        .filter((x: ILink) => !x.is_startpage)
        .map((x: any) => {
          const translatedName = x.translated_slugs.find((y: any) => y.lang === x.lang)?.name
          const path = `${localeLink}/${translatedName || x.slug}`
          const name = (translatedName || x.name).replace(/-/g, ' ')

          return {
            path,
            name
          }
        })

      parentLink.value = { name: page, path: context.i18n.locale === 'en' ? localeLink : '/' + page }
    } catch (e) {
      console.log(e)
      context.error({ statusCode: 404 })
    }
  })
  
  return { links, parentLink }
}
