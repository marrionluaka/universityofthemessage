<template lang="pug">
section
  PageBanner(className='text-center text-white')
    h1.headline.headline--large Sermons

  .container.container--narrow.mx-auto.px-6
    section.flex.justify-center.items-center.py-4
      #player

    section
      ul.flex.flex-wrap.my-8.-mx-1(v-if="videos")
        li.my-1.px-1(v-for="video in videos" :key="video.id" class="w-1/2 md:w-1/3 lg:w-1/4")
          button.appearance-none(@click="setCurrentPlaying(video.snippet.resourceId.videoId)")
            p
              img(
                :width="video.snippet.thumbnails.medium.width"
                :height="video.snippet.thumbnails.medium.height"
                :src="video.snippet.thumbnails.medium.url"
              )
            h3.yt-title {{ video.snippet.title }}

    section
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
