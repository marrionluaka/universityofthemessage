<template lang="pug">
div
  div
    img.rounded(:src="blok.img.filename" :alt="blok.img.alt")
  .mb-4
    .flex.justify-center.-mt-8
      a.cursor-pointer.rounded-full.border-none.w-16.h-16.flex.justify-center.items-center.social-btn(
        :href="blok.facebook.url" target="_blank"
      )
        font-awesome-icon.text-white.text-lg(:icon="faFacebookF")
      a.cursor-pointer.rounded-full.mx-2.border-none.w-16.h-16.flex.justify-center.items-center.social-btn(
        :href="blok.whatsapp.url" target="_blank"
      )
        font-awesome-icon.text-white.text-lg(:icon="faWhatsapp")
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons'

export default defineComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {
      faWhatsapp: computed(() => faWhatsapp),
      faFacebookF: computed(() => faFacebookF)
    }
  }
})
</script>

<style lang="stylus" scoped>
.social-btn
  background-color $turqoise
</style>
