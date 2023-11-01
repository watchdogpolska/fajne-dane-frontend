import DataComponent from "./data-component";


export default class MapFrequencyComponent extends DataComponent {
    constructor(id, name, type, dataUrl, title, index, value) {
        super(id, name, type, dataUrl);
        this.title = title;
        this.index = index;
        this.value = value;
    }

    static fromJson(data) {
        return new MapFrequencyComponent(
            data['id'],
            data['name'],
            data['type'],
            data['data_url'],
            data['title'],
            data['index'],
            data['value']
        );
    }
}
