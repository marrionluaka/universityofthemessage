<template lang="pug">
  .page-container.mx-auto.px-6
    template(v-if='story.component')
      component(v-for='blok in story.body' :key='blok._uid' :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import useFetchStory from '~/hooks/useFetchStory'
import useStoryBridge from '~/hooks/useStoryBridge'

import PageBanner from './PageBanner.vue'

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

    onMounted(async () => {
      await fetchStory(props.page)
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
