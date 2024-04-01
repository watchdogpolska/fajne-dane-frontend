import DataSource from "@/api/models/data-source";

export default class DataView {
    constructor(id, name, type, keys, values, aggregation, fileUrl, dataSource) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.keys = keys;
        this.values = values;
        this.aggregation = aggregation;
        this.fileUrl = fileUrl;
        this.dataSource = dataSource;
    }
    static fromJson(data) {
        return new DataView(
            data['id'],
            data['name'],
            data['type'],
            data['keys'],
            data['values_labels'],
            data['aggregation'],
            data['file_url'],
            DataSource.fromJson(data['data_source'])
        )
    }
}
