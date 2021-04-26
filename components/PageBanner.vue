<template lang="pug">
.page-banner
  .page-banner__bg-image(:style="getImgUrl()")
  .page-banner__content.container.mx-auto(:class="className")
    slot
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    imgSrc: {
      type: String,
      required: false,
      default: 'default-page-banner.jpeg'
    },

    className: {
      type: String,
      required: false,
      default: 'container--narrow'
    }
  },

  setup(props) {
    const getImgUrl = () => ({ 'background-image': `url(${require(`~/assets/images/${props.imgSrc}`)}` })
    return { getImgUrl }
  }
})
</script>

<style lang="stylus" scoped>
.page-banner
  background-color #000
  padding 80px 0 40px 0
  position relative
  +breakpoint(mobile)
    padding 130px 0 60px 0

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
</style>
