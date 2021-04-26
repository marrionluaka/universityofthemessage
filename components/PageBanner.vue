<template lang="pug">
.page-banner
  .page-banner__bg-image(style='background-image: url(https://images.unsplash.com/photo-1488188840666-e2308741a62f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80);')
  .page-banner__content.container.container--narrow
    h1.page-banner__title {{ blok.title }}
    .page-banner__intro
      p {{ blok.subtitle }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface IBanner {
  title: string
  subtitle: string
}

export default defineComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="stylus" scoped>
.page-banner
  background-color #000
  padding 80px 0 40px 0
  position relative
  +breakpoint(mobile)
    padding 130px 0 60px 0

  &__content
    position relative
    z-index 2

  &__title
    font-weight 300
    font-size 3.6rem
    margin 0 0 1rem 0
    color #FFF
    +breakpoint(mobile)
      font-size 5rem

  &__bg-image
    opacity .33
    background-size cover
    position absolute
    top 0
    bottom 0
    left 0
    right 0

  &__intro
    font-weight 300
    font-size 1.2rem
    line-height 1.3
    color #EDEDED
    +breakpoint(mobile)
      font-size 1.65rem

  &__intro p
    margin 0
</style>