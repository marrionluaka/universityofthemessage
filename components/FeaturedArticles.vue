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
      return this.$store.state.articles.articles
        .filter((article) => this.blok.articles.includes(article.uuid))
        .sort((a, b) => this.blok.articles.indexOf(a.uuid) - this.blok.articles.indexOf(b.uuid))
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
