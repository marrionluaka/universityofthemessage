<template lang="pug">
div(v-editable='blok')
  ul.flex.flex-col.py-6.mb-6
    li.flex-auto.px-6(v-for='article in sortedArticles' :key='article._uid')
      article-teaser(
        v-if='article.content'
        :article-link='article.full_slug'
        :article-name="article.name"
        :article-content='article.content'
        :article-date='article.first_published_at'
      )
      p.px-4.py-2.text-white.bg-red-700.text-center.rounded(v-else)
        | This content loads on save. 
        strong Save the entry &amp; reload.
      hr
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    sortedArticles() {
      // Load reference data/content from store
      console.log('yoo', this.$store.state.articles)
      const featuredArticles = this.$store.state.articles.articles.filter((article) => {
        return this.blok.articles.includes(article.uuid)
      })

      // Enable the ordering of the article previews
      featuredArticles.sort((a, b) => {
        return this.blok.articles.indexOf(a.uuid) - this.blok.articles.indexOf(b.uuid)
      })

      return featuredArticles
    }
  }
}
</script>

<style lang="stylus" scoped>
li
  max-width 700px
hr
  border none
  border-bottom 1px solid #e1e1e1
  padding-bottom 30px
  margin-bottom 60px
</style>
