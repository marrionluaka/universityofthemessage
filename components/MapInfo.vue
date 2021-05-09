<template lang="pug">
.flex.flex-wrap.justify-between.py-8.mb-6(v-editable="blok")
  .my-1.px-4(class="w-full md:w-1/2")
    .map The Map
  .my-1.px-4(class="w-full md:w-1/2")
    h2.section-title.left Plan a visit
    .break
    p
      | Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
      | In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis.

    .flex.flex-col(class="md:flex-row")
      .pr-8
        .flex.items-center
          img.mr-2.mb-2(src='~/assets/images/clock.svg' width='20' alt='')
          h6 Meeting Times
        p
          | Sunday 10 am &middot; 11 am &middot; 6 pm
          br
          | Wednesday 7:30 pm
      .col-location.pt-4(class="md:pt-0 md:pl-8")
        .flex
          img.mr-2.mb-2(src='~/assets/images/marker.svg' width='16' alt='')
          h6.capitalize {{ $t('emplacement') }}
        p
          | 5678 &nbsp;Seltice Way
          br
          | Coeur D Alene, ID 12345
    nuxt-link.button-orange.w-button(to='/contact') CONTACT US

    //- .flex.map__info
    //-   p {{ blok.schedule }}
    //-   p {{ blok.location }}
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
.col-location
  border-style none
  border-top-style solid
  border-width 1px
  border-color #e2e2e2
  +breakpoint(mobile-landscape)
    border-top-style none
    border-left-style solid
    
</style>