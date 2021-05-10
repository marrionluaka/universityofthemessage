<template lang="pug">
.featured-articles(v-editable='blok')
  h2(class="text-2xl sm:text-3xl lg:text-4xl") {{ blok.title }}
  .break
  p.featured-articles__paragraph {{ blok.subtitle }}
  ArticleList(:path="blok.path" :quantity="blok.quantity")
  nuxt-link.featured-articles__btn(:to="localePath(sanitizedPath)") {{ $t('plus-d-evenements') }}
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
.featured-articles
  @apply flex flex-col items-center justify-center

  &__paragraph
    text-align center
    font-size 15px
    max-width 810px
    line-height 1.9em
  &__btn
    color $white
    font-size 14px
    font-weight 600
    line-height 1.9em
    border-radius 50px
    background $orange
    text-decoration none
    letter-spacing 0.15em
    padding 18px 40px 12px
    text-transform uppercase
    font-family Gayathri, sans-serif
</style>