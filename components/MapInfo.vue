<template lang="pug">
.flex.flex-wrap.justify-between.py-8.mb-6(v-editable="blok")
  .my-1(class="px-2 md:px-6 w-full md:w-1/2")
    .map(v-html="blok.address")
  .my-1(class="px-2 md:px-6 w-full md:w-1/2")
    h2(class="capitalize text-2xl sm:text-3xl lg:text-4xl") {{ $t('planifier-une-visite') }}
    .break
    p.text-base {{ blok.text }}

    .flex.flex-col.mb-6(class="md:flex-row")
      .pr-8
        .flex.items-center
          TimeClock.mr-2.mb-3
          h6.capitalize {{ $t('heures-de-reunion') }}
        p
          span.capitalize {{ $t('dimanche') }} 
          span(v-html="$t('dimanche-heures')")
          br
          span.capitalize {{ $t('mercredi') }} 
          | {{ $t('mercredi-heures') }}
      .col-location.pt-4(class="md:pt-0 md:pl-8")
        .flex.items-center
          LocationMarker.mr-2.mb-3
          h6.capitalize {{ $t('adresse') }}
        p
          | 18 eme rue Q. industriel
          br
          | Commune de Limete

    .flex
      a.cursor-pointer.rounded-full.border-none.w-10.h-10.flex.justify-center.items-center.btn-fb(
        href="https://www.facebook.com/branhameglise.delimete/" target="_blank"
      )
        font-awesome-icon.text-white.text-xl(:icon="faFacebookF")
      a.cursor-pointer.rounded-full.mx-4.border-none.w-10.h-10.flex.justify-center.items-center.btn-wa(
        href="https://wa.me/243818290184/" target="_blank"
      )
        font-awesome-icon.text-white.text-xl(:icon="faWhatsapp")
      a.cursor-pointer.rounded-full.border-none.w-10.h-10.flex.justify-center.items-center.btn-en(
        href="mailto:Missionevangeliquebranhameglis@gmail.com"
      )
        font-awesome-icon.text-white.text-xl(:icon="faEnvelope")
</template>

<script lang="ts">
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { defineComponent, computed } from '@vue/composition-api'
import { faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons'

import { TimeClock, LocationMarker } from '~/components/icons/'

export default defineComponent({
  components: { TimeClock, LocationMarker },

  props: {
    blok: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {
      faEnvelope: computed(() => faEnvelope),
      faWhatsapp: computed(() => faWhatsapp),
      faFacebookF: computed(() => faFacebookF)
    }
  }
})
</script>

<style lang="stylus" scoped>
>>> iframe
  @apply w-full rounded-lg

.col-location
  border-style none
  border-top-style solid
  border-width 1px
  border-color #e2e2e2
  +breakpoint(mobile-landscape)
    border-top-style none
    border-left-style solid

.btn-fb
  background-color $fb-blue
.btn-wa
  background-color $wa-green
.btn-en
  background-color $orange
</style>
