<template lang="pug">
li.yt-card.my-1.px-2.pb-4(
  v-yt-hover
  :class="[isPlaying ? 'playing' : '', 'w-full sm:pb-2 sm:w-1/2 md:w-1/3 lg:pb-0']"
)
  button.w-full.appearance-none(@click="$emit('click', video.snippet.resourceId.videoId)")
    .yt-img(
      :title="video.snippet.title"
      :style="{ 'background-image': `url(${video.snippet.thumbnails.medium.url})`}"
    )
      div.yt-play.flex.justify-center.items-center
        img(alt='subscribe' src='~/assets/images/play-hover.png')

    p.yt-title.excerpt {{ video.snippet.title }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ytHover from '~/components/directives/yt-hover'

export default defineComponent({
  props: {
    video: {
      type: Object,
      required: true
    },
    isPlaying: {
      type: Boolean,
      required: false
    }
  },

  directives: { ytHover }
})
</script>

<style lang="stylus" scoped>
.yt
  &-card.hover, &-card.playing
    opacity 1
    height auto
    position relative
    transition opacity ease-out .3s

    .yt-play
      top 0
      opacity 1
      transition all ease-out .3s

  &-play
    left 0
    opacity 0
    top -10px
    width 100%
    height 100%
    text-align center
    position absolute
    vertical-align middle
    transition opacity ease-out .3s

    img
      margin 0
      border 0
      padding 0
      width auto
      height auto
      max-width 15%
      min-width 30px
      display inline-block
      vertical-align middle
      box-sizing border-box

  &-img
    height 0
    width 100%
    overflow hidden
    position relative
    padding-top 56.25%
    background-size cover
    background-position center

  &-title
    @apply p-2 px-4 text-sm font-black
</style>
