<template lang="pug">
main.relative.h-full.flex.flex-col.items-center.justify-center
  .relative.px-4.text-center(v-if="error.statusCode === 404")
    h1.text-white {{ $t('page-non-trouvee') }}
    p.text-white.mb-4 {{ $t('404') }}
    nuxt-link.btn.inline-block(to="/") {{ $t('retour-maison') }}
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
main
  background-image url('~assets/images/error.jpeg')
  background-repeat no-repeat
  background-size cover
  background-position 50% 50%

  &::before
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-image linear-gradient(to bottom right, #002f4b, #101010)
    opacity .6

.btn
  background-color $turqoise
</style>
