<template lang="pug">
.featured-articles(v-editable='blok')
  h2(class="text-2xl sm:text-3xl lg:text-4xl") {{ blok.title }}
  .break
  p.featured-articles__paragraph.text-base.text-center {{ blok.subtitle }}
  ArticleList(:path="blok.path" :quantity="blok.quantity")
  nuxt-link.btn(:to="localePath(sanitizedPath)") {{ $t('plus-d-evenements') }}
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const sanitizedPath: ComputedRef<string> = computed(() => props.blok.path.replace(/\/$/, ''))
    return { sanitizedPath }
  }
})
</script>

<style lang="stylus" scoped>
.featured-articles
  @apply flex flex-col items-center justify-center

  &__paragraph
    max-width 810px
</style>