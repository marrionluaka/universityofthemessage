<template lang="pug">
nav
  ul
    li(v-for="crumb in crumbs")
      nuxt-link(:to="crumb.path" v-if="!crumb.classes")
        p.capitalize {{ crumb.name }}

      p.capitalize(v-else) {{ crumb.name }}
</template>

<script lang="ts">
import { last } from 'ramda'
import { defineComponent, computed, ComputedRef } from '@vue/composition-api'
import useContext from '~/hooks/useContext'

interface ICrumbs {
  path: string
  name: string
  classes?: string
}

export default defineComponent({
  setup() {
    const { context } = useContext()

    const i18n = context.i18n
    const route = context.route

    const crumbs: ComputedRef<ICrumbs[]> = computed(() => {
      const breadCrumbs: ICrumbs[] = []
      const strSanitizer = (str: any): string => last(str.replace(/^\/+/, '').split('/')).replace(/-/g, ' ')

      route.matched.forEach((item: any, i: number, { length }: any) => {
        if (i !== length - 1) return

        const crumb = {} as ICrumbs
        crumb.path = item.path
        crumb.name = i18n.t((item.name || item.path))

        if (item.regex.keys.length > 0) {
          breadCrumbs.push({
            path: item.path.replace(/\/:[^/:]*$/, ''),
            name: i18n.t(strSanitizer(item.path.replace(/\/:[^/:]*$/, '')))
          })

          crumb.path = route.path
          crumb.name = i18n.t(strSanitizer(route.path.replace(/\/:[^/:]*$/, '')), [ (crumb.path.match(/[^/]*$/) || [])[0] ])
        }

        crumb.classes = 'is-active'
        breadCrumbs.push(crumb)
      })

      return breadCrumbs.length > 1 ? breadCrumbs : []
    })

    return { crumbs }
  }
})
</script>
