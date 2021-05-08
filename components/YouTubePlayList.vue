<template lang="pug">
section(ref="ytList")
  ul.flex.flex-wrap.my-4.-mx-2(v-if="videos")
    slot(:videos="videos")
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, watch } from '@vue/composition-api'
import useYTPlaylist from '~/hooks/useYTPlaylist'

export default defineComponent({
  props: {
    currentPage: {
      type: Number as PropType<number>,
      required: false,
      default: 0
    }
  },

  setup(props, { emit }) {
    const ytList: Ref<any> = ref(null)
    const { videos, ytData, setNewPlaylist, populatePlaylist } = useYTPlaylist()

    watch(
      () => props.currentPage,
      async (page: number, oldPage: number): Promise<void> => {
        if (page > oldPage) {
          await setNewPlaylist('nextPage')
        } else {
          await setNewPlaylist('prevPage')
        }
        ytList.value?.scrollIntoView({ behavior: 'smooth' })
      }
    )

    onMounted(async () => {
      await populatePlaylist()
      emit('on-populated-list', ytData.value)
    })

    return { videos, ytList }
  }
})
</script>
