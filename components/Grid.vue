<template lang="pug">
.flex.py-8.mb-6(v-editable="blok")
  component(:key="blok._uid" v-for="blok in blok.blocs" :blok="blok" :is="blok.component")
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
