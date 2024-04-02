import Component from "./component";


export default class ReferencesComponent extends Component {
    constructor(id, name, type, data) {
        super(id, name, type);
        this.data = data;
    }

    static fromJson(data) {
        return new ReferencesComponent(
            data['id'],
            data['name'],
            data['type'],
            data['data']
        );
    }

    get componentType() {
        return "references";
    }
}
