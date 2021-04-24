<template lang="pug">
  section
    template(v-if="story.component")
      Article(:blok="story")
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import useContext from '~/hooks/useContext'
import useStoryBridge from '~/hooks/useStoryBridge'

import Article from '~/components/Article.vue'

export default defineComponent({
  components: { Article },

  setup() {
    const story: Ref<any> = ref({})
    const { context, storyApi } = useContext()
    const { setStoryBridgeListeners } = useStoryBridge()

    const fetchArticle = async () => {
      const version = context.query._storyblok || context.isDev ? 'draft' : 'published'

      try {
        const { data: { story: { content } } } = await storyApi.get(`cdn/stories/articles/${context.params.slug}`, { version })
        story.value = content
      } catch (e) {
        console.warn(e)
        context.error({ statusCode: 404 })
      }
    }

    onMounted(async () => {
      await fetchArticle()
      setStoryBridgeListeners(story)
    })

    return { story }
  }
})
</script>
