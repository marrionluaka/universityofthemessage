<template lang="pug">
.page-content
  rich-text-renderer(:document="blok.body")
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
.page-content
  p
    @apply text-lg mb-4
  h2, h3, h4, h5, h6
    @apply mt-8 text-2xl
    +breakpoint(mobile-landscape)
      @apply text-4xl
  blockquote
    font-style italic
    padding 20px
    margin-bottom 1rem
    border-left-width 3px
    border-left-style solid
    border-left-color $font-gray
  ol
    @apply list-decimal pl-8 py-4
  li
    @apply pl-2
    font-weight 700
    p
      font-weight 700
</style>
