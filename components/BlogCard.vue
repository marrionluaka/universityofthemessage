<template lang="pug">
.flex.flex-col.my-4.px-4.py-3(class="md:py-0 w-full sm:w-1/2")
  FeaturedCard(
    :link="article.link"
    :title="article.title"
    :excerpt="article.excerpt"
    :src="article.featured_image.filename"
  )
    template(#default)
      .h-full.flex.flex-col.items-center.justify-center.rounded-bl-md.rounded-br-md.p-4.bg-white.text-center(class="px-8 md:px-16")
        h3.excerpt.capitalize.text-xl(class="sm:text-2xl md:text-3xl") {{ excerpt(article.title) }}
        p.blog-date(class="text-sm lg:text-base") {{ formattedDate }}
</template>

<script lang="ts">
// @ts-ignore
import { DateTime } from 'luxon'
import { defineComponent, computed } from '@vue/composition-api'

import { excerpt } from '~/utils'

export default defineComponent({
  props: {
    article: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    return {
      excerpt,
      formattedDate: computed(() => DateTime.fromISO(props.article.date_published).toFormat('LLL dd, yyyy'))
    }
  }
})
</script>

<style lang="stylus" scoped>
.blog-date
  color $light-gray
</style>
