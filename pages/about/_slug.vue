<template lang="pug">
  section
    Page
      template(#default="{ body }")
        BreadCrumbs.metabox.metabox--position-up.metabox--with-home-link
          template(#default="{ crumbs }")
            p
              nuxt-link.metabox__blog-home-link(:to="crumbs[0].path")
                i.fa.fa-home(aria-hidden='true')
                |  Back to {{ crumbs[0].name }}
              span.metabox__main {{ crumbs[1].name }}

        PageLinks(v-if="links.length" :parentLink="parentLink" :links="links")
        div(v-for="blok in body" :key='blok._uid')
          component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import usePageLinks from '~/hooks/usePageLinks'

import Page from '~/components/Page.vue'
import PageLinks from '~/components/PageLinks.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import PageContent from '~/components/PageContent.vue'

export default defineComponent({
  components: { Page, PageLinks, BreadCrumbs, 'page-content': PageContent },

  setup() {
    const { links, parentLink } = usePageLinks('about')
    return { links, parentLink }
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
