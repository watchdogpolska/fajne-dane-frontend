import ReportComponent from "./component";


export default class HTMLComponent extends ReportComponent {
    constructor(id, name, type, text) {
        super(id, name, type);
        this.text = text;
    }

    static fromJson(data) {
        return new HTMLComponent(
            data['id'],
            data['name'],
            data['type'],
            data['text']
        );
    }
}
