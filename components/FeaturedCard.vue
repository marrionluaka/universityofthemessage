<template lang="pug">
nuxt-link.card(:to="link" :title="title")
  slot(name="featured-image")
    FeaturedImage.card__img(:src="src")

  slot
    .card__block(class="pt-4 px-8 pb-8 md:pt-8 md:px-16 md:pt-16")
      h4.card__title(class="mt-5 text-2xl sm:text-3xl lg:text-4xl") {{ title }}
      p.card__paragraph(class="text-sm lg:text-base") {{ excerpt }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    link: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="stylus" scoped>
.card
  @apply h-full rounded-bl-md rounded-br-md flex flex-col flex-grow
  overflow hidden
  transition transform 300ms ease, box-shadow 300ms ease
  transition box-shadow 300ms ease, -webkit-transform 300ms ease
  -webkit-transition box-shadow 300ms ease, -webkit-transform 300ms ease
  transition transform 300ms ease, box-shadow 300ms ease, -webkit-transform 300ms ease

  &:hover
    @apply shadow-lg
    -webkit-transform scale(1.05)
    -ms-transform scale(1.05)
    transform scale(1.05)

  &__img
    min-height 15rem
    +breakpoint(desktop-small)
      min-height 20rem

  &__block
    @apply h-full bg-white rounded-bl-md rounded-br-md
    
  &__title
    text-transform capitalize
</style>
