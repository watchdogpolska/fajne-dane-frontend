import Component from "./component";


export default class HeaderComponent extends Component {
    constructor(id, name, type, title, subtitle) {
        super(id, name, type);
        this.title = title;
        this.subtitle = subtitle;
    }

    static fromJson(data) {
        return new HeaderComponent(
            data['id'],
            data['name'],
            data['type'],
            data['title'],
            data['subtitle']
        );
    }
}
