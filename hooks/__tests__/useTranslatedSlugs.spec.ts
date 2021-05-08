import CompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import { useContextData } from '~/mocks'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

jest.mock('@/hooks/useContext', () => ({ useContext: () => useContextData }))

describe('useTranslatedSlugs specs', () => {
  const localVue = createLocalVue()
  localVue.use(CompositionApi)

  let story: any
  let wrapper: any
  let getTranslatedSlug: any
  let setTranslatedSlugs: any

  useContextData.context.store.dispatch = jest.fn()

  story = {
    slug: 'notre-doctrine',
    translated_slugs: [
      { lang: 'en', path: 'a-propos/our-doctrine' }
    ]
  }

  beforeEach(() => {
    wrapper = shallowMount(
      {
        template: `<div></div>`,
        setup() {
          ;({ getTranslatedSlug, setTranslatedSlugs } = useTranslatedSlugs())
        }
      },
      { localVue }
    )
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('does not translate the slug of a given story.', () => {
    useContextData.context.i18n.locale = 'fr'

    const actual = getTranslatedSlug(story, 'a-propos')

    expect(actual).toBe('a-propos/notre-doctrine')
  })

  it('translates the slug of a given story.', () => {
    useContextData.context.i18n.locale = 'en'

    const actual = getTranslatedSlug(story, 'a-propos')

    expect(actual).toBe('en/about/our-doctrine')
  })

  it('dispatches setRouteParams with translated slugs.', () => {
    const expected = [
      'i18n/setRouteParams',
      {
        en: { slug: "our-doctrine" },
        fr: { slug: "notre-doctrine" }
      }
    ]

    setTranslatedSlugs(story)

    expect(useContextData.context.store.dispatch).toHaveBeenCalledWith(...expected)
  })
})
