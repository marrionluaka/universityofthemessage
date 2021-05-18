<template lang="pug">
.accordion.py-8
  .accordion-panel.my-2(v-for="panel in panels" :key="panel._uid")
    .accordion-panel__header.rounded-md(:class="{ active: panel.isActive }")
      button.flex.items-center.justify-between.w-full.appearance-none(@click="togglePanel(panel._uid)")
        .p-4.capitalize {{ panel.title }}
        .p-4.pl-0.flex.items-center.justify-center
          .accordion-panel__carret

    .panel(:ref="panel._uid")
      rich-text-renderer(:document="panel.content")
</template>

<script lang="ts">
import { TweenLite, Elastic, Bounce } from 'gsap'
import { curry, findIndex, propEq, update } from 'ramda'
import { onMounted, defineComponent, PropType, ref, Ref } from '@vue/composition-api'

interface IBody {
  panel: IPanel[]
}

interface IPanel {
  _uid: string
  title: string
  content: any
  isActive?: boolean
}

export default defineComponent({
  props: {
    body: {
      type: Object as PropType<IBody>,
      required: true
    }
  },

  setup(props, ctx) {
    const panels:Ref<any[]> = ref([])

    onMounted(() => {
      panels.value = props.body.panel.reduce((acc, val, i) =>
        (acc[i] = { ...val, isActive: false }) && acc, [...props.body.panel])
    })    

    const togglePanel = (id: string) => {
      const el = ctx.refs[id]?.[0]
      const idx = _findIdxById(id, panels.value)
      const isActive = !panels.value[idx].isActive

      isActive ? _openPanel(el) : _closePanel(el)
      panels.value = update(idx, { ...panels.value[idx], isActive }, panels.value)
    }

    const _findIdxById = curry((id, list) => findIndex(propEq('_uid', id))(list))
    const _closePanel = (el: any) => TweenLite.to(el, 0.5, { height: 0, ease: Bounce.easeOut })
    const _openPanel = (el: any) => TweenLite.to(el, 1, { height: el?.scrollHeight, ease: Elastic.easeOut.config(1, 0.3) })

    return { panels, togglePanel }
  }
})
</script>

<style lang="stylus" scoped>
p
  @apply text-base

@keyframes accordion-is-inactive
  0%
    transform rotate(-45deg)
  50%
    transform scale(1.5) rotate(45deg)
  100%
    transform rotate(135deg)

@keyframes accordion-is-active
  0%
    transform rotate(135deg)
  50%
    transform scale(1.5) rotate(45deg)
  100%
    transform rotate(-45deg)

.panel
  @apply overflow-hidden h-0 bg-white px-5 rounded-md
  & > div
    @apply py-6

.accordion-panel
  &__header
    &:not(.accordion-active):hover
      background-color: #e0e0e0

  &__carret
    background-image linear-gradient(to top right, transparent 50%, #727272 50%)
    width 0.5rem
    height 0.5rem
    transform rotate(-45deg)
    animation accordion-is-inactive 200ms linear forwards

.active .accordion-panel__carret
  animation accordion-is-active 200ms linear forwards
</style>
