<template lang="pug">
  .wrapper
    Header
    Nuxt
    Footer
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="stylus">
body
  background-color $bg-gray

.wrapper
  display flex
  min-height 100vh
  flex-direction column
</style>
