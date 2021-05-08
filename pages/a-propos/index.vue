<template lang="pug">
  section
    Page(v-if="story" :story="story.content")
      template
        PageLinks(v-if="links.length" :parentLink="parentLink" :links="links")
        div(v-for="blok in story.content.body" :key='blok._uid')
          component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import usePageLinks from '~/hooks/usePageLinks'
import { useFetchStory } from '~/hooks/useFetchStory'

import Page from '~/components/Page.vue'
import PageLinks from '~/components/PageLinks.vue'
import PageContent from '~/components/PageContent.vue'

export default defineComponent({
  name: 'a-propos',
  components: { Page, PageLinks, 'page-content': PageContent },

  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos'
    }
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    const { links, parentLink } = usePageLinks('a-propos')

    onMounted(async () => await fetchStory('a-propos'))

    return { story, links, parentLink }
  }
})
</script>
