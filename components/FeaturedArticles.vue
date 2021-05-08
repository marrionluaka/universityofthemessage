<template lang="pug">
div(v-editable='blok')
  ul.flex.flex-col.py-6.mb-6
    | Featured Articles
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, onMounted } from '@vue/composition-api'

import useFetchArticles from '~/hooks/useFetchArticles'
import ArticlesTeaser from '~/components/ArticlesTeaser.vue'

import { useContext } from '~/hooks/useContext'
import useFetchStory from '~/hooks/useFetchStory'
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
    const { version } = useFetchStory()
    const { context, storyApi } = useContext()
    const { getTranslatedSlug } = useTranslatedSlugs()
    const locale = context.i18n.locale === 'fr' ? '' : 'en/'

    const fetchArticles = async () => {
      const {
        data: { stories }
      } = await storyApi.get('cdn/stories/', { starts_with: `${locale}${props.blok.path}`, version: version.value })
      // console.log('articles', props.blok.path, stories.filter((x: any) => !x.is_startpage))
      stories
        .filter((x: any) => !x.is_startpage)
        .forEach((story: any) => {
          console.log('link', getTranslatedSlug(story, props.blok.path.replace(/\/$/, '')))
        })
    }

    onMounted(async () => {
      await fetchArticles()
    })
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
