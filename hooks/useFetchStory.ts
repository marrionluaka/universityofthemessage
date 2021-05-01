import { computed, ref, Ref } from '@vue/composition-api'
import useContext from '~/hooks/useContext'

export default function useFetchStory() {
  const story: Ref<any> = ref({})
  const { context, storyApi } = useContext()
  const locale = context.i18n.locale === 'fr' ? '' : 'en/'
  const version = context.query._storyblok || context.isDev ? 'draft' : 'published'

  const fetchStory = async (page: string) => {
    try {
      const { data: { story: { content } } } = await storyApi.get(`cdn/stories/${locale}${page}`, { version })
      story.value = content
    } catch (e) {
      console.warn(e)
      context.error({ statusCode: 404 })
    }
  }

  return {
    story,
    version: computed(() => version),
    fetchStory
  }
}
