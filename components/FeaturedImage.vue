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
  @apply bg-cover bg-no-repeat rounded-tl-md rounded-tr-md
  background-position 50% 50%
</style>
