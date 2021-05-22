<template lang="pug">
.px-4.max-w-sm(class="md:px-0")
  select.mt-1.block.w-full.px-1.py-2.text-base.bg-transparent.text-white.border.rounded-md(
    @change="navigate($event)"
    class='focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  )
    option(v-for='lang in $i18n.locales' :key='lang.code' :value="lang.code") {{ capitalize(lang.code) }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useContext } from '~/hooks/useContext'

export default defineComponent({
  setup() {
    const { proxy } = useContext()
    const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
    const navigate = (e: Event) => proxy.$router.push({ path: proxy.switchLocalePath((e.target as HTMLInputElement).value) })

    return {  navigate, capitalize }
  }
})
</script>
