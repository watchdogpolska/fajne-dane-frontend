import DataComponent from "./data-component";
import DataView from "@/api/models/data-view";


export default class TableComponent extends DataComponent {
    constructor(id, name, type, dataView, title, columns) {
        super(id, name, type, dataView);
        this.title = title;
        this.columns = columns;
    }

    static fromJson(data) {
        let dataView = 'data_view' in data ? DataView.fromJson(data['data_view']) : null;
        return new TableComponent(
            data['id'],
            data['name'],
            data['type'],
            dataView,
            data['title'],
            data['columns']
        );
    }
}
