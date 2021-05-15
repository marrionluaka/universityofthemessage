const $storyapi = { get: () => ({}) }

export const useContextData = {
  context: {
    app: {
      $storyapi
    },
    store: {
      dispatch: () => {}
    }
  },
  storyApi: $storyapi,
  i18n: {
    locale: 'en',
    t: (path: string) => {
      if (useContextData.i18n.locale === 'en' && path === 'a-propos') return 'about'
      return 'a-propos'
    }
  }
}
