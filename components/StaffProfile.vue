<template lang="pug">
div
  div
    img.rounded(:src="blok.img.filename" :alt="blok.img.alt")
  div
    .flex
      a.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center.btn-fb(data-id='fb')
        font-awesome-icon.text-white.text-2xl(:icon="faFacebookF")
      a.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center.btn-wa(data-id='wa')
        font-awesome-icon.text-white.text-2xl(:icon="faWhatsapp")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { faWhatsapp, faRedditAlien, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

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
</style>
