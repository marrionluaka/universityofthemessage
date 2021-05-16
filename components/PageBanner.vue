<template lang="pug">
.page-banner
  .page-banner__bg-image(:style="getImgUrl")
  .page-banner__content.container.mx-auto(:class="className")
    slot
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from '@vue/composition-api'

export default defineComponent({
  props: {
    imgSrc: {
      type: String,
      required: false,
      default: require('~/assets/images/default-page-banner.jpeg')
    },

    className: {
      type: String,
      required: false,
      default: 'container--narrow'
    }
  },

  setup(props) {
    const getImgUrl:ComputedRef<any> = computed(() => ({ 'background-image': `url(${props.imgSrc}` }))
    return { getImgUrl }
  }
})
</script>

<style lang="stylus" scoped>
.page-banner
  background-color #000
  padding 80px 0px 40px
  position relative
  +breakpoint(mobile)
    padding 130px 0 60px

  &__bg-image
    opacity .33
    background-size cover
    position absolute
    top 0
    bottom 0
    left 0
    right 0

  &__content
    position relative
    z-index 2

.page-banner--hero
  @apply flex flex-col items-center justify-center
  padding 8rem 0 6rem
  +breakpoint(mobile)
    padding 12rem 0 8rem
  +breakpoint(mobile-landscape)
    padding 18rem 0 16rem
</style>
