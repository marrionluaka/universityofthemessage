<template lang="pug">
.page-links
  h2.page-links__title
    nuxt-link(:to="parentLink.path") {{ parentLink.name }}
  ul.min-list
    li.current_page_item(v-for="(link, index) in links" :key="index" :class="{ 'active': link.isActiveLink }")
      nuxt-link(:to="link.path") {{ link.name }}
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { ILink } from '~/hooks/usePageLinks'

export default defineComponent({
  props: {
    parentLink: {
      type: Object as PropType<ILink>,
      required: true
    },
    links: {
      type: Array as PropType<ILink[]>,
      required: true
    }
  }
})
</script>
