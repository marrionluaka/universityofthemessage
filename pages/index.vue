<template lang="pug">
  section
    template(v-if='story.component')
      .page-container.mx-auto.px-6
        component(v-for='blok in story.body' :key='blok._uid' :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import useContext from '~/hooks/useContext'
import useFetchStory from '~/hooks/useFetchStory'
import useStoryBridge from '~/hooks/useStoryBridge'
import useFetchArticles from '~/hooks/useFetchArticles'
import FeaturedArticles from '~/components/FeaturedArticles.vue'

export default defineComponent({
  components: { FeaturedArticles },

  setup() {
    const { storyApi } = useContext()
    const { setStoryBridgeListeners } = useStoryBridge()
    const { story, version, fetchStory } = useFetchStory()
    const { loaded, setArticles, setLoaded } = useFetchArticles()

    const fetchArticles = async () => {
      if (loaded.value !== '1') {
        const { data: { stories } } = await storyApi.get('cdn/stories/', { starts_with: 'articles/', version: version.value })
        setArticles(stories)
        setLoaded('1')
      }
    }

    onMounted(async () => {
      await fetchStory('home')
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
