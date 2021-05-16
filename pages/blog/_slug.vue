<template lang="pug">
Page(v-if="story" :story="story.content")
</template>

<script lang="ts">
import { pipe, split, last } from 'ramda'
import { defineComponent, onMounted } from '@vue/composition-api'

import Page from '~/components/Page.vue'
import { useFetchStory } from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

export default defineComponent({
  components: { Page },

  nuxtI18n: {
    paths: {
      en: '/blog/:slug',
      fr: '/blog/:slug'
    }
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    const { setTranslatedSlugs } = useTranslatedSlugs()

    onMounted(async () => {
      const getCurrentPath = pipe(split('/'), last)
      await fetchStory(`blog/${getCurrentPath(location.pathname)}`)
      await setTranslatedSlugs(story.value)
    })

    return { story }
  }
})
</script>
