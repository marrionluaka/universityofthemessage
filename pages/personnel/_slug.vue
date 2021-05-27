<template lang="pug">
Page(v-if="story" :story="story.content")
  template(#banner)
    PageBanner.text-center(v-if="story.content.title")
      h1.text-white.mb-0 {{ story.content.title }}
      p.text-white.text-lg.font-light(class="md:text-3xl") {{ story.content.excerpt }}

  .container.container--narrow.mx-auto.px-6.py-24
    .flex.flex-wrap.justify-between
      .flex.flex-col(
        v-for="blok in story.content.body"
        :key='blok._uid'
        class="md:py-0"
      )
        component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { pipe, split, last } from 'ramda'
import { defineComponent, onMounted } from '@vue/composition-api'

import Page from '~/components/Page.vue'
import PageBanner from '~/components/PageBanner.vue'
import StaffProfile from '~/components/StaffProfile.vue'

import { useFetchStory } from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

export default defineComponent({
  components: { Page, StaffProfile, PageBanner },

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
      try {
        const getCurrentPath = pipe(split('/'), last)
        await fetchStory(`personnel/${getCurrentPath(location.pathname)}`)
        await setTranslatedSlugs(story.value)
      } catch (e) {
        // do nothing
      }
    })

    return { story }
  }
})
</script>
