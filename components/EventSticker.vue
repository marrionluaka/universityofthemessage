<template lang="pug">
.event
  .text-lg.text-white.capitalize {{ month }}
  .text-3xl.text-white {{ day }}
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    date: {
      type: String,
      required: true,
      default: 'sep 15, 2021'
    }
  },

  setup(props) {
    const date = props.date?.split(",")[0].split(" ")
    const month: Ref<string> = ref(date[0])
    const day: Ref<string> = ref(date[1])

    return { month, day }
  }
})
</script>

<style lang="stylus" scoped>
.event
  @apply flex flex-col items-center justify-center rounded-full -mt-16 w-20 h-20
  font-family Gayathri, sans-serif
  background-color $purple
</style>
