<template lang="pug">
.block-about-and-missions.my-1.px-4
  nuxt-link.inline-block.link-block-about.w-inline-block(:to="link")
    .image-block-about(:style="{ 'background-image': `url(${blok.image.filename})` }")
    .block-white
      h3.block-title {{ blok.titre }}
      p.paragraph {{ blok.extrait }}
</template>

<script lang="ts">
import { head } from 'ramda'
import { computed, defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import { useContext } from '~/hooks/useContext'
import useTranslatedSlugs from '~/hooks/useTranslatedSlugs'

export default defineComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const link: Ref<string> = ref('')
    const { context, storyApi } = useContext()
    const { setTranslatedSlugs } = useTranslatedSlugs()
    const locale = context.i18n.locale === 'fr' ? '' : 'en'

    const _getTranslatedLink = (link: any) => {
      return link.lang === locale && link.path !== '/' ? `${locale}/${link.path}` : props.blok.lien.cached_url
    }

    onMounted(async () => {
      const {
        data: { stories }
      } = await storyApi.get('cdn/stories/', { starts_with: 'a-propos/' })
      await setTranslatedSlugs(stories.find((x: any) => x.uuid === props.blok.lien.id))

      // link.value = head(links[props.blok.lien.id]?.alternates || [])
    })

    return {
      link: computed(() => '') //_getTranslatedLink(link.value))
    }
  }
})
</script>

<style lang="stylus" scoped>
.image-block-about {
  border-radius: 5px;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
