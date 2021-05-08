<template lang="pug">
.flex.py-8.mb-6(v-editable="blok")
  .my-1.px-4
    .map The Map
    .flex.map__info
      p {{ blok.schedule }}
      p {{ blok.location }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },

  setup() {}
})
</script>

<style lang="stylus" scoped></style>
