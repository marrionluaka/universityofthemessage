<template lang="pug">
.flex.flex-col.my-4.px-3.py-3(class="md:py-0 w-full sm:w-1/2 md:w-1/3 lg:py-0 lg:w-1/4")
  FeaturedCard(
    :link="article.link"
    :title="article.title"
    :excerpt="article.excerpt"
    :src="article.featured_image.filename"
  )
    template(#featured-image)
      FeaturedImage(:src="article.featured_image.filename")

    template(#default)
      .h-full.flex.flex-col.items-center.justify-center.rounded-bl-md.rounded-br-md.p-4.bg-white.text-center
        h6.excerpt.capitalize.text-base(class="md:text-lg") {{ article.title }}
        p(class="text-sm lg:text-base") {{ article.excerpt || 'titre' }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    article: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="stylus" scoped>
.img
  min-height 17rem
</style>
