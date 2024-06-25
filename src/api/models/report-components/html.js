import Component from "./component";


export default class HTMLComponent extends Component {
    constructor(id, name, type, text, metadata) {
        super(id, name, type, metadata);
        this.text = text;
    }

    static fromJson(data) {
        return new HTMLComponent(
            data['id'],
            data['name'],
            data['type'],
            data['text'],
            data['metadata'],
        );
    }

    get componentType() {
        return "html-body";
    }
}
