import { ref, Ref } from "@vue/composition-api"

export default function usePagination() {
  const currentPage: Ref<number> = ref(1)
  const totalResults: Ref<number> = ref(0)
  const resultsPerPage: Ref<number> = ref(0)

  const paginate = (val: any) => {
    currentPage.value = val
  }

  return {
    paginate,
    currentPage,
    totalResults,
    resultsPerPage
  }
}
