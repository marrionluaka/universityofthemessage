<template lang="pug">
  section
    Page
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
  name: 'about',
  components: { Page, PageLinks, 'page-content': PageContent },

  setup() {
    const { links, parentLink } = usePageLinks('about')
    return { links, parentLink }
  }
})
</script>
