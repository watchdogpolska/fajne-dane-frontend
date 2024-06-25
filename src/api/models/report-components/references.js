import Component from "./component";


export default class ReferencesComponent extends Component {
    constructor(id, name, type, data, metadata) {
        super(id, name, type, metadata);
        this.data = data;
    }

    static fromJson(data) {
        return new ReferencesComponent(
            data['id'],
            data['name'],
            data['type'],
            data['data'],
            data['metadata']
        );
    }

    get componentType() {
        return "references";
    }
}
