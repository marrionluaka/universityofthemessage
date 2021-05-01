<template lang="pug">
section.page
  template(v-if='story.component')
    PageBanner(v-if="bannerData")
      h1.page__title {{ bannerData.title }}
      .page__intro
        p {{ bannerData.subtitle }}

    .container.container--narrow.mx-auto.px-6
      slot
        BreadCrumbs
        component(v-for='blok in story.body' :key='blok._uid' :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'


import useStoryBridge from '~/hooks/useStoryBridge'

import PageBanner from './PageBanner.vue'
import BreadCrumbs from './BreadCrumbs.vue'

interface IBanner {
  title: string
  subtitle: string
}

export default defineComponent({
  components: { PageBanner, BreadCrumbs },

  props: {
    story: {
      type: Object,
      required: true
    }
  },

  setup({ story }) {
    const { setStoryBridgeListeners } = useStoryBridge()
    const isPageBanner = (x: any) => x.component === 'page-banner'
    const bannerData: Ref<IBanner | null> = ref(null)

    onMounted(() => {
      const defaultData = { title: "l'Université du message", subtitle: "La parole de Dieu faite chair" }

      setStoryBridgeListeners(story.content)
      bannerData.value = story.body.find(isPageBanner) || defaultData
    })

    return { bannerData }
  }
})
</script>

<style lang="stylus">
.page
  &__title
    font-weight 300
    font-size 3.6rem
    margin 0 0 1rem 0
    color #FFF
    +breakpoint(mobile)
      font-size 5rem

  &__intro
    font-weight 300
    font-size 1.2rem
    line-height 1.3
    color #EDEDED
    +breakpoint(mobile)
      font-size 1.65rem

  &__intro p
    margin 0

  &__container
    margin 3rem auto 0
    max-width 960px
</style>
