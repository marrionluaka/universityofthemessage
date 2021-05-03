<template lang="pug">
section
  PageBanner(className='text-center text-white')
    h1.headline.headline--large Sermons

  .container.mx-auto.px-6
    section.flex.justify-center.items-center.py-4
      #player.player 
    
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

    section
      ul.flex.flex-wrap.my-4.-mx-1(v-if="videos")
        li.my-1.px-1.pb-4(v-for="video in videos" :key="video.id" class="w-full sm:pb-2 sm:w-1/2 md:w-1/3 lg:pb-0 lg:w-1/4")
          button.w-full.appearance-none(@click="setCurrentPlaying(video.snippet.resourceId.videoId)")
            p
              img.rounded-lg.w-full(:src="video.snippet.thumbnails.medium.url" :title="video.snippet.title" alt="")
            h3.yt-title.p-2.text-sm.font-bold.px-4 {{ video.snippet.title }}

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
import { defineComponent, watch, onMounted } from '@vue/composition-api'

import useYTPlayer from '~/hooks/useYTPlayer'
import usePagination from '~/hooks/usePagination'
import useYTPlaylist from '~/hooks/useYTPlaylist'
import PageBanner from '~/components/PageBanner.vue'

import CustomPagination from '~/components/CustomPagination.vue'

export default defineComponent({
  components: { PageBanner, Pagination },

  setup() {
    const { player, initPlayer, setCurrentPlaying } = useYTPlayer()
    const { videos, setNewPlaylist, populatePlaylist } = useYTPlaylist()
    const { totalResults, resultsPerPage, paginate, currentPage } = usePagination()

    watch(
      () => currentPage.value,
      async (page: number, oldPage: number) => {
        if (page > oldPage) {
          await setNewPlaylist('nextPage')
        } else {
          await setNewPlaylist('prevPage')
        }
      }
    )

    onMounted(async () => {
      await populatePlaylist((data: any) => {
        initPlayer()

        totalResults.value = data.pageInfo.totalResults
        resultsPerPage.value = data.pageInfo.resultsPerPage
        player.value.load(data.items[0].snippet.resourceId.videoId)
      })
    })

    return {
      videos,
      paginate,
      currentPage,
      totalResults,
      resultsPerPage,
      setCurrentPlaying,
      opts: { template: CustomPagination }
    }
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

.yt-title
  text-overflow ellipsis
  white-space nowrap
  overflow hidden
</style>
