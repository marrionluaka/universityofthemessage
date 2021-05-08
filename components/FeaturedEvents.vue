<template lang="pug">
nuxt-link.block.featured-event.my-1.px-4(:to="blok.link")
  .featured-event__img(:style="{ 'background-image': `url(${blok.image.filename})` }")
  .featured-event__content
    h2.featured-event__title {{ blok.title }}
    p.featured-event__schedule {{ blok.schedule }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'evenements-figurent',

  props: {
    blok: {
      type: Object,
      required: true
    }
  },

  setup(props) {}
})
</script>
