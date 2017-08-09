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
        this.dispatchEvent(new CustomEvent('activated', { 'detail': {
                'wasActivated': this.getAttribute('wasActivated') !== null
            } }));
    }
    _setUnactive() {
        if (this.hasAttribute('active') && !this.hasAttribute('wasActivated')) {
            this.setAttribute('wasActivated', '');
        }
        this.removeAttribute('active');
        this.dispatchEvent(new CustomEvent('deactivated'));
    }
}

let template$1 = makeTemplate `<style>
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
class PageSection extends HTMLElement {
    constructor() {
        super();
        this._src = '';
        let shadowRoot = this.attachShadow({ mode: 'open' });
        if (typeof ShadyCSS !== 'undefined') {
            ShadyCSS.prepareTemplate(template$1, 'page-section');
            ShadyCSS.styleElement(this);
        }
        shadowRoot.appendChild(document.importNode(template$1.content, true));
    }
    static get observedAttributes() {
        return ['src'];
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
        this.dispatchEvent(new CustomEvent('activated', { 'detail': {
                'wasActivated': this.getAttribute('wasActivated') !== null
            } }));
    }
    _setUnactive() {
        if (this.hasAttribute('active') && !this.hasAttribute('wasActivated')) {
            this.setAttribute('wasActivated', '');
        }
        this.removeAttribute('active');
        this.dispatchEvent(new CustomEvent('deactivated'));
    }
    set src(src) {
        if (this._src === src)
            return;
        this._src = src;
        fetch(this._src)
            .then(response => response.text())
            .then(html => {
            this.innerHTML = html;
        })
            .catch(console.log);
    }
    get src() {
        return this._src;
    }
}

window.customElements.define('page-sections', PageSectionContainer);
window.customElements.define('page-section', PageSection);

}());
//# sourceMappingURL=page-sections.js.map
