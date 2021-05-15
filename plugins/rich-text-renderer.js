import Vue from 'vue'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'

import Accordion from '~/components/Accordion.vue'

Vue.use(VueRichTextRenderer, {
  resolvers: {
    components: {
      Accordion
    }
  }
})
