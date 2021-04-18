<template lang="pug">
  section
    template(v-if='story.content.component')
      .page-container.mx-auto.px-6
        component(v-for='blok in story.content.body' :key='blok._uid' :blok='blok' :is='blok.component')
</template>

<script>
import FeaturedArticles from '~/components/FeaturedArticles.vue'

export default {
  components: { FeaturedArticles },

  asyncData (context) {
    // This what would we do in real project
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    // const fullSlug = (context.route.path == '/' || context.route.path == '') ? 'home' : context.route.path

    // Load the JSON from the API - loadig the home content (index page)
    return context.app.$storyapi.get('cdn/stories/home', { version }).then(({ data }) => data).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  },

  mounted () {
    // Use the input event for instant update of content
    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.story.id) {
        this.story.content = event.story.content
      }
    })
    // Use the bridge to listen the events
    this.$storybridge.on(['published', 'change'], (event) => {
      // window.location.reload()
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true,
      })
    })
  },

  async fetch(context) {
    // Loading reference data - Articles in our case
    if(context.store.state.articles.loaded !== '1') {

      let articlesRefRes = await context.app.$storyapi.get(`cdn/stories/`, { starts_with: 'articles/', version: 'draft' })
      context.store.commit('articles/setArticles', articlesRefRes.data.stories)
      context.store.commit('articles/setLoaded', '1')
    }
  }
}
</script>

<style lang="stylus">
.page-container
  margin 3rem auto 0
  max-width 960px
</style>
