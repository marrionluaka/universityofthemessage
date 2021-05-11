<template lang="pug">
header.site-header
  .container.mx-auto(class="flex justify-between md:items-center")
    h1.w-56.z-20.relative.m-0.text-2xl.font-thin
      nuxt-link.text-white.no-underline(:to="localePath('/')")
        strong.font-normal Branham
        |  Eglise

    //- a.block.w-56.z-10(href='/')
    //-   img(src='~/assets/images/logo-b.png')

    .site-header__menu-trigger
      MenuAlt2Icon.text-white(v-if="!isMenuOpen" @click="setIsMenuOpen")
      XIcon.text-white(v-else @click="setIsMenuOpen")

    .site-header__menu(:class="{ 'site-header__menu--active': isMenuOpen }")
      nav
        ul.list-none.p-0.m-0(class="md:flex md:justify-end")
          li.current-menu-item
            nuxt-link.text-white.block.no-underline(:to="localePath('a-propos')") {{ $t('a-propos-nav') }}
          li
            nuxt-link.text-white.block.no-underline(to='/sermons') Sermons
          li
            LanguageSwitch
          li
            nuxt-link.text-white.block.no-underline(:to="localePath('evenements')") {{ $t('evenements-nav') }}
          li
            nuxt-link.text-white.block.no-underline(to='#') Contact
          //- li
          //-   nuxt-link.text-white.block.no-underline(to='/news') Blog
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// @ts-ignore
import { XIcon, MenuAlt2Icon, SearchIcon } from '@vue-hero-icons/outline'

import useToggle from '~/hooks/useToggle'
import LanguageSwitch from '~/components/LanguageSwitch.vue'

export default defineComponent({
  components: {
    XIcon,
    SearchIcon,
    MenuAlt2Icon,
    LanguageSwitch
  },

  setup() {
    const [isMenuOpen, setIsMenuOpen] = useToggle()
    return { isMenuOpen, setIsMenuOpen }
  }
})
</script>

<style lang="stylus" scoped>
.site-header
  top 0
  left 0
  right 0
  z-index 3
  padding 20px 0
  position absolute

  &__menu
    left 0
    right 0
    top -20px
    opacity 0
    padding-top 58px
    visibility hidden
    position absolute
    padding-bottom 20px
    background rgba(38, 38, 38, 0.92)
    transform translateY(-20%)
    transition opacity .3s ease-out, visibility .3s ease-out, transform .3s ease-out

    &--active
      opacity 1
      visibility visible
      transform translateY(0)

    +breakpoint(mobile-landscape)
      top 0
      opacity 1
      padding-top 0
      position static
      padding-bottom 0
      visibility visible
      background-color transparent
      transform translateY(0) scale(1)

    li a
      padding .6em 1em

      &:hover
        color #FAF0CA

  &__menu-trigger
    top 5px
    z-index 10
    right 16px
    color #FFF
    cursor pointer
    font-size 1.4rem
    position absolute

    +breakpoint(mobile-landscape)
      display none
</style>
