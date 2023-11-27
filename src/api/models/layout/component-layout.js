
export default class ComponentLayout {
    constructor(order, width) {
        this.order = order;
        this.width = width;
    }

    static fromJson(data) {
        return new ComponentLayout(
            data['order'],
            data['width'],
        );
    }

    toJson() {
        return {
            'order': this.order,
            'width': this.width
        };
    }
}
