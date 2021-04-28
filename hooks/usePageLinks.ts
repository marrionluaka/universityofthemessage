import { onMounted, ref, Ref } from '@vue/composition-api'

import useContext from '~/hooks/useContext'
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

  onMounted(async () => {
    try {
      const { data: { stories } } = await storyApi.get('cdn/stories/', { starts_with: page, version: version.value })

      if (!stories.length) return

      links.value = stories
        .filter((x: ILink) => !x.is_startpage)
        .map((x: any) => ({
          path: '/' + x.full_slug,
          name: x.name.replace(/-/g, ' '),
          isActiveLink: context.route.params.slug === x.slug
        }))

      parentLink.value = { name: page, path: '/' + stories.find((x: ILink) => x.is_startpage)?.full_slug }
    } catch (e) {
      console.log(e)
      context.error({ statusCode: 404 })
    }
  })
  
  return { links, parentLink }
}
