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
  img
    display inline-block
    max-width 100%
    border-radius 5px
  p
    @apply mb-4
    font-size 15px
  blockquote
    font-style italic
    padding 20px
    margin-bottom 1rem
    border-left-width 3px
    border-left-style solid
    border-left-color $orange
  hr
    @apply my-6
  ol
    @apply list-decimal pl-8 py-4
  li
    @apply pl-2
    font-weight 700
    p
      font-weight 700
      font-size 15px
</style>
