<template lang="pug">
Page(v-if="story" :story="story.content")
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import Page from '~/components/Page.vue'

import { useFetchStory } from '~/hooks/useFetchStory'
import { useFetchArticles } from '~/hooks/useFetchArticles'

export default defineComponent({
  name: 'a-propos',
  components: { Page },

  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos'
    }
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    const { fetchArticles } = useFetchArticles()

    onMounted(async () => {
      await fetchStory('a-propos')
      await fetchArticles()
    })

    return { story }
  }
})
</script>
