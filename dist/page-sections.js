'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['<style>\n        :host{\n            display: inline-block;\n            flex: 0 1 auto;\n        }\n        :host(:not([flexible])){\n            box-sizing: border-box;\n            width: 100%;\n            min-height: 100vh;\n        }\n        :host([flexible]){\n            margin-left: 50%;\n            transform: translateX(-50%);\n        }\n    </style>'], ['<style>\n        :host{\n            display: inline-block;\n            flex: 0 1 auto;\n        }\n        :host(:not([flexible])){\n            box-sizing: border-box;\n            width: 100%;\n            min-height: 100vh;\n        }\n        :host([flexible]){\n            margin-left: 50%;\n            transform: translateX(-50%);\n        }\n    </style>']),
    _templateObject2 = _taggedTemplateLiteral(['<style>\n      :host{\n          display: flex;\n          flex-direction: column;\n          flex-wrap: nowrap;\n      }\n    </style>\n    <div class="o-page-sections">\n        <slot></slot>\n    </div>'], ['<style>\n      :host{\n          display: flex;\n          flex-direction: column;\n          flex-wrap: nowrap;\n      }\n    </style>\n    <div class="o-page-sections">\n        <slot></slot>\n    </div>']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var makeTemplate = function makeTemplate(strings) {
    var html = '';

    for (var _len = arguments.length, substs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        substs[_key - 1] = arguments[_key];
    }

    for (var i = 0; i < substs.length; i++) {
        html += strings[i];
        html += substs[i];
    }
    html += strings[strings.length - 1];
    var template = document.createElement('template');
    template.innerHTML = html;
    return template;
};

var template = makeTemplate(_templateObject);

ShadyCSS.prepareTemplate(template, 'page-section');

var PageSectionItem = function (_CustomElement2) {
    _inherits(PageSectionItem, _CustomElement2);

    function PageSectionItem() {
        _classCallCheck(this, PageSectionItem);

        // by default isActive is false
        var _this = _possibleConstructorReturn(this, (PageSectionItem.__proto__ || Object.getPrototypeOf(PageSectionItem)).call(this));
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.


        _this.isActive = false;
        // Attach a shadow root to the element.
        var shadowRoot = _this.attachShadow({ mode: 'open' });
        ShadyCSS.applyStyle(_this);
        shadowRoot.appendChild(document.importNode(template.content, true));
        return _this;
    }
    /**
     * check if element is in view
     */


    _createClass(PageSectionItem, [{
        key: '_isInView',
        value: function _isInView(viewportHeight) {
            viewportHeight = viewportHeight || window.innerHeight;
            // get elements bounding box
            var box = this.getBoundingClientRect();
            // check if element is in view
            if (box.top >= 0 && (box.top < viewportHeight * .5 || box.bottom <= viewportHeight) || box.top < viewportHeight * .5 && box.bottom > viewportHeight * .5) {
                return true;
            }
        }
        /**
         * When element is added to DOM
         */

    }, {
        key: 'connectedCallback',
        value: function connectedCallback() {
            // initialize activated state
            this.activate();
        }
        /**
         * set active if in viewport or unactive if not
         */

    }, {
        key: 'activate',
        value: function activate() {
            if (this._isInView()) {
                if (this.isActive === false) {
                    // set attributes
                    this.setAttribute('active', '');
                    this.isActive = true;
                    // Dispatch the event.
                    this.dispatchEvent(new Event('activated'));
                }
                // return true
                return true;
            }
            // set element to unactive
            if (this.isActive === true) {
                // set attributes
                this.removeAttribute('active');
                this.isActive = false;
                // Dispatch the event.
                this.dispatchEvent(new Event('deactivated'));
            }
        }
    }]);

    return PageSectionItem;
}(_CustomElement);

(function () {

    var template = makeTemplate(_templateObject2);

    ShadyCSS.prepareTemplate(template, 'page-sections');

    var PageSections = function (_CustomElement3) {
        _inherits(PageSections, _CustomElement3);

        function PageSections() {
            _classCallCheck(this, PageSections);

            // create shadowRoot
            var _this2 = _possibleConstructorReturn(this, (PageSections.__proto__ || Object.getPrototypeOf(PageSections)).call(this));
            // If you define a ctor, always call super() first!
            // This is specific to CE and required by the spec.


            var shadowRoot = _this2.attachShadow({ mode: 'open' });
            ShadyCSS.applyStyle(_this2);
            // shadowRoot.innerHTML = `
            //     <style>
            //       :host{
            //           display: flex;
            //           flex-direction: column;
            //           flex-wrap: nowrap;
            //       }
            //     </style>
            //     <div class="o-page-sections">
            //         <slot></slot>
            //     </div>
            // `;
            // Attach a shadow root to the element.
            // let shadowRoot = this.attachShadow({mode: 'open'});
            // ShadyCSS.applyStyle(this);
            shadowRoot.appendChild(document.importNode(template.content, true));
            return _this2;
        }

        _createClass(PageSections, [{
            key: 'connectedCallback',
            value: function connectedCallback() {
                this.activate = this.activate.bind(this);
                this._scrollEvent = this._scrollEvent.bind(this);
                // wrap sections
                window.addEventListener('scroll', this._scrollEvent); // bing this, so that it refers to custom element instead of window
            }
        }, {
            key: '_scrollEvent',
            value: function _scrollEvent(e) {
                clearTimeout(this._scrollEvent.fn);
                this._scrollEvent.fn = setTimeout(function () {
                    this.activate();
                }.bind(this), 10);
            }
            // check if a child element is in view and set it to active

        }, {
            key: 'activate',
            value: function activate() {
                if (this._isInView()) {
                    // set section wrapper to active
                    this.isActive = true;
                    this.setAttribute('active', '');
                    // get all child-sections
                    var elements = this.querySelectorAll('page-section');
                    // loop through all items
                    for (var i = 0; elements.length > i; ++i) {
                        // activate element
                        elements[i].activate();
                        // abort if current element is NOT in view, but previous was in view
                        if (i > 0 && elements[i].isActive === false && elements[i - 1].isActive === true) {
                            return;
                        }
                    }
                    return;
                }
                // set section wrapper to active
                this.isActive = false;
                this.removeAttribute('active');
            }
            /**
             * check if section wrapper is in viewport
             */

        }, {
            key: '_isInView',
            value: function _isInView() {
                return this.getBoundingClientRect().bottom > 0;
            }
        }]);

        return PageSections;
    }(_CustomElement);

    window.customElements.define('page-sections', PageSections);
    window.customElements.define('page-section', PageSectionItem);
})();
//# sourceMappingURL=page-sections.js.map
