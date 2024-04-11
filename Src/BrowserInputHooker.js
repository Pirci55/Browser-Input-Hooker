class BrowserInputHooker {
    constructor() { }
    index = {};
    addIndex(value) {
        const id = Math.floor(Math.random() * Math.pow(2, 32));
        if (this.index[id]) return this.addIndex(value);
        this.index[id] = value;
        return id;
    };
    removeIndex(id) {
        delete this.index[id];
    };
    down(element, keyboardEventParams) {
        element.dispatchEvent(new KeyboardEvent('keydown', keyboardEventParams));
        return this.addIndex({ element, params: keyboardEventParams });
    };
    up(id) {
        const item = this.index[id];
        item.element.dispatchEvent(new KeyboardEvent('keyup', item.params));
        return this.removeIndex(id);
    };
    click(element, keyboardEventParams, durationMs = 0) {
        const id = this.down(element, keyboardEventParams);
        setTimeout(() => { this.up(id); }, durationMs);
    };
}