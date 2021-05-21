<template lang="pug">
Page(v-if="story" :story="story.content")
  template(#banner)
    PostBanner(:title="story.content.title" :imgSrc="story.content.featured_image.filename")
      template(#date)
        EventSticker(:date="formateDate(eventData.start)")

      template(#schedule)
        .schedule(class="md:px-0")
          .w-full.my-1(class="sm:w-1/2 sm:px-1 sm:pl-0")
            EventInfo.schedule__time(title="Times")
              template(#icon)
                TimeClock.mr-2.-mb-1(fill="white")
              template(#content)
                p.text-white {{ formateTime(eventData.start, eventData.end) }}; {{ formateDate(eventData.start) }}

          .w-full.my-1(class="sm:w-1/2 sm:px-1 sm:pr-0")
            EventInfo.schedule__location(title="Location")
              template(#icon)
                LocationMarker.mr-2.-mb-1.text-white(fill="white")
              template(#content)
                p.text-white {{ eventData.location }}
</template>

<script lang="ts">
import { pipe, split, last } from 'ramda'
import { defineComponent, onMounted } from '@vue/composition-api'

import Page from '~/components/Page.vue'
import EventInfo from '~/components/EventInfo.vue'
import PostBanner from '~/components/PostBanner.vue'
import EventSticker from '~/components/EventSticker.vue'
import { TimeClock, LocationMarker } from '~/components/icons/'

import { useFetchStory } from '~/hooks/useFetchStory'
import { useEventSchedule } from '~/hooks/useEventSchedule'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

export default defineComponent({
  components: { Page, EventInfo, EventSticker, PostBanner, TimeClock, LocationMarker },

  nuxtI18n: {
    paths: {
      en: '/events/:slug',
      fr: '/evenements/:slug'
    }
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    const { setTranslatedSlugs } = useTranslatedSlugs()
    const { eventData, setEventData, formateTime, formateDate } = useEventSchedule()

    onMounted(async () => {
      const getCurrentPath = pipe(split('/'), last)
      await fetchStory(`evenements/${getCurrentPath(location.pathname)}`)
      await setTranslatedSlugs(story.value)
      setEventData(story.value.content.body)
    })

    return { story, eventData, formateTime, formateDate }
  }
})
</script>

<style lang="stylus" scoped>
.schedule
  @apply flex flex-wrap justify-between my-1 mx-auto
  width 95%
  +breakpoint(mobile-landscape)
    width 90%
  max-width 970px

  &__time
    background-color $turqoise
  &__location
    background-color $copper
</style>
