<template lang="pug">
  section
    Page(page="about")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Page from '~/components/Page.vue'

export default defineComponent({
  components: { Page }
})
</script>
