<template lang="pug">
main
  template(v-if="story")
    PageBanner(className="text-center text-white")
      h1.headline.headline--large L'Evangile du troisième exode
      h2.headline.headline--medium Réveille tous les demons de leur draps
      h3.headline.headline--small
        | Mais vous
        strong conscientise
        |
        | d'un changement réel et radical dans le domaine de la religion.

    //- section.sermons
    //-   .container.container--narrow.mx-auto.px-6.mt-12
    //-     h2 We want to be a church that is relevant to our culture
    //-     YouTubePlayList
    //-       template(#default="{ videos }")
    //-         YouTubeCard(v-for="video in videos.slice(0, 5)" :key="video.id" :video="video" @click="() => {}")

    section(v-for="blok in story.content.body" :key="blok._uid" :class="blok.component")
      div.py-10(:class="[blok.class || '', 'md:py-20']")
        .container.mx-auto.px-6.mt-12
          component(v-if="$options.components[blok.component]" :blok="blok" :is="blok.component")
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import { useContext } from '~/hooks/useContext'
import useStoryBridge from '~/hooks/useStoryBridge'
import { useFetchStory } from '~/hooks/useFetchStory'
import useFetchArticles from '~/hooks/useFetchArticles'

import MapInfo from '~/components/MapInfo.vue'
import PageBanner from '~/components/PageBanner.vue'
import YouTubeCard from '~/components/YouTubeCard.vue'
import YouTubePlayList from '~/components/YouTubePlayList.vue'
import FeaturedArticles from '~/components/FeaturedArticles.vue'

export default defineComponent({
  components: {
    MapInfo,
    PageBanner,
    YouTubeCard,
    YouTubePlayList,
    FeaturedArticles
  },

  setup() {
    const { storyApi } = useContext()
    const { setStoryBridgeListeners } = useStoryBridge()
    const { story, version, fetchStory } = useFetchStory()
    const { loaded, setArticles, setLoaded } = useFetchArticles()

    const fetchArticles = async () => {
      if (loaded.value !== '1') {
        const {
          data: { stories }
        } = await storyApi.get('cdn/stories/', { starts_with: 'a-propos/', version: version.value })
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
.info-cart {
  @apply: flex flex-wrap my-4 -mx-4;
}
</style>
