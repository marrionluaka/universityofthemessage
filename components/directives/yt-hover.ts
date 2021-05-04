export default {
  inserted(el: any) {
    el.showYTBtn = function (e: { target: HTMLInputElement; }) {
      e.target.classList.add('hover')
    }

    el.hideYTBtn = function (e: { target: HTMLInputElement; }) {
      e.target.classList.remove('hover')
    }

    el.addEventListener('mouseenter', el.showYTBtn)
    el.addEventListener('mouseleave', el.hideYTBtn)
  },

  unbind(el: any) {
    el.removeEventListener('mouseenter', el.showYTBtn)
    el.removeEventListener('mouseleave', el.hideYTBtn)
  }
}
