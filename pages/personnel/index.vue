<template lang="pug">
Page(v-if="story" :story="story.content")
  .container.mx-auto.px-6.py-12
    div(v-for="blok in story.content.body" :key='blok._uid')
      component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import { useFetchStory } from '~/hooks/useFetchStory'
import Page from '~/components/Page.vue'

export default defineComponent({
  name: 'personnel',
  components: { Page },

  nuxtI18n: {
    paths: {
      en: '/staff',
      fr: '/personnel'
    }
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    onMounted(async () => await fetchStory('personnel'))

    return { story }
  }
})
</script>
