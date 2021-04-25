<template lang="pug">
section
  template(v-if='story.component')
    PageBanner(:blok="bannerData")
    .page-container.mx-auto.px-6
      component(v-for='blok in story.body' :key='blok._uid' :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { reject, find } from 'ramda'
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import useFetchStory from '~/hooks/useFetchStory'
import useStoryBridge from '~/hooks/useStoryBridge'

import PageBanner, { IBanner } from './PageBanner.vue'

export default defineComponent({
  components: { PageBanner },

  props: {
    page: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const { story, fetchStory } = useFetchStory()
    const { setStoryBridgeListeners } = useStoryBridge()

    const isPageBanner = (x: any) => x.component === 'page-banner'
    const bannerData: Ref<IBanner> = ref({ title: "l'Université du message", subtitle: "La parole de Dieu faite chair" })

    onMounted(async () => {
      await fetchStory(props.page)
      setStoryBridgeListeners(story)

      bannerData.value = find(isPageBanner, story.value.body)
      story.value.body = reject(isPageBanner, story.value.body)
    })

    return { story, bannerData }
  }
})
</script>

<style lang="stylus">
.page-container
  margin 3rem auto 0
  max-width 960px
</style>
