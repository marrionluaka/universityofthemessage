<template lang="pug">
.card(class="my-1 px-3 py-3 md:py-0 w-full sm:w-1/2")
  FeaturedCard(
    :title="blok.titre"
    :link="blok.lien.url"
    :excerpt="blok.extrait"
    :src="blok.image.filename"
  )
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
