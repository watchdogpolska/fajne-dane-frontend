import DataComponent from "./data-component";


export default class TableComponent extends DataComponent {
    constructor(id, name, type, dataUrl, title, columns) {
        super(id, name, type, dataUrl);
        this.title = title;
        this.columns = columns;
    }

    static fromJson(data) {
        return new TableComponent(
            data['id'],
            data['name'],
            data['type'],
            data['data_url'],
            data['title'],
            data['columns']
        );
    }
}
