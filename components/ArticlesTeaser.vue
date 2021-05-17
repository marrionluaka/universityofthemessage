<template lang="pug">
BlogCard(:article="article" v-if="article.columns && article.columns == 2")
StaffCard(:article="article" v-else-if="article.columns && article.columns == 4")
.my-1.px-3.py-3.w-full(v-else class="sm:w-1/2 lg:py-0 lg:w-1/3")
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

import BlogCard from '~/components/BlogCard.vue'
import StaffCard from '~/components/StaffCard.vue'

export default defineComponent({
  components: { BlogCard, StaffCard },

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
  min-height 13rem
</style>
