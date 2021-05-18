import Vue from 'vue'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'

import Accordion from '~/components/Accordion.vue'
import PageLinks from '~/components/PageLinks.vue'

Vue.use(VueRichTextRenderer, {
  resolvers: {
    components: {
      Accordion,
      PageLinks
    }
  }
})
