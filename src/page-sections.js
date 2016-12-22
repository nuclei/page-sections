class PageSections extends HTMLElement {

    constructor() {
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
        // create shadowRoot
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>
              :host{
                  display: flex;
                  flex-direction: column;
                  flex-wrap: nowrap;
              }
            </style>
            <div class="o-page-sections">
                <slot></slot>
            </div>
        `;
    }

    connectedCallback() {
        this.activate = this.activate.bind(this);
        this._scrollEvent = this._scrollEvent.bind(this);
        // wrap sections
        window.addEventListener('scroll', this._scrollEvent); // bing this, so that it refers to custom element instead of window
    }

    _scrollEvent(e) {
        clearTimeout( this._scrollEvent.fn );
        this._scrollEvent.fn = setTimeout( function(){
            this.activate();
        }.bind(this), 10);
    }
    // check if a child element is in view and set it to active
    activate() {
        if(this._isInView()){
            // set section wrapper to active
            this.isActive = true;
            this.setAttribute('active','');
            // get all child-sections
            var elements = this.querySelectorAll('page-section');
            // loop through all items
            for(var i = 0; elements.length > i; ++i){
                // activate element
                elements[i].activate();
                // abort if current element is NOT in view, but previous was in view
                if(i > 0 && elements[i].isActive === false && elements[i-1].isActive === true){
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
    _isInView(){
        return this.getBoundingClientRect().bottom > 0;
    }
}
window.customElements.define('page-sections', PageSections);
