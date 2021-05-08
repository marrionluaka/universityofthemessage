const $storyapi = { get: () => ({}) }

export const useContextData = {
  context: {
    app: {
      $storyapi
    },
    i18n: {
      locale: 'en',
      t: (path: string) => {
        if (useContextData.context.i18n.locale === 'en' && path === 'a-propos') return 'about'
        return 'a-propos'
      }
    },
    store: {
      dispatch: () => {}
    }
  },
  storyApi: $storyapi
}
