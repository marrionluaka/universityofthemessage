<template lang="pug">
div
  img(:src="article.featured_image.filename")
  h2.font-serif.pt-2.pb-1.text-2xl.font-bold(class="md:text-3xl") {{ article.title }}
  //- p.article-date.uppercase.pb-6.leading-relaxed
  //-   | POSTED ON 
  //-   span {{ articleDate | formatDate }}
  //- p.pb-6.leading-loose {{ articleContent.excerpt }}
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
