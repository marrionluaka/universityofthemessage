<template lang="pug">
div(v-editable='blok')
  ul.flex.flex-col.py-6.mb-6
    li(v-for="article in featuredAricles" :key="article._uuid") {{ article.link }}
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from '@vue/composition-api'

import ArticlesTeaser from '~/components/ArticlesTeaser.vue'

import { useContext } from '~/hooks/useContext'
import { useFetchStory } from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

export default defineComponent({
  components: { ArticlesTeaser },

  props: {
    blok: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const featuredAricles: Ref<any> = ref([])

    const { version } = useFetchStory()
    const { context, storyApi } = useContext()
    const { getTranslatedSlug } = useTranslatedSlugs()
    const locale = context.i18n.locale === 'fr' ? '' : 'en/'

    const fetchArticles = async () => {
      const {
        data: { stories }
      } = await storyApi.get('cdn/stories/', { starts_with: `${locale}${props.blok.path}`, version: version.value })

      featuredAricles.value = stories
        .filter((x: any) => !x.is_startpage)
        .slice(0, props.blok.quantity)
        .reduce((acc: any, story: any, i: number) => {
          acc[i] = { ...story, link: getTranslatedSlug(story, props.blok.path.replace(/\/$/, '')) }
          return acc
        }, [])
    }

    onMounted(async () => {
      await fetchArticles()
    })

    return { featuredAricles }
  }
})
</script>

<style lang="stylus" scoped>
li
  max-width 700px
hr
  border none
  border-bottom 1px solid #e1e1e1
  padding-bottom 30px
  margin-bottom 60px
</style>
