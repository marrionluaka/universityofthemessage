<template lang="pug">
.flex.flex-col(v-editable='blok')
  .self-center.text-center
    h2(class="text-2xl sm:text-3xl lg:text-4xl") {{ blok.title }}
    .break.mx-auto
  div(v-for="blok in blok.articleList" :key='blok._uid')
    component(v-if="$options.components[blok.component]" :blok='blok' :is='blok.component')
  nuxt-link.btn.self-center(:to="localePath(sanitizedPath)") {{ blok.button }}
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup({ blok }) {
    const sanitizedPath: ComputedRef<string> = computed(() => blok.path.replace(/\/$/, ''))
    return { sanitizedPath }
  }
})
</script>

<style lang="stylus" scoped>
.paragraph
  max-width 810px
</style>
