<template lang="pug">
  section
    Page(v-if="story" :story="story.content")
      template
        PageLinks(v-if="links.length" :links="links" :parentLink="parentLink")
        div(v-for="blok in story.content.body" :key='blok._uid')
          component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { pipe, split, last } from 'ramda'
import { defineComponent, onMounted } from '@vue/composition-api'

import usePageLinks from '~/hooks/usePageLinks'
import useFetchStory from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

import Page from '~/components/Page.vue'
import PageLinks from '~/components/PageLinks.vue'
import PageContent from '~/components/PageContent.vue'

export default defineComponent({
  components: { Page, PageLinks, 'page-content': PageContent },

  nuxtI18n: {
    paths: {
      en: '/about/:slug',
      fr: '/a-propos/:slug'
    }
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    const { setTranslatedSlugs } = useTranslatedSlugs()
    const { links, parentLink } = usePageLinks('a-propos')

    onMounted(async () => {
      const getCurrentPath = pipe(split('/'), last)
      await fetchStory(`a-propos/${getCurrentPath(location.pathname)}`)
      await setTranslatedSlugs(story.value)
    })

    return { story, links, parentLink }
  }
})
</script>

<style lang="stylus" scoped>
.metabox
  background-color: $beige
  border-radius: 3px
  padding: 10px 15px
  display: inline-block
  margin-bottom: 30px
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.07)
  &--position-up
    position: absolute
    top: 0
    transform: translateY(-50%)
  &--with-home-link
    padding: 0
  &__main
    padding: 10px 15px 10px 11px
  p
    margin: 0
    font-size: .9rem
    color: $beige //color($beige l(-45%) s(-33%))
  a
    color: $beige //color($beige l(-45%) s(-33%))
    text-decoration: none
    font-weight: bold
  a:hover
    text-decoration: underline
  & &__blog-home-link
    background-color: $mainBlue
    color: #FFF
    display: inline-block
    padding: 10px 15px
    border-radius: 3px 0 0 3px
    font-weight: normal
  & &__blog-home-link:hover
    text-decoration: none
    background-color: color($mainBlue l(-5%))
</style>
