<template lang="pug">
  section
    template(v-if='story.component')
      .page-container.mx-auto.px-6
        component(v-for='blok in story.body' :key='blok._uid' :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { useState } from 'vuex-composition-helpers'
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import useContext from '~/hooks/useContext'
import useStoryBridge from '~/hooks/useStoryBridge'
import FeaturedArticles from '~/components/FeaturedArticles.vue'

export default defineComponent({
  components: { FeaturedArticles },

  setup() {
    const { context, storyApi } = useContext()
    const { articles: state } = useState(['articles'])
    const { setStoryBridgeListeners } = useStoryBridge()

    const story: Ref<any> = ref({})
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    const fetchPage = async () => {
      try {
        const { data: { story: { content } } } = await storyApi.get('cdn/stories/home', { version })
        story.value = content
      } catch (e) {
        console.warn(e)
        context.error({ statusCode: 404 })
      }
    }

    const fetchArticles = async () => {
      if (state.value.loaded !== '1') {
        const { data: { stories } } = await storyApi.get('cdn/stories/', { starts_with: 'articles/', version })
        context.store.commit('articles/setArticles', stories)
        context.store.commit('articles/setLoaded', '1')
      }
    }

    onMounted(async () => {
      await fetchPage()
      await fetchArticles()
      setStoryBridgeListeners(story)
    })

    return { story }
  }
})
</script>

<style lang="stylus">
.page-container
  margin 3rem auto 0
  max-width 960px
</style>
