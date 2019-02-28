```js
@customElement('draggable-image')
class DraggableImage extends DraggableMixin(LitElement) {
  @property({ type: String, reflect: true }) src = '';
  @property({ type: String, reflect: true }) alt = '';
  render() {
    return html`<img src="${this.src}" alt="${this.alt}"/>`
  }
}
```
