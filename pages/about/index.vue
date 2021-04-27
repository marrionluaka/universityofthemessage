<template lang="pug">
  section
    Page
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Page from '~/components/Page.vue'

export default defineComponent({
  name: 'about',
  components: { Page }
})
</script>
