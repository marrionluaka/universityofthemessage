import { getCurrentInstance } from '@vue/composition-api'

export const useContext = () => {
  // @ts-ignore
  const { proxy } = getCurrentInstance()?.root
  const { context } = proxy
  const storyApi = context.app.$storyapi
  const storyBridge = context.app.$storybridge

  return { proxy, context, storyApi, storyBridge }
}
