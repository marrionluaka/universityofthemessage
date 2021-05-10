<template lang="pug">
.flex.flex-col(v-editable='blok')
  .self-center.text-center
    h2(class="text-2xl sm:text-3xl lg:text-4xl") {{ blok.title }}
    .break.mx-auto
    p.paragraph.text-base.text-center(v-if="blok.subtitle") {{ blok.subtitle }}
  ArticleList(:path="blok.path" :quantity="blok.quantity")
  nuxt-link.btn.self-center(:to="localePath(sanitizedPath)") {{ $t('plus-d-evenements') }}
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
  setup(props) {
    const sanitizedPath: ComputedRef<string> = computed(() => props.blok.path.replace(/\/$/, ''))
    return { sanitizedPath }
  }
})
</script>

<style lang="stylus" scoped>
.paragraph
  max-width 810px
</style>
