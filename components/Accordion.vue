<template lang="pug">
.accordion
  AccordionPanel(v-for="panel in body.panel" :key="panel._uid")
    template
      button.appearance-none(@click="setCurrentId(panel._uid)") {{ panel.title }}
      div(v-show="currentId === panel._uid")
        rich-text-renderer(:document="panel.content")
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import useComponentState from '~/hooks/useComponentState'
import AccordionPanel from '~/components/AccordionPanel.vue'

interface IBody {
  panel: IPanel
}

interface IPanel {
  _uid: string
  title: string
  content: any
}

export default defineComponent({
  components: { AccordionPanel },

  props: {
    body: {
      type: Object as PropType<IBody>,
      required: true
    }
  },

  setup() {
    const [currentId, setCurrentId] = useComponentState('')
    return { currentId, setCurrentId }
  }
})
</script>


<style lang="stylus" scoped>

</style>
