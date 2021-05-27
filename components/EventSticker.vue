<template lang="pug">
.event(class="w-16 h-16 md:w-20 md:h-20")
  .text-base.text-white.capitalize(class="md:text-lg") {{ month }}
  .text-2xl.text-white(class="md:text-3xl") {{ day }}
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
  @apply flex flex-col items-center justify-center rounded-full -mt-16
  font-family Gayathri, sans-serif
  background-color $purple
</style>
