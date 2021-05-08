<template lang="pug">
.block-about-and-missions.my-1.px-4
  nuxt-link.inline-block.link-block-about.w-inline-block(:to="blok.lien.url")
    .image-block-about(:style="{ 'background-image': `url(${blok.image.filename})` }")
    .block-white
      h3.block-title {{ blok.titre }}
      p.paragraph {{ blok.extrait }}
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
.image-block-about {
  border-radius: 5px;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
