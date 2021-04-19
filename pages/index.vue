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
import FeaturedArticles from '~/components/FeaturedArticles.vue'

export default defineComponent({
  components: { FeaturedArticles },

  setup() {
    const { articles } = useState(['articles'])
    const { context, storyApi, storyBridge } = useContext()

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
      if (articles.value.loaded !== '1') {
        const { data: { stories } } = await storyApi.get('cdn/stories/', { starts_with: 'articles/', version })
        context.store.commit('articles/setArticles', stories)
        context.store.commit('articles/setLoaded', '1')
      }
    }

    onMounted(async () => {
      await fetchPage()
      await fetchArticles()

      storyBridge.on('input', (event: any) => {
        if (event.story.id === story.value.id) {
          story.value = event.story.content
        }
      })

      storyBridge.on(['published', 'change'], () => {
        // window.location.reload()
        context.app.router.go({
          path:context.app.router.currentRoute,
          force: true,
        })
      })
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
