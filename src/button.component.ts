const template = document.createElement('template')
template.innerHTML = `
  <style>
  :host(:not([hidden])){
    display: inline-block;
  }
  :host button {
    background-color: lightseagreen;
    color: #fff;
    padding: 3px 10px;
    margin: 0 0 0 3px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    line-height: 24px;
    cursor: pointer;
    vertical-align: bottom;
  }
  :host(:hover) button {
    background-color: lightslategrey;
  }
  
  :host(.danger) button {
    background-color: red;
  }
  :host(.danger:hover) button {
    background-color: darkred;
  }
  </style>
  <button>
    <slot></slot>
  </button>
`
export class Button extends HTMLElement {
  static is = 'my-button'
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

export default customElements.define(Button.is, Button)
