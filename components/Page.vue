<template lang="pug">
  .page-container.mx-auto.px-6
    component(v-for='blok in blok.body' :key='blok._uid' :blok='blok' :is='blok.component')
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus">
.page-container
  margin 3rem auto 0
  max-width 960px
</style>