<template lang="pug">
div
  template(v-if="blok.component")
    h2 {{ blok.title }}
    p {{ blok.subtitle }}
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
