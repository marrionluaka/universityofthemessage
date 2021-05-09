<template lang="pug">
.card(class="py-3 md:py-0 w-full md:w-1/2")
  nuxt-link.card__link(:to="blok.lien.url")
    FeaturedImage.card__img(:src="blok.image.filename")
    .card__block(class="pt-4 px-8 pb-8 md:pt-8 md:px-16 md:pt-16")
      h3.card__title(class="text-2xl sm:text-3xl lg:text-4xl") {{ blok.titre }}
      p.card__paragraph(class="text-sm lg:text-base") {{ blok.extrait }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

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
.card
  @apply my-1 px-3

  &__link
    display block
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
    @apply mt-5
</style>
