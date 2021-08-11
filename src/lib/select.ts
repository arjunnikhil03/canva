
import { extend, Element } from '@svgdotjs/svg.js';

export class Select extends Element {
    constructor(el: Element) {
        super()
        console.log(el)
    }
    selectize() {
        this.fill('orange')
        return this
    }
}
extend(Element, Select);