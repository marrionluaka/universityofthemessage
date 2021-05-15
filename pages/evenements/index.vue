<template lang="pug">
  section.smoke
    Page(v-if="story" :story="story.content")
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

import { useFetchStory } from '~/hooks/useFetchStory'
import Page from '~/components/Page.vue'

export default defineComponent({
  name: 'evenements',
  components: { Page },

  nuxtI18n: {
    paths: {
      en: '/events',
      fr: '/evenements'
    }
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    onMounted(async () => await fetchStory('evenements'))

    return { story }
  }
})
</script>
