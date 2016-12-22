'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageSections = function (_HTMLElement) {
    _inherits(PageSections, _HTMLElement);

    function PageSections() {
        _classCallCheck(this, PageSections);

        // create shadowRoot
        var _this = _possibleConstructorReturn(this, (PageSections.__proto__ || Object.getPrototypeOf(PageSections)).call(this));
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.


        var shadowRoot = _this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = '\n            <style>\n              :host{\n                  display: flex;\n                  flex-direction: column;\n                  flex-wrap: nowrap;\n              }\n            </style>\n            <div class="o-page-sections">\n                <slot></slot>\n            </div>\n        ';
        return _this;
    }

    _createClass(PageSections, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.setActive = this._setActive.bind(this);
            this.scroll_fn;
            this._scrollEvent = this._scrollEvent.bind(this);

            setTimeout(function () {
                this._setActive();
            }.bind(this), 1);
            // wrap sections
            window.addEventListener('scroll', this._scrollEvent); // bing this, so that it refers to custom element instead of window
        }
    }, {
        key: '_scrollEvent',
        value: function _scrollEvent(e) {
            clearTimeout(this._scrollEvent.fn);
            this._scrollEvent.fn = setTimeout(function () {
                this._setActive();
            }.bind(this), 10);
        }
        // check if a child element is in view and set it to active

    }, {
        key: '_setActive',
        value: function _setActive() {
            // abort if section wrapper is not in view
            if (this.getBoundingClientRect().bottom <= 0) {
                // set section wrapper to active
                this.isActive = false;
                this.removeAttribute('active');
                return;
            }
            // set section wrapper to active
            this.isActive = true;
            this.setAttribute('active', '');
            // get all child-sections
            var elements = this.querySelectorAll('page-section');
            // loop through all items
            for (var i = 0; elements.length > i; ++i) {
                elements[i].removeAttribute('active');
                this._isActive(elements[i]);
            }
        }
    }, {
        key: '_isActive',
        value: function _isActive(element) {
            if (this._inView(element.getBoundingClientRect())) {
                element.setActive();
            }
        }
    }, {
        key: '_inView',
        value: function _inView(box) {}
    }]);

    return PageSections;
}(HTMLElement);

window.customElements.define('page-sections', PageSections);
//# sourceMappingURL=page-sections.js.map
