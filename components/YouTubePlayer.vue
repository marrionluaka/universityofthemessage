<template lang="pug">
  #player
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from '@vue/composition-api'
import useYTPlayer from '~/hooks/useYTPlayer'

export default defineComponent({
  props: {
    videoId: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const { player, initPlayer, setCurrentPlaying } = useYTPlayer()

    watch(
      () => props.videoId,
      (videoId: string) => {
        document.getElementById('player')?.scrollIntoView({behavior: 'smooth'})
        setCurrentPlaying(videoId)
      }
    )

    onMounted(() => {
      initPlayer()
      player.value.load(props.videoId)
    })
  }
})
</script>

<style lang="stylus">
#player
  min-height 360px
  +breakpoint(mobile-landscape)
    min-height 460px
  +breakpoint(tablet-landscape-up)
    min-height 608px
</style>
