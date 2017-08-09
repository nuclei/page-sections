/* global HTMLElement CustomEvent fetch*/
'use strict'

import { makeTemplate } from '../node_modules/make-template/dist/makeTemplate.js'
declare const ShadyCSS // eslint-disable-line no-unused-vars

let template = makeTemplate`<style>
    :host{
        display: inline-block;
        flex: 0 1 auto;
        box-sizing: border-box;
        width: 100%;
        height: auto;
        min-height: 100vh;
        align-self: center;
    }
  </style>
  <slot></slot>
`

export class PageSection extends HTMLElement { // eslint-disable-line no-unused-vars
  private _src: string = '' // eslint-disable-line no-undef
  constructor () {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super()
    // create shadowRoot
    let shadowRoot = this.attachShadow({mode: 'open'})
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
  * @method observedAttributes
  * @description return attributes that should be watched for updates
   */
  static get observedAttributes () {
    return ['src']
  }
  /**
  * @method observedAttributes
  * @description return attributes that should be watched for updates
   */
  attributeChangedCallback (attrName: string, oldVal, newVal) {
    this[attrName] = newVal
  }
  /**
   * @method _inView
   * @description check if element is in view
   */
  get _inView () {
    // minimum visible percent of the element to be considered active
    var minVisible = Math.min(1, (parseFloat(this.getAttribute('requiredVisible')) || parseFloat((this as any).parent.getAttribute('requiredVisible')) || 0.6)) // eslint-disable-line no-undef
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
  public setActiveState () {
    if (this._inView) {
      this._setActive()
    } else {
      this._setUnactive()
    }
  }
  /**
   * _setActive
   */
  private _setActive () {
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
  private _setUnactive () {
    // set 'wasActivated' attribute, if element was active
    if (this.hasAttribute('active') && !this.hasAttribute('wasActivated')) {
      this.setAttribute('wasActivated', '')
    }
    // remove 'active' attribute
    this.removeAttribute('active')
    // Dispatch the event.
    this.dispatchEvent(new CustomEvent('deactivated'))
  }
  /**
  * @method setter src
  * @description set the src property
   */
  set src (src: string) {
    if (this._src === src) return
    this._src = src

    fetch(this._src)
    .then(response => response.text())
    .then(html => {
      this.innerHTML = html
    })
    .catch(console.log)
  }
  /**
  * @method getter name
  * @description get the name property
   */
  get src () {
    return this._src
  }
}
