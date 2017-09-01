function ready (fn) {
  if (document.readyState != 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}
ready(function () {
  if (typeof window.customElements === 'undefined') {
    var e = document.createElement('script')
    e.src = '../node_modules/@webcomponents/custom-elements/custom-elements.min.js'
    document.body.appendChild(e)
  }
  if (typeof document.head.attachShadow === 'undefined') {
    var e = document.createElement('script')
    e.src = '../node_modules/@webcomponents/shadydom/shadydom.min.js'
    document.body.appendChild(e)
    e.src = '../node_modules/@webcomponents/shadydom/shadycss.min.js'
    document.body.appendChild(e)
  }
})
