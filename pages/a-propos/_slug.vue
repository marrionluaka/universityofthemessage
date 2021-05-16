<template lang="pug">
Page(v-if="story" :story="story.content")
</template>

<script lang="ts">
import { pipe, split, last } from 'ramda'
import { defineComponent, onMounted } from '@vue/composition-api'

import Page from '~/components/Page.vue'
import { useFetchStory } from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'
import { useFetchArticles } from '~/hooks/useFetchArticles'

export default defineComponent({
  components: { Page },

  nuxtI18n: {
    paths: {
      en: '/about/:slug',
      fr: '/a-propos/:slug'
    }
  },

  setup() {
    const { fetchArticles } = useFetchArticles()
    const { story, fetchStory } = useFetchStory()
    const { setTranslatedSlugs } = useTranslatedSlugs()

    onMounted(async () => {
      const getCurrentPath = pipe(split('/'), last)

      await fetchStory(`a-propos/${getCurrentPath(location.pathname)}`)
      await setTranslatedSlugs(story.value)
      await fetchArticles()
    })

    return { story }
  }
})
</script>
