
<template lang="pug">
.flex.flex-wrap.justify-between.py-8
  ArticlesTeaser(v-for="article in featuredAricles" :key="article.uuid" :article="article.content")
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from '@vue/composition-api'

import { useContext } from '~/hooks/useContext'
import { useFetchStory } from '~/hooks/useFetchStory'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

export default defineComponent({
  props: {
    path: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: false
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
      } = await storyApi.get('cdn/stories/', { starts_with: `${locale}${props.path}`, version: version.value })

      featuredAricles.value = stories
        .filter((x: any) => !x.is_startpage)
        .slice(0, Number(props.quantity) || undefined)
        .reduce((acc: any, story: any, i: number) => {
          acc[i] = {
            ...story,
            content: {
              ...story.content,
              quantity: Number(props.quantity || undefined),
              link: getTranslatedSlug(story, props.path.replace(/\/$/, ''))
            }
          }

          return acc
        }, [])
    }

    onMounted(async () => await fetchArticles())

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