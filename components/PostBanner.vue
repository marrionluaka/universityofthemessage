<template lang="pug">
div
  .empty-block
  .banner
    .banner__image.mx-auto(:style="`background-image:url(${imgSrc})`")
    .banner__content.mx-auto
      slot(name="date")
      h2.banner__title.text-3xl(class="md:text-4xl lg:text-5xl") {{ title }}
      slot(name="meta")

    slot(name="schedule")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="stylus" scoped>
.empty-block
  height 286px
  background-color #181733

.banner
  @apply flex flex-col items-center justify-center
  margin-top -160px

  &__image
    width 95%
    height 60vw
    min-height 200px
    +breakpoint(mobile-landscape)
      height 400px
    +breakpoint(desktop-small)
      height 570px
    padding-top 0px
    border-top-left-radius 5px
    border-top-right-radius 5px
    +breakpoint(mobile-landscape)
      border-radius 5px
    background-size cover
    background-position 50% 50%
    background-repeat no-repeat

  &__content
    display flex
    align-items center
    flex-direction column
    justify-content center
    width 95%
    +breakpoint(mobile-landscape)
      width 90%
    max-width 970px
    min-height 100px
    margin-top 0
    +breakpoint(mobile-landscape)
      margin-top -120px
    padding 0 20px 13px
    +breakpoint(mobile-landscape)
      padding 23px 70px 35px
    border-bottom-left-radius 5px
    border-bottom-right-radius 5px
    +breakpoint(mobile-landscape)
      border-radius 5px
    background-color $white

  &__title
    text-transform capitalize
    text-align center
    max-width 726px
</style>
