<template lang="pug">
.-mt-4.bg-gray-300.p-10
  h2 {{ blok.title }}
  p {{ blok.subtitle }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface IBanner {
  title: string
  subtitle: string
}

export default defineComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
})
</script>
