<template lang="pug">
section
  Page(v-if="story" :story="story.content")
    template
      div(v-for="blok in story.content.body" :key='blok._uid')
        component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import Page from '~/components/Page.vue'
import PageLinks from '~/components/PageLinks.vue'
import PageContent from '~/components/PageContent.vue'

import { useFetchStory } from '~/hooks/useFetchStory'
import { useFetchArticles } from '~/hooks/useFetchArticles'

export default defineComponent({
  name: 'a-propos',
  components: { Page, PageLinks, PageContent },

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
