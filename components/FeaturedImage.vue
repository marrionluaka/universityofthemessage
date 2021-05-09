<template lang="pug">
.img(:style="{ 'background-image': `url(${src || '~/assets/images/empty.jpeg'})` }")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: false
    }
  }
})
</script>

<style lang="stylus" scoped>
.img
  background-size cover
  border-top-left-radius 5px
  border-top-right-radius 5px
  background-position 50% 50%
  background-repeat no-repeat
</style>
