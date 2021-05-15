<template lang="pug">
.accordion.py-8
  .accordion-panel(v-for="panel in body.panel" :key="panel._uid")
    button.pans.appearance-none(:class="{ active: currentId === panel._uid }" @click="setCurrentId(panel._uid)") {{ panel.title }}
    .panel(:class="{ 'full-height': currentId === panel._uid }")
      rich-text-renderer(:document="panel.content")
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import useComponentState from '~/hooks/useComponentState'

interface IBody {
  panel: IPanel
}

interface IPanel {
  _uid: string
  title: string
  content: any
}

export default defineComponent({
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
.pans
  background-color #eee
  color #444
  cursor pointer
  padding 18px
  width 100%
  border none
  text-align left
  outline none
  font-size 15px
  transition .4s

  &:after
    content '\002B'
    color #777
    font-weight bold
    float right
    margin-left 5px

  &.active, &:hover
    background-color #ccc

  &.active:after
    content "\2212"

.panel
  padding 0 18px
  background-color white
  max-height 0
  overflow hidden
  transition max-height 0.4s ease-out
  &.full-height
    max-height 100vh
</style>
