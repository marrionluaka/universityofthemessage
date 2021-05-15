<template lang="pug">
.page-links
  h2.page-links__title
    nuxt-link.capitalize(:to="parentLink.path") {{ $t(parentLink.name) }}
  ul.min-list
    li(v-for="(link, index) in links" :key="index" :class="{ 'current_page_item': isActive(link) }")
      nuxt-link.capitalize(:to="link.path") {{ link.name }}
</template>

<script lang="ts">
import { useState } from 'vuex-composition-helpers'
import { defineComponent, PropType } from '@vue/composition-api'

import { useContext } from '~/hooks/useContext'
import { ILink } from '~/hooks/usePageLinks'

export default defineComponent({
  props: {
    parentLink: {
      type: Object as PropType<ILink>,
      required: true
    },
    links: {
      type: Array as PropType<ILink[]>,
      required: true
    }
  },

  setup() {
    const { context } = useContext()
    const { i18n } = useState(['i18n'])

    const isActive = (link: ILink) => {
      const slug = i18n.value.routeParams[context.i18n.locale]?.slug
      return link.path.includes(slug)
    }

    return { isActive }
  }
})
</script>

<style lang="stylus" scoped>
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
    padding: 20px 0
    background-color: $mainBlue
    color: #FFF
    a
      color: #FFF
      text-decoration: none
      background-color: $mainBlue
  li
    border-top: 1px solid $beige //color($beige l(-14%))
  li:first-child
    border-top: none
  &__active,
  & .current_page_item
    text-align: center
    background-color: $beige //color($beige blackness(+11%) s(+50%))
    color: $mainBlue
    font-weight: bold
  li a
    display: block
    text-align: center
    padding: 17px 10px
    text-decoration: none
    color: $mainBlue
    transition: all .3s
  li a:hover
    color: $mainBlue //color($mainBlue b(+6%))
    background-color: $beige //color($beige blackness(+18%) s(+65%))
</style>
