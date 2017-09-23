(function () {
'use strict';

const makeTemplate = function (strings) {
    let html = strings[strings.length - 1];
    let template = document.createElement('template');
    template.innerHTML = html;
    return template;
};

let template = makeTemplate `<style>
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
`;
class PageSectionContainer extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        if (typeof ShadyCSS !== 'undefined') {
            ShadyCSS.prepareTemplate(template, 'page-section-container');
            ShadyCSS.styleElement(this);
        }
        shadowRoot.appendChild(document.importNode(template.content, true));
    }
    connectedCallback() {
        let element = this;
        var fn;
        window.addEventListener('scroll', function () {
            clearTimeout(fn);
            fn = setTimeout(function () {
                element.setActiveState();
            }, 10);
        });
        setTimeout(function () {
            element.setActiveState();
        }, 1);
    }
    get _inView() {
        return this.getBoundingClientRect().bottom > 0 && this.getBoundingClientRect().top < window.innerHeight;
    }
    setActiveState() {
        if (this._inView) {
            this._setActive();
            Array.prototype.slice.call(this.querySelectorAll('page-section')).map(function (item, index, array) {
                item.parent = item;
                item.setActiveState();
            });
        }
        else {
            this._setUnactive();
        }
    }
    _setActive() {
        if (this.hasAttribute('active'))
            return;
        this.setAttribute('active', '');
        this.dispatchEvent(new CustomEvent('activated'));
    }
    _setUnactive() {
        if (this.hasAttribute('active') && !this.hasAttribute('activated')) {
            this.setAttribute('activated', '');
        }
        this.removeAttribute('active');
        this.dispatchEvent(new CustomEvent('deactivated'));
    }
}

let template$1 = makeTemplate `<style>
    :host{
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
`;
class PageSection extends HTMLElement {
    constructor() {
        super();
        this._fullscreen = false;
        this._maxwidth = null;
        this._minwidth = null;
        this._width = null;
        let shadowRoot = this.attachShadow({ mode: 'open' });
        if (typeof ShadyCSS !== 'undefined') {
            ShadyCSS.prepareTemplate(template$1, 'page-section');
            ShadyCSS.styleElement(this);
        }
        shadowRoot.appendChild(document.importNode(template$1.content, true));
    }
    static get observedAttributes() {
        return ['src', 'fullscreen', 'maxwidth', 'minwidth', 'width'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this[attrName] = newVal;
    }
    get _inView() {
        var minVisible = Math.min(1, (parseFloat(this.getAttribute('requiredVisible')) || parseFloat(this.parent.getAttribute('requiredVisible')) || 0.6));
        var requiredVisiblePx = minVisible * Math.min(this.getBoundingClientRect().height, window.innerHeight);
        var visibleHeight = this.getBoundingClientRect().height;
        visibleHeight += Math.min(0, this.getBoundingClientRect().top);
        visibleHeight -= Math.max(0, (this.getBoundingClientRect().bottom - window.innerHeight));
        return visibleHeight >= requiredVisiblePx;
    }
    setActiveState() {
        if (this._inView) {
            this._setActive();
        }
        else {
            this._setUnactive();
        }
    }
    _setActive() {
        if (this.hasAttribute('active'))
            return;
        this.setAttribute('active', '');
        this.dispatchEvent(new CustomEvent('activated'));
    }
    _setUnactive() {
        if (this.hasAttribute('active') && !this.hasAttribute('activated')) {
            this.setAttribute('activated', '');
        }
        this.removeAttribute('active');
        this.dispatchEvent(new CustomEvent('deactivated'));
    }
    set fullscreen(fullscreen) {
        if (this._fullscreen === this._isTruthy(fullscreen))
            return;
        this._fullscreen = this._isTruthy(fullscreen);
        if (this._fullscreen) {
            this.setAttribute('fullscreen', '');
        }
        else {
            this.removeAttribute('fullscreen');
        }
    }
    get fullscreen() {
        return this._fullscreen;
    }
    set maxwidth(maxwidth) {
        if (this._maxwidth === maxwidth)
            return;
        this._maxwidth = maxwidth;
        let contentElement = this.shadowRoot.querySelector('#content');
        if (this._maxwidth !== null && this._maxwidth !== 'none') {
            contentElement.style.maxWidth = maxwidth;
            this.setAttribute('maxWidth', maxwidth);
        }
        else {
            contentElement.style.maxWidth = 'auto';
            this.removeAttribute('maxWidth');
        }
    }
    get maxwidth() {
        return this._maxwidth;
    }
    set minwidth(minwidth) {
        if (this._minwidth === minwidth)
            return;
        this._minwidth = minwidth;
        let contentElement = this.shadowRoot.querySelector('#content');
        if (this._minwidth !== null && this._minwidth !== 'none') {
            contentElement.style.minWidth = minwidth;
            this.setAttribute('minWidth', minwidth);
        }
        else {
            contentElement.style.minWidth = 'auto';
            this.removeAttribute('minWidth');
        }
    }
    get minwidth() {
        return this._minwidth;
    }
    set width(width) {
        if (this._width === width)
            return;
        this._width = width;
        let contentElement = this.shadowRoot.querySelector('#content');
        if (this._width !== null && this._width !== 'none') {
            contentElement.style.width = width;
            this.setAttribute('width', width);
        }
        else {
            contentElement.style.width = 'auto';
            this.removeAttribute('width');
        }
    }
    get width() {
        return this._width;
    }
    _isTruthy(value) {
        if (value === true || value === 'true' || value === '') {
            return true;
        }
        return false;
    }
}

window.customElements.define('page-sections', PageSectionContainer);
window.customElements.define('page-section', PageSection);

}());
//# sourceMappingURL=page-sections.js.map
