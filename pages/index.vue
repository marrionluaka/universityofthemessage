<template lang="pug">
  section
    template(v-if='story')
      PageBanner(className='text-center text-white')
        h1.headline.headline--large L'Evangile du troisième exode
        h2.headline.headline--medium Réveille tous les demons de leur draps
        h3.headline.headline--small
          | Mais vous 
          strong conscientise
          |  d'un changement réel et radical dans le domaine de la religion.

      .container.container--narrow.mx-auto.px-6.mt-12
        component(v-for='blok in story.content.body' :key='blok._uid' :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import useContext from '~/hooks/useContext'
import useFetchStory from '~/hooks/useFetchStory'
import useStoryBridge from '~/hooks/useStoryBridge'
import useFetchArticles from '~/hooks/useFetchArticles'

import PageBanner from '~/components/PageBanner.vue'
import FeaturedArticles from '~/components/FeaturedArticles.vue'

export default defineComponent({
  components: { PageBanner, FeaturedArticles },

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
      setStoryBridgeListeners(story.value.content)
    })

    return { story }
  }
})
</script>

<style lang="stylus" scoped>
.headline
  margin: 0
  font-weight: 300
  &--large
    font-size: 3.6rem
    +breakpoint(mobile)
      font-size: 6.25rem
  &--large-medium
    font-size: 5rem
    margin: 0 0 1rem 0
  &--medium
    font-size: 1.9rem
    margin-bottom: .75rem
    +breakpoint(mobile)
      font-size: 3.125rem
  &--small-plus
    font-size: 1.6875rem
    font-weight: 400
    margin-bottom: 1.9rem
  &--small
    font-size: 1.2rem
    margin-bottom: 1.9rem
    +breakpoint(mobile)
      font-size: 1.6875rem
  &--smaller
    font-size: 1.5rem
  &--tiny
    font-size: 1.3875rem
    margin-bottom: .25rem
  &--post-title a
    color: $mainBlue
    text-decoration: none
  &--post-title a:hover
    text-decoration: underline
</style>
