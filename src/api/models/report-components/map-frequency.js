import DataComponent from "./data-component";
import DataView from "@/api/models/data-view";


export default class MapFrequencyComponent extends DataComponent {
    constructor(id, name, type, dataView, title, index, value) {
        super(id, name, type, dataView);
        this.title = title;
        this.index = index;
        this.value = value;
    }

    static fromJson(data) {
        let dataView = 'data_view' in data ? DataView.fromJson(data['data_view']) : null;
        return new MapFrequencyComponent(
            data['id'],
            data['name'],
            data['type'],
            dataView,
            data['title'],
            data['index'],
            data['value']
        );
    }

    get componentType() {
        return "answers-map";
    }
}
