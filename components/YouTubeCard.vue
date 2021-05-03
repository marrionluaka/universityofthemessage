<template lang="pug">
li.my-1.px-1.pb-4(class="w-full sm:pb-2 sm:w-1/2 md:w-1/3 lg:pb-0 lg:w-1/4")
  button.w-full.appearance-none(@click="$emit('click', video.snippet.resourceId.videoId)")
    img.rounded-lg.w-full(:src="video.snippet.thumbnails.medium.url" :title="video.snippet.title" alt="")
    h3.yt-title.p-2.text-sm.font-bold.px-4 {{ video.snippet.title }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    video: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="stylus" scoped>
.yt-title
  +breakpoint(mobile-landscape)
    text-overflow ellipsis
    white-space nowrap
    overflow hidden
</style>
