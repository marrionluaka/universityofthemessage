<template lang="pug">
.my-1.px-4
  nuxt-link.inline-block(:to="blok.lien.url")
    FeaturedImage.h-64(:src="blok.image.filename")
    .block
      h3.block__title(class="mb-2.5") {{ blok.titre }}
      p.block__paragraph {{ blok.extrait }}
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
.block
  @apply pt-8 px-16 pb-16
  &__title
    @apply mt-5
  &__paragraph
    @apply text-sm
</style>
