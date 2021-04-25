<template lang="pug">
  .page-container.mx-auto.px-6
    template(v-if='story.component')
      component(v-for='blok in story.body' :key='blok._uid' :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import useContext from '~/hooks/useContext'
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
    const { context, storyApi } = useContext()
    const { setStoryBridgeListeners } = useStoryBridge()

    const story: Ref<any> = ref({})
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    const fetchPage = async () => {
      try {
        const { data: { story: { content } } } = await storyApi.get(`cdn/stories/${props.page}`, { version })
        story.value = content
      } catch (e) {
        console.warn(e)
        context.error({ statusCode: 404 })
      }
    }

    onMounted(async () => {
      await fetchPage()
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
