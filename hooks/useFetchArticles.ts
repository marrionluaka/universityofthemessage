import Vue from 'vue'
import CompositionApi, { ref, Ref } from '@vue/composition-api'
import { useContext } from './useContext'

Vue.use(CompositionApi)

const articles: Ref<any[]> = ref([])
const loaded: Ref<string> = ref('0')

export const useFetchArticles = () => {
  const { storyApi, version, i18n } = useContext()

  async function fetchArticles() {
    const {
      data: { stories }
    } = await storyApi.get('cdn/stories/', { starts_with: `${i18n.locale === 'fr' ? '' : 'en/'}a-propos/`, version })

    articles.value = stories
  }

  const setLoaded = (val: string) => {
    loaded.value = val
  }

  return { articles, loaded, fetchArticles, setLoaded }
}
