<template lang="pug">
Page(v-if="story" :story="story.content")
  template(#banner)
    PostBanner(:title="story.content.title" :imgSrc="story.content.featured_image.filename")
      template(#date)
        .event
          .text-lg.text-white Sep
          .text-3xl.text-white 15

      template(#schedule)
        .schedule(class="md:px-0")
          .w-full.my-1(class="sm:w-1/2 sm:px-1 sm:pl-0")
            .schedule__time.pt-2.pb-4(class="md:py-6")
              .flex.justify-start.items-center
                TimeClock.mr-2.-mb-1(fill="white")
                h6.mb-0.text-base.text-white Times
              .info-text-white {{ eventData.start }}

          .w-full.my-1(class="sm:w-1/2 sm:px-1 sm:pr-0")
            .schedule__location.pt-2.pb-4(class="md:py-6")
              .flex.justify-start.items-center
                LocationMarker.mr-2.-mb-1.text-white(fill="white")
                h6.mb-0.text-base.text-white Location
              .info-text-white {{ eventData.location }}
</template>

<script lang="ts">
// @ts-ignore
import { DateTime } from 'luxon'
import { pipe, split, last } from 'ramda'
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import Page from '~/components/Page.vue'
import PostBanner from '~/components/PostBanner.vue'
import { TimeClock, LocationMarker } from '~/components/icons/'

import { useFetchStory } from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

export default defineComponent({
  components: { Page, PostBanner, TimeClock, LocationMarker },

  nuxtI18n: {
    paths: {
      en: '/events/:slug',
      fr: '/evenements/:slug'
    }
  },

  setup() {
    const eventData: Ref<any> = ref({
      start: '8:00 AM – 9:00 AM; Sep 15, 2021',
      end: '8:00 AM – 9:00 AM; Sep 15, 2021',
      location: '5678 Seltice Way Coeur D Alene, ID 33232'
    })
    const { story, fetchStory } = useFetchStory()
    const { setTranslatedSlugs } = useTranslatedSlugs()

    onMounted(async () => {
      const getCurrentPath = pipe(split('/'), last)
      await fetchStory(`evenements/${getCurrentPath(location.pathname)}`)
      await setTranslatedSlugs(story.value)

      eventData.value = story.value.content.body?.find((x: any) => x.component === 'EventSchedule')
      console.log('eventData', DateTime.fromISO('2021-05-14 08:00'))
    })

    return { story, eventData }
  }
})
</script>

<style lang="stylus" scoped>
.event
  @apply flex flex-col items-center justify-center rounded-full -mt-16 w-20 h-20
  font-family Gayathri, sans-serif
  background-color $purple

.schedule
  @apply flex flex-wrap justify-between my-1 mx-auto
  width 95%
  +breakpoint(mobile-landscape)
    width 90%
  max-width 970px

  &__time
    @apply flex flex-col items-center justify-center rounded-md
    background-color $turqoise
    color $white
  &__location
    @apply flex flex-col items-center justify-center rounded-md
    background-color $copper
    color $white
</style>
