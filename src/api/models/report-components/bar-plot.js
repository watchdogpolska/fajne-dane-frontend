import DataComponent from "./data-component";
import DataView from "@/api/models/data-view";


export default class BarPlotComponent extends DataComponent {
    constructor(id, name, type, dataView, title, index, value, metadata) {
        super(id, name, type, dataView, metadata);
        this.title = title;
        this.index = index;
        this.value = value;
    }

    static fromJson(data) {
        let dataView = 'data_view' in data ? DataView.fromJson(data['data_view']) : null;
        return new BarPlotComponent(
            data['id'],
            data['name'],
            data['type'],
            dataView,
            data['title'],
            data['index'],
            data['value'],
            data['metadata'],
        );
    }
    
    get componentType() {
        if (this.dataView.type === "VALUE_COUNTS")
            return "frequency-plot";
    }
}
