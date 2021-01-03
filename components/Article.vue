<template lang="pug">
div
  .bg-white.rounded-xl.m-2.px-2.py-16.mt-8.gap-10(class='md:px-8 md:m-8 md:grid lg:grid-cols-2')
    section.transcript-container.overflow-y-auto.px-8.mb-8(class="md:mb-0")
      .mb-8.cursor-pointer.transcript(
        v-for='(t, index) in blok.transcript'
        :key='index'
        :data-duration='t.duration'
        :ref='`trans-${t.duration}`'
        @click="seek(t.duration)"
      )
        rich-text-renderer(:document='t.body')

    section.flex.justify-center.items-center
      #player
    
    section.fixed.left-0.share-btn
      .flex.flex-row(class="md:flex-col")
        a.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center.btn-fb(data-id='fb')
          font-awesome-icon.text-white.text-2xl(:icon="faFacebookF")
        a.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center.btn-wa(data-id='wa')
          font-awesome-icon.text-white.text-2xl(:icon="faWhatsapp")
        a.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center.btn-linkedin(data-id='in')
          font-awesome-icon.text-white.text-2xl(:icon="faLinkedinIn")
        a.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center.btn-reddit(data-id='re')
          font-awesome-icon.text-white.text-2xl(:icon="faRedditAlien")
</template>

<script>
import { faWhatsapp, faRedditAlien, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { defineComponent, onMounted, ref, computed } from '@vue/composition-api'

const YTPlayer = require('yt-player')
const MySchema = require('storyblok-js-client/dist/schema')
const RichTextResolver = require('storyblok-js-client/dist/richTextResolver')

export default defineComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },

  head() {
    return {
      script: [{ src: '/share-buttons.js' }]
    }
  },

  setup(props, ctx) {
    let player

    onMounted(() => {
      player = new YTPlayer('#player')
      ctx.refs[Object.keys(ctx.refs)[0]][0].classList.add('active')

      player.load(props.blok.sermon)
      player.setVolume(100)
      player.on('timeupdate', _timeUpdateHandler)
      player.on('ended', _removeActiveClass)
    })

    return {
      faWhatsapp: computed(() => faWhatsapp),
      faRedditAlien: computed(() => faRedditAlien),
      faFacebookF: computed(() => faFacebookF),
      faLinkedinIn: computed(() => faLinkedinIn),

      seek: seconds => {
        _removeActiveClass()
        ctx.refs[`trans-${seconds}`][0].classList.add('active')
        player.seek(seconds)
      }
    }

    function _timeUpdateHandler(seconds) {
      const currentTrans = ctx.refs[`trans-${Math.round(seconds)}`]

      if (!currentTrans) return

      _removeActiveClass()
      currentTrans[0].classList.add('active')

      _scrollToElement(currentTrans[0])
    }

    function _removeActiveClass() {
      for(let key in ctx.refs) {
        const trans = ctx.refs[key][0]

        if(trans.classList.contains('active')) {
          return trans.classList.remove('active')
        }
      }
    }

    function _scrollToElement(element) {
      if (!_canScroll(element.parentElement)) return

      const parent = element.parentElement
      const parentOffsetBottom = parent.offsetTop + parent.clientHeight
      const elementOffsetBottom = _getTransPos(element)
      const relTop = element.offsetTop - parent.offsetTop
      const relBottom = elementOffsetBottom - parent.offsetTop

      let newPos

      // If the top of the line is above the top of the parent view, were scrolling up,
      // so we want to move the top of the element downwards to match the top of the parent.
      if (relTop < parent.scrollTop) {
        newPos = element.offsetTop - parent.offsetTop

      // If the bottom of the line is below the parent view, we're scrolling down, so we want the
      // bottom edge of the line to move up to meet the bottom edge of the parent.
      } else if (relBottom > (parent.scrollTop + parent.clientHeight)) {
        newPos = elementOffsetBottom - parentOffsetBottom
      }

      // Don't try to scroll if we haven't set a new position.  If we didn't
      // set a new position the line is already in view (i.e. It's not above or below the view)
      // And don't try to scroll when the element is already in position.
      if (newPos !== undefined && parent.scrollTop !== newPos) {
        _scrollTo(parent, newPos, 400)
      }
    }

    function _canScroll(el) {
      return el.scrollHeight > el.offsetHeight
    }

    function _getTransPos(el) {
      // Get the DOM Node if you pass in a string
      el = (typeof el === 'string') ? document.querySelector(el) : el

      var styles = window.getComputedStyle(el)
      var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom'])

      return Math.ceil(el.offsetHeight + margin) + el.offsetTop
    }

    function _scrollTo(element, newPos, duration) {
      const startTime = Date.now()
      const startPos = element.scrollTop

      // Don't try to scroll beyond the limits. You won't get there and this will loop forever.
      newPos = Math.max(0, newPos)
      newPos = Math.min(element.scrollHeight - element.clientHeight, newPos)
      const change = newPos - startPos

      // This inner function is called until the elements scrollTop reaches newPos.
      const updateScroll = function () {
        const now = Date.now()
        const time = now - startTime

        element.scrollTop = _easeOut(time, startPos, change, duration)
        if (element.scrollTop !== newPos) {
          requestAnimationFrame(updateScroll, element)
        }
      }

      requestAnimationFrame(updateScroll, element)
    }

    function _easeOut(time, start, change, duration) {
      return start + change * Math.sin(Math.min(1, time / duration) * (Math.PI / 2))
    }
  }
})
</script>

<style lang="stylus" scoped>
.transcript-container
  max-height 500px
.transcript
  color $font-gray
.active
  color black
  blockquote
    color #41d0a3
    border-left-color #41d0a3
li
  list-style-type disc
  margin-left 2rem
  p
    margin-bottom 0

p
  margin-bottom 1rem
blockquote
  font-style italic
  padding 20px
  margin-bottom 1rem
  border-left-width 3px
  border-left-style solid
  border-left-color $font-gray

.share-btn
  left 0
  bottom 0
  +breakpoint('mobile-landscape')
    top 50%
    transform translate(0%, -50%)

.btn-fb
  background-color $fb-blue
.btn-wa
  background-color $wa-green
.btn-linkedin
  background-color $li-blue
.btn-reddit
  background-color $reddit-red
</style>
