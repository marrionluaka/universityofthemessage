<template lang="pug">
  section
    Page(:path="$options.name")
      template(#default="{ body }")
        div
          PageLinks(v-if="links.length" :parentLink="parentLink" :links="links")
          div(v-for="blok in body" :key='blok._uid')
            component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import usePageLinks from '~/hooks/usePageLinks'

import Page from '~/components/Page.vue'
import PageLinks from '~/components/PageLinks.vue'
import PageContent from '~/components/PageContent.vue'

export default defineComponent({
  name: 'a-propos',
  components: { Page, PageLinks, 'page-content': PageContent },

  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos'
    }
  },

  setup() {
    const { links, parentLink } = usePageLinks('a-propos')
    return { links, parentLink }
  }
})
</script>
