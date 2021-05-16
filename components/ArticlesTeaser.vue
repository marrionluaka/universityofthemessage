<template lang="pug">
div(v-if="article.columns && article.columns < 3" class="my-4 px-4 py-3 md:py-0 w-full sm:w-1/2")
  FeaturedCard(
    :link="article.link"
    :title="article.title"
    :excerpt="article.excerpt"
    :src="article.featured_image.filename"
  )
div(v-else class="my-1 px-3 py-3 w-full sm:w-1/2 lg:py-0 lg:w-1/3")
  FeaturedCard(
    :link="article.link"
    :title="article.title"
    :excerpt="article.excerpt"
    :src="article.featured_image.filename"
  )
    template(#featured-image)
      FeaturedImage(:src="article.featured_image.filename")
    template(#default)
      .h-full.rounded-bl-md.rounded-br-md.p-4.bg-white.text-center(class="px-8 md:px-16")
        h3(class="text-2xl") {{ article.title }}
        p(class="text-sm lg:text-base") {{ article.excerpt || 'some text describing what is happening in the scene' }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    article: {
      type: Object,
      required: true
    }
  },

  filters: {
    formatDate: function (value: string): string | undefined {
      if (value) {
        return new Date(value).toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'long' })
      }
    }
  }
})
</script>

<style lang="stylus" scoped>
.img
  min-height 13rem
</style>
