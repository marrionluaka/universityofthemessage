<template lang="pug">
Page(v-if="story" :story="story.content")
  template(#banner)
    PostBanner(:title="story.content.title" :imgSrc="story.content.featured_image.filename")
      template(#meta)
        .banner-meta.flex.flex-col.items-center(class="md:flex-row")
          //- .banner-meta__category
          //-   .text-white History
          .banner-meta__text Sep 16, 2019
</template>

<script lang="ts">
import { pipe, split, last } from 'ramda'
import { defineComponent, onMounted } from '@vue/composition-api'

import Page from '~/components/Page.vue'
import PostBanner from '~/components/PostBanner.vue'
import { useFetchStory } from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

export default defineComponent({
  components: { Page, PostBanner },

  nuxtI18n: {
    paths: {
      en: '/blog/:slug',
      fr: '/blog/:slug'
    }
  },

  setup() {
    const { story, fetchStory } = useFetchStory()
    const { setTranslatedSlugs } = useTranslatedSlugs()

    onMounted(async () => {
      const getCurrentPath = pipe(split('/'), last)
      await fetchStory(`blog/${getCurrentPath(location.pathname)}`)
      await setTranslatedSlugs(story.value)
    })

    return { story }
  }
})
</script>

<style lang="stylus" scoped>
.banner-meta
  margin-top -15px

  &__category
    display inline-block
    margin 10px 10px 12px
    padding-right 16px
    padding-left 16px
    border-radius 50px
    background-color $turqoise

  &__text
    z-index 1
    margin-right 10px
    margin-left 10px
    color #a7a7b1
    line-height 1.5em
    font-weight 500
    text-align center
</style>
