import Component from "./component";


export default class HeaderComponent extends Component {
    constructor(id, name, type, title, subtitle, metadata) {
        super(id, name, type, metadata);
        this.title = title;
        this.subtitle = subtitle;
    }

    static fromJson(data) {
        return new HeaderComponent(
            data['id'],
            data['name'],
            data['type'],
            data['title'],
            data['subtitle'],
            data['metadata'],
        );
    }

    get componentType() {
        return "title-block";
    }
}
