<template lang="pug">
footer.py-10.bg-white.mt-4
  ToTop
  .max-w-5xl.mx-auto.text-center
    p &copy; {{ new Date().getFullYear() }} University Of The Message
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ToTop from '~/components/ToTop.vue'

export default defineComponent({
  components: { ToTop }
})
</script>
