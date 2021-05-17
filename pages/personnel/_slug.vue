<template lang="pug">
Page(v-if="story" :story="story.content")
  .container.mx-auto.px-6.py-12
    .flex.flex-wrap.justify-between
      .flex.flex-col(
        v-for="blok in story.content.body"
        :key='blok._uid'
        :class="{ 'sm:pr-6': blok.component == 'StaffProfile', 'sm:pl-6': blok.component == 'PageContent' }"
        class="md:py-0 w-full sm:w-1/2"
      )
        component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { pipe, split, last } from 'ramda'
import { defineComponent, onMounted } from '@vue/composition-api'

import Page from '~/components/Page.vue'
import StaffProfile from '~/components/StaffProfile.vue'

import { useFetchStory } from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

export default defineComponent({
  components: { Page, StaffProfile },

  nuxtI18n: {
    paths: {
      en: '/staff/:slug',
      fr: '/personnel/:slug'
    }
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    const { setTranslatedSlugs } = useTranslatedSlugs()

    onMounted(async () => {
      const getCurrentPath = pipe(split('/'), last)
      await fetchStory(`personnel/${getCurrentPath(location.pathname)}`)
      await setTranslatedSlugs(story.value)
    })

    return { story }
  }
})
</script>
