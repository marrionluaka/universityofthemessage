<template lang="pug">
.flex
  ul
    li(v-for='lang in $i18n.locales' :key='lang.code' :class="{ 'active': $i18n.locale === lang.code }")
      nuxt-link(:to="switchLocalePath(lang.code)") {{ lang.name }}
</template>
