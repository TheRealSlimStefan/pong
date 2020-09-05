import Figure from '/figure.js'

export default class Rect extends Figure {
    constructor(x, y, width, height, color) {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }
}