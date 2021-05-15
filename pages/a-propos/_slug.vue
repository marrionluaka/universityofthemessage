<template lang="pug">
section
  Page(v-if="story" :story="story.content")
    template
      div(v-for="blok in story.content.body" :key='blok._uid')
        component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { pipe, split, last } from 'ramda'
import { defineComponent, onMounted } from '@vue/composition-api'

import { useFetchStory } from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

import Page from '~/components/Page.vue'
import PageLinks from '~/components/PageLinks.vue'
import PageContent from '~/components/PageContent.vue'
import { useFetchArticles } from '~/hooks/useFetchArticles'

export default defineComponent({
  components: { Page, PageLinks, PageContent },

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
