<template lang="pug">
  .wrapper.flex.flex-col.min-h-screen
    Header
    Nuxt.flex-grow
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
</style>
