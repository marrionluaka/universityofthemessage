<template lang="pug">
BlogCard(:article="article" v-if="article.columns && article.columns == 2")
StaffCard(:article="article" v-else-if="article.columns && article.columns == 4")
.my-1.px-3.py-3.w-full(v-else class="sm:w-1/2 lg:py-0 lg:w-1/3")
  FeaturedCard.relative(
    :link="article.link"
    :title="article.title"
    :excerpt="article.excerpt"
    :src="article.featured_image.filename"
  )
    template(#featured-image)
      EventSticker.sticker(v-if="eventData.start" :date="formateDate(eventData.start)")
      FeaturedImage(:src="article.featured_image.filename")

    template(#default)
      .h-full.rounded-bl-md.rounded-br-md.p-4.bg-white.text-center(class="px-8 md:px-10")
        h3(class="text-2xl") {{ article.title }}
        p(class="text-sm lg:text-base") {{ excerpt(article.excerpt || 'Description manquante...') }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import BlogCard from '~/components/BlogCard.vue'
import StaffCard from '~/components/StaffCard.vue'
import EventSticker from '~/components/EventSticker.vue'

import { excerpt } from '~/utils'
import { useEventSchedule } from '~/hooks/useEventSchedule'

export default defineComponent({
  components: { BlogCard, StaffCard, EventSticker },

  props: {
    article: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const { eventData, setEventData, formateDate } = useEventSchedule()
    setEventData(props.article.body)
    return { excerpt, eventData, formateDate }
  }
})
</script>

<style lang="stylus" scoped>
.sticker
  position absolute
  right 12px
  top 75px

.img
  min-height 13rem
</style>
