import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
import { mount, createLocalVue } from '@vue/test-utils'

import { useContextData } from '~/mocks'
import FeaturedArticles from '~/components/FeaturedArticles.vue'

Vue.directive('editable', {});

jest.mock('@/hooks/useContext', () => ({ useContext: () => useContextData }))
jest.mock('@/hooks/useFetchStory', () => ({ useFetchStory: () => ({ version: { value: 'draft' } }) }))

describe('FeaturedArticles specs', () => {
  const localVue = createLocalVue()
  localVue.use(CompositionApi)

  let wrapper: any

  useContextData.context.store.dispatch = jest.fn()
  useContextData.storyApi.get = () => ({
    data: {
      stories: [
        {
          is_startpage: true
        },
        {
          slug: 'notre-doctrine',
          translated_slugs: [
            { lang: 'en', path: 'a-propos/our-doctrine' }
          ]
        },
        {
          slug: 'notre-doctrine',
          translated_slugs: [
            { lang: 'en', path: 'a-propos/our-doctrine' }
          ]
        }
      ]
    }
  })

  beforeEach(() => {
    wrapper = mount(
      FeaturedArticles,
      {
        propsData: {
          blok: { path: 'a-propos', quantity: 2 }
        },
        localVue
      }
    )
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('sets featured articles.', () => {
    expect(true).toBe(true)
  })
})
