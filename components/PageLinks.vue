<template lang="pug">
transition(name="fade")
  .page-links(v-editable="body" v-show="links.length")
    h2.page-links__title.text-2xl.py-3
      nuxt-link.capitalize(:to="parentLink.path") {{ parentLink.name }}

    ul.min-list
      li(v-for="(link, index) in links" :key="index" :class="{ 'current_page_item': isActive(link.path) }")
        nuxt-link.capitalize(:to="link.path") {{ link.name }}
</template>

<script lang="ts">
import { pipe, split, last } from 'ramda'
import { defineComponent, watch, ref, Ref } from '@vue/composition-api'

import { useFetchArticles } from '~/hooks/useFetchArticles'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

interface ILink {
  path: string
  name: string
  isActiveLink?: boolean
  is_startpage?: boolean
}

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const { articles } = useFetchArticles()
    const { getTranslatedSlug, getTranslatedPath } = useTranslatedSlugs()

    const links: Ref<ILink[]> = ref([])
    const parentLink: Ref<ILink> = ref({ name: '', path: '' })

    watch(
      () => articles.value,
      articles => {
        const story = articles.find(x => x.is_startpage)
        setLinks(story?.slug)
        setParentLink(story)
      }
    )

    const isActive = (path: string) => {
      const getCurrentPath = pipe<string, any, any>(split('/'), last)
      return parentLink.value.path !== location.pathname && path.includes(getCurrentPath(location.pathname))
    }

    const setParentLink = (parentStory: any) => {
      parentLink.value = {
        name: parentStory.content.title,
        path: '/' + getTranslatedPath(parentStory?.slug)
      }
    }

    const setLinks = (parentSlug: string) => {
      links.value = articles.value
        .filter((article: any) => props.body.links.includes(article.uuid))
        .map((story: any) => ({ name: story.content.title, path: '/' + getTranslatedSlug(story, parentSlug) }))
    }

    return { parentLink, links, isActive }
  }
})
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
  transition all 0.5s ease-in-out

.fade-enter, .fade-leave-to
  opacity 0

.page-links
  position: relative
  z-index: 1
  background-color: $beige
  margin: 0 0 40px 0

  +breakpoint(tablet-landscape-up)
    margin: 0 0 40px 20px
    width: 300px
    float: right

  &__title
    margin: 0
    font-weight: normal
    text-align: center
    background-color: $mainBlue
    color: #FFF

    a
      color: #FFF
      text-decoration: none
      background-color: $mainBlue

  li
    border-top: 1px solid $beige

    &:first-child
      border-top: none

    a
      display: block
      text-align: center
      padding: 17px 10px
      text-decoration: none
      color: $mainBlue
      transition: all .3s

      &:hover
        color: $mainBlue
        background-color: darken($beige, 7%)

    &.current_page_item
      text-align: center
      background-color: darken($beige, 7%)
      color: $mainBlue
      font-weight: bold
</style>
