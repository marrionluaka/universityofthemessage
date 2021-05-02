import { computed, ref, Ref } from '@vue/composition-api'

import useContext from '~/hooks/useContext'
import useStoryBridge from '~/hooks/useStoryBridge'

export default function useFetchStory() {
  const { context, storyApi } = useContext()
  const { setStoryBridgeListeners } = useStoryBridge()

  const story: Ref<any> = ref(null)
  const locale = context.i18n.locale === 'fr' ? '' : 'en/'
  const version = context.query._storyblok || context.isDev ? 'draft' : 'published'

  const fetchStory = async (page: string) => {
    try {
      const { data } = await storyApi.get(`cdn/stories/${locale}${page}`, { version })

      story.value = data.story
      setStoryBridgeListeners(data.story.content)
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
