<template lang="pug">
section
  PageBanner
    h1.page__title.mb-0 Sermons
    .page__intro
      p.text-white.text-lg.font-light.capitalize(class="md:text-3xl") {{ $t('ecoute-sermons') }}

  .container.mx-auto.px-6.mt-16
    section.flex.justify-center.items-center.py-4(v-if="currentVideoId")
      YouTubePlayer(:videoId="currentVideoId")

    section.flex.justify-center.items-center.py-4
      a.yt-subscribe(target='_blank' href='https://www.youtube.com/channel/UCGFGRz9g8urP8GsgTzV48hg?sub_confirmation=1')
        img(alt='subscribe' src='~/assets/images/play-subscribe.png')
        | {{ $t('abonnez-vous') }}

    section.pt-4
      Pagination(
        :options="opts"
        @paginate="paginate"
        v-model="currentPage"
        :records="totalResults"
        :per-page="resultsPerPage"
      )

    YouTubePlayList(:currentPage="currentPage" @on-populated-list="onPopulatedList")
      template(#default="{ videos }")
        YouTubeCard(
          v-for="video in videos"
          :key="video.id"
          :video="video"
          :isPlaying="currentVideoId === video.snippet.resourceId.videoId"
          @click="setCurrentPlaying"
        )

    section.pb-4
      Pagination(
        :options="opts"
        @paginate="paginate"
        v-model="currentPage"
        :records="totalResults"
        :per-page="resultsPerPage"
      )
</template>

<script lang="ts">
// @ts-ignore
import Pagination from 'vue-pagination-2'
import { defineComponent, ref, Ref } from '@vue/composition-api'

import usePagination from '~/hooks/usePagination'
import PageBanner from '~/components/PageBanner.vue'
import YouTubePlayer from '~/components/YouTubePlayer.vue'
import YouTubePlayList from '~/components/YouTubePlayList.vue'
import CustomPagination from '~/components/CustomPagination.vue'

export default defineComponent({
  components: { PageBanner, Pagination, YouTubePlayer, YouTubePlayList },

  setup() {
    const currentVideoId: Ref<string> = ref('')
    const { totalResults, resultsPerPage, paginate, currentPage } = usePagination()

    const setCurrentPlaying = (videoId: string) => (currentVideoId.value = videoId)
    const onPopulatedList = (data: any) => {
      totalResults.value = data.pageInfo.totalResults
      resultsPerPage.value = data.pageInfo.resultsPerPage
      currentVideoId.value = data.items[0].snippet.resourceId.videoId
    }

    return {
      paginate,
      currentPage,
      totalResults,
      resultsPerPage,
      currentVideoId,
      onPopulatedList,
      setCurrentPlaying,
      opts: { template: CustomPagination }
    }
  }
})
</script>
 
<style lang="stylus">
.yt-subscribe
  color $white
  padding 5px 10px
  border-radius 3px
  display inline-block
  text-decoration none
  background-color $yt-red
  img
    width 20px
    height auto
    vertical-align middle
    padding 0 6px 3px 0
    display inline-block
    background transparent
    -webkit-box-shadow none
    box-shadow none
    margin 0
</style>
