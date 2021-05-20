<template lang="pug">
Page(v-if="story" :story="story.content")
  section.py-10(v-for="(blok, i) in story.content.body" :key='blok._uid' :class="`section-${i}`" class="md:py-8")
    component.mx-auto.px-6.py-12(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
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

<style lang="stylus" scoped>
.section-0
  background: $white
  @apply py-0
  .page-content
    max-width 960px

.section-1
  background $smoke
  & > div
    max-width 1170px
</style>
