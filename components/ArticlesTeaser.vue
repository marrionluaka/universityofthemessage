<template lang="pug">
nuxt-link(:to='articleLink')
  h2.font-serif.pt-2.pb-1.text-3xl.font-bold {{ articleName }}
  p.article-date.uppercase.pb-6.leading-relaxed
    | POSTED ON 
    span {{ articleDate | formatDate }}
  p.pb-6.leading-loose {{ articleContent.intro }}
</template>

<script>
export default {
  props: {
    articleContent: {
      type: Object,
      required: true
    },
    articleLink: {
      type: String,
      required: true
    },
    articleName: {
      type: String,
      required: true
    },
    articleDate: {
      type: String,
      required: true
    }
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return new Date(value).toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'long' })
      }
    }
  }
}
</script>

<style lang="stylus">
.article-date
  font-size 10px

</style>
