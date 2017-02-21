/* global HTMLElement CustomEvent Event */
(function () {
  // function to create template-element from template tag on the fly
  let makeTemplate = require('./make-template')
  let template = makeTemplate`<style>
      :host{
          display: inline-block;
          flex: 0 1 auto;
      }
      :host(:not([flexible])){
          box-sizing: border-box;
          width: 100%;
          min-height: 100vh;
      }
      :host([flexible]){
          margin-left: 50%;
          transform: translateX(-50%);
      }
    </style>
    <slot></slot>
  `

  class PageSection extends HTMLElement {
    constructor () {
      // If you define a ctor, always call super() first!
      // This is specific to CE and required by the spec.
      super()
      // Attach a shadow root to the element.
      var shadowRoot = this.attachShadow({mode: 'open'})
      // check if polyfill is used
      if (typeof ShadyCSS !== 'undefined') {
        ShadyCSS.prepareTemplate(template, 'page-section') // eslint-disable-line no-undef
        // apply css polyfill
        ShadyCSS.styleElement(this) // eslint-disable-line no-undef
      }
      // add content to shadowRoot
      shadowRoot.appendChild(document.importNode(template.content, true))
    }
    /**
     * @method _inView
     * @description check if element is in view
     */
    get _inView () {
      // minimum visible percent of the element to be considered active
      var minVisible = Math.min(1, (parseFloat(this.getAttribute('requiredVisible')) || parseFloat(this.parent.getAttribute('requiredVisible')) || 0.6))
      // px value of element that can be hidden
      var requiredVisiblePx = minVisible * Math.min(this.getBoundingClientRect().height, window.innerHeight)
      // calculate visible height
      var visibleHeight = this.getBoundingClientRect().height
      // substract part that is outside screen to top
      visibleHeight += Math.min(0, this.getBoundingClientRect().top)
      // substract part that is outside screen to bottom
      visibleHeight -= Math.max(0, (this.getBoundingClientRect().bottom - window.innerHeight))
      // return if element is visible or not
      return visibleHeight >= requiredVisiblePx
    }
    /**
     * @method setActiveState
     * @description set active if in viewport or unactive if not
     */
    setActiveState () {
      if (this._inView) {
        this._setActive()
      } else {
        this._setUnactive()
      }
    }
    /**
     * _setActive
     */
    _setActive () {
      if (this.hasAttribute('active')) return
      // set attribute
      this.setAttribute('active', '')
      // Dispatch the event.
      this.dispatchEvent(new CustomEvent('activated', { 'detail': {
        'wasActivated': this.getAttribute('wasActivated') !== null
      }}))
    }
    /**
     * _setUnactive
     */
    _setUnactive () {
      // set 'wasActivated' attribute, if element was active
      if (this.hasAttribute('active') && !this.hasAttribute('wasActivated')) {
        this.setAttribute('wasActivated', '')
      }
      // remove 'active' attribute
      this.removeAttribute('active')
      // Dispatch the event.
      this.dispatchEvent(new Event('deactivated'))
    }
  }

  /**
   * export for commonjs module
   */
  module.exports = PageSection
})()
