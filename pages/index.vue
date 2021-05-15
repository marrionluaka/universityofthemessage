<template lang="pug">
main
  template(v-if="story")
    PageBanner.page-banner--hero(imgSrc="branham-dieu.jpeg" className="text-center text-white")
      h1.tracking-wider.uppercase.text-3xl.text-center.text-white.max-w-4xl.mx-auto(class="sm:text-4xl md:text-5xl")
        | {{ $t('dieu-le-pere') }}

    //- section.sermons
    //-   .container.container--narrow.mx-auto.px-6.mt-12
    //-     h2 We want to be a church that is relevant to our culture
    //-     YouTubePlayList
    //-       template(#default="{ videos }")
    //-         YouTubeCard(v-for="video in videos.slice(0, 5)" :key="video.id" :video="video" @click="() => {}")

    section(v-for="blok in story.content.body" :key="blok._uid" :class="blok.className")
      div.py-10(:class="[blok.class || '', 'md:py-16']")
        .container.mx-auto.px-6
          component(v-if="$options.components[blok.component]" :blok="blok" :is="blok.component")
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import useStoryBridge from '~/hooks/useStoryBridge'
import { useFetchStory } from '~/hooks/useFetchStory'

import MapInfo from '~/components/MapInfo.vue'
import PageBanner from '~/components/PageBanner.vue'
import YouTubeCard from '~/components/YouTubeCard.vue'
import YouTubePlayList from '~/components/YouTubePlayList.vue'

export default defineComponent({
  components: {
    MapInfo,
    PageBanner,
    YouTubeCard,
    YouTubePlayList
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    const { setStoryBridgeListeners } = useStoryBridge()

    const addSectionClass = (list: any[]) => {
      return list.reduce((acc: any, blok: any, i: number) => {
        acc[i] = { ...blok, className: `section-${++i}`}
        return acc
      }, [])
    }

    onMounted(async () => {
      await fetchStory('home')
      story.value.content.body = addSectionClass(story.value.content.body)
      setStoryBridgeListeners(story.value.content)
    })

    return { story }
  }
})
</script>

<style lang="stylus" scoped>
.page-banner
  &--hero
    >>> h1
      line-height 1.2
  >>> &__bg-image
    opacity .44
.section-4, .section-2
  background-color: $smoke
</style>
