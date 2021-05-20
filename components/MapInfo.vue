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
          //- img.mr-2.mb-2(src='~/assets/images/clock.svg' width='20' alt='')
          h6.capitalize {{ $t('heures-de-reunion') }}
        p
          span.capitalize {{ $t('dimanche') }} 
          | 10 am &middot; 11 am &middot; 6 pm
          br
          span.capitalize {{ $t('mercredi') }} 
          | 7:30 pm
      .col-location.pt-4(class="md:pt-0 md:pl-8")
        .flex
          //- img.mr-2.mb-2(src='~/assets/images/marker.svg' width='16' alt='')
          h6.capitalize {{ $t('emplacement') }}
        p
          | 5678 &nbsp;Seltice Way
          br
          | Coeur D Alene, ID 12345

    nuxt-link.btn(:to="localePath('contact')") {{ $t('contactez-nous') }}
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
</style>
