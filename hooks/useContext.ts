import { getCurrentInstance } from '@vue/composition-api'

export const useContext = () => {
  // @ts-ignore
  const { proxy } = getCurrentInstance()?.root
  const { context } = proxy

  const i18n = context.i18n
  const storyApi = context.app.$storyapi
  const storyBridge = context.app.$storybridge
  const version = context.query._storyblok || context.isDev ? 'draft' : 'published'

  return {
    i18n,
    proxy,
    context,
    version,
    storyApi,
    storyBridge
  }
}
