class PageSectionItem extends HTMLElement {
    constructor() {
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
        // by default isActive is false
        this.isActive = false;
        // create shadowRoot
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <style>
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
        `;
    }
    /**
     * check if element is in view
     */
    _isInView(viewportHeight){
        viewportHeight = viewportHeight || window.innerHeight;
        // get elements bounding box
        var box = this.getBoundingClientRect();
        // check if element is in view
        if( (box.top >= 0 && (
                box.top < viewportHeight *.5 ||
                box.bottom <= viewportHeight )) ||
            (box.top  < viewportHeight *.5 && box.bottom > viewportHeight*.5)
        ){
            return true;
        }
    }
    /**
     * When element is added to DOM
     */
    connectedCallback() {
        // initialize activated state
        this.activate();
    }
    /**
     * set active if in viewport or unactive if not
     */
    activate() {
        if(this._isInView()){
            if(this.isActive === false){
                // set attributes
                this.setAttribute('active','');
                this.isActive = true;
                // Dispatch the event.
                this.dispatchEvent(new Event('activated'));
            }
            // return true
            return true;
        }
        // set element to unactive
        if(this.isActive === true){
            // set attributes
            this.removeAttribute('active');
            this.isActive = false;
            // Dispatch the event.
            this.dispatchEvent(new Event('deactivated'));
        }
    }
}
window.customElements.define('page-section', PageSectionItem);
