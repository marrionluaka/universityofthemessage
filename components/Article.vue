<template lang="pug">
div
  .bg-white.rounded-xl.m-8.px-8.py-16.mt-8.grid.gap-10(class='lg:grid-cols-2')
    section.transcript-container.overflow-y-auto.px-8
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
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api'

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

  setup(props, ctx) {
    let player

    onMounted(() => {
      player = new YTPlayer('#player')
      ctx.refs['trans-1'][0].classList.add('active')

      player.load(props.blok.sermon)
      player.setVolume(100)
      player.on('timeupdate', _timeUpdateHandler)
      player.on('ended', _removeActiveClass)
    })

    return {
      seek: seconds => player.seek(seconds)
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
</style>
