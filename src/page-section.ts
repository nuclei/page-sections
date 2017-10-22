/* global HTMLElement CustomEvent*/
'use strict'

declare const ShadyCSS // eslint-disable-line no-unused-vars
let template = document.createElement('template')
template.innerHTML = `<style>
    :host{
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 0 1 auto;
      box-sizing: border-box;
      width: 100%;
      height: auto;
      align-self: center;
    }
    :host([fullscreen]){
      min-height: 100vh;
    }
    :host([centered]){
      align-items: stretch;
      flex-direction: row;
      justify-content: center;
    }
    :host([centered]) > #content{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1 1 auto;
    }
    #content{
      position: relative;
      width: var(--page-section-width, auto);
      height: var(--page-section-height, auto);
      min-width: var(--page-section-min-width, auto);
      min-height: var(--page-section-min-height, auto);
      max-width: var(--page-section-max-width, auto);
      max-height: var(--page-section-max-height, auto);
    }
  </style>
  <div id="content">
    <slot></slot>
  </div>
`

export class PageSection extends HTMLElement { // eslint-disable-line no-unused-vars
  private _fullscreen: boolean = false // eslint-disable-line no-undef
  private _maxwidth: string = null // eslint-disable-line no-undef
  private _minwidth: string = null // eslint-disable-line no-undef
  private _width: string = null // eslint-disable-line no-undef
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
    return ['src', 'fullscreen', 'maxwidth', 'minwidth', 'width']
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
    this.dispatchEvent(new CustomEvent('activated'))
  }
  /**
   * _setUnactive
   */
  private _setUnactive () {
    // set 'activated' attribute, if element was active
    if (this.hasAttribute('active') && !this.hasAttribute('activated')) {
      this.setAttribute('activated', '')
    }
    // remove 'active' attribute
    this.removeAttribute('active')
    // Dispatch the event.
    this.dispatchEvent(new CustomEvent('deactivated'))
  }
  /**
  * @method setter fullscreen
  * @description set the fullscreen property
   */
  set fullscreen (fullscreen: boolean) {
    if (this._fullscreen === this._isTruthy(fullscreen)) return
    this._fullscreen = this._isTruthy(fullscreen)

    if (this._fullscreen) {
      this.setAttribute('fullscreen', '')
    } else {
      this.removeAttribute('fullscreen')
    }
  }
  /**
   * @method getter fullscreen
   * @description get the fullscreen property
   */
  get fullscreen () {
    return this._fullscreen
  }
  /**
  * @method setter maxwidth
  * @description set the maxwidth property
   */
  set maxwidth (maxwidth: string) {
    if (this._maxwidth === maxwidth) return
    this._maxwidth = maxwidth

    let contentElement = this.shadowRoot.querySelector('#content') as HTMLElement

    if (this._maxwidth !== null && this._maxwidth !== 'none') {
      contentElement.style.maxWidth = maxwidth
      this.setAttribute('maxWidth', maxwidth)
    } else {
      contentElement.style.maxWidth = 'auto'
      this.removeAttribute('maxWidth')
    }
  }
  /**
   * @method getter maxwidth
   * @description get the maxwidth property
   */
  get maxwidth () {
    return this._maxwidth
  }
  /**
  * @method setter minwidth
  * @description set the minwidth property
   */
  set minwidth (minwidth: string) {
    if (this._minwidth === minwidth) return
    this._minwidth = minwidth

    let contentElement = this.shadowRoot.querySelector('#content') as HTMLElement

    if (this._minwidth !== null && this._minwidth !== 'none') {
      contentElement.style.minWidth = minwidth
      this.setAttribute('minWidth', minwidth)
    } else {
      contentElement.style.minWidth = 'auto'
      this.removeAttribute('minWidth')
    }
  }
  /**
   * @method getter minwidth
   * @description get the minwidth property
   */
  get minwidth () {
    return this._minwidth
  }
  /**
  * @method setter width
  * @description set the width property
   */
  set width (width: string) {
    if (this._width === width) return
    this._width = width

    let contentElement = this.shadowRoot.querySelector('#content') as HTMLElement

    if (this._width !== null && this._width !== 'none') {
      contentElement.style.width = width
      this.setAttribute('width', width)
    } else {
      contentElement.style.width = 'auto'
      this.removeAttribute('width')
    }
  }
  /**
   * @method getter width
   * @description get the width property
   */
  get width () {
    return this._width
  }
  /**
   * @method _isTruthy
   * @description returns true if value is truthy or empty
   */
  private _isTruthy (value) {
    if (value === true || value === 'true' || value === '') {
      return true
    }
    return false
  }
}
