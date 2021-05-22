<template lang="pug">
#to-top(ref='toTop' v-scroll-to-top)
  svg.w-6.h-6.text-white(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
    path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 15l7-7 7 7')
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import scrollToTop from './directives/scroll-to-top'

export default defineComponent({
  directives: { scrollToTop }
})
</script>

<style lang="stylus" scoped>
#to-top
  @apply rounded-lg p-4
  z-index 9
  right: 5%
  bottom: 7%
  opacity: 0
  background-color $orange
  color: #dad8d8
  position: fixed
  font-size: 24px
  transition: opacity .5s ease
  background: $bg-grey
  &.show
    opacity: 1
    cursor: pointer
</style>
