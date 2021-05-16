<template lang="pug">
section.page.smoke  
  PageBanner(v-if="story.title" :imgSrc="story.featured_image.filename")
    h1.page__title.mb-0 {{ story.title }}
    .page__intro
      p.text-white.text-lg.font-light(class="md:text-3xl") {{ story.subtitle }}

  template(v-if='story.component')
    slot
      .container.container--narrow.mx-auto.px-6.py-12
        div(v-for="blok in story.body" :key='blok._uid')
          component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'
import PageBanner from './PageBanner.vue'

interface IBanner {
  title: string
  subtitle: string
}

export default defineComponent({
  components: { PageBanner },

  props: {
    story: {
      type: Object,
      required: true
    }
  },

  setup({ story }) {
    const isPageBanner = (x: any) => x.component === 'PageBanner'
    const bannerData: Ref<IBanner | null> = ref(null)

    onMounted(() => {
      const defaultData = { title: "l'Université du message", subtitle: "La parole de Dieu faite chair" }
      bannerData.value = story.body?.find(isPageBanner) || defaultData
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
    color #FFF
    +breakpoint(mobile)
      font-size 5rem

  &__intro p
    margin 0

  &__container
    margin 3rem auto 0
    max-width 960px
</style>
