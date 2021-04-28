<template lang="pug">
  div
    rich-text-renderer(:document="blok.body")
</template>

<script lang="ts">
require('storyblok-js-client/dist/schema')
require('storyblok-js-client/dist/richTextResolver')

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
