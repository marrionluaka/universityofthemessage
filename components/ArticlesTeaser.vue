<template lang="pug">
div
  FeaturedImage(:src="article.featured_image.filename")
  h2.font-serif.pt-2.pb-1.text-2xl.font-bold(class="md:text-3xl") {{ article.title }}
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

<style lang="stylus">
.article-date
  font-size 10px

</style>
