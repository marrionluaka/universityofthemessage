import { ref, Ref } from '@vue/composition-api'

const articles: Ref<string[]> = ref([])
const loaded: Ref<string> = ref('0')

export default function useFetchArticles() {
  const setArticles = (entries: string[]) => {
    articles.value = entries
  }

  const setLoaded = (val: string) => {
    loaded.value = val
  }

  return { articles, loaded, setArticles, setLoaded }
}
