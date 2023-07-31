
export class DocumentField {
    constructor(id, name, widget, type) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.widget = widget;
    }

    static fromJson(data) {
        return new DocumentField(
            data['id'],
            data['name'],
            data['type'],
            data['widget']
        )
    }
}
