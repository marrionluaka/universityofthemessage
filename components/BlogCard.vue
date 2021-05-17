<template lang="pug">
.flex.flex-col
  FeaturedCard(
    :link="article.link"
    :title="article.title"
    :excerpt="article.excerpt"
    :src="article.featured_image.filename"
  )
    template(#default)
      .h-full.flex.flex-col.items-center.justify-center.rounded-bl-md.rounded-br-md.p-4.bg-white.text-center(class="px-8 md:px-16")
        h3.excerpt.capitalize.text-xl(class="sm:text-2xl md:text-3xl") {{ article.title }}
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
  }
})
</script>
