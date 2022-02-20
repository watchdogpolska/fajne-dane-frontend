import OutputField from "./output-field";


export default class Query {
    constructor(id, name, order, data, outputField) {
        this.id = id;
        this.name = name;
        this.order = order;
        this.data = data;
        this.outputField = outputField;
    }
    
    static fromJson(data) {
        let outputField = null;
        if ('output_field' in data)
            outputField = OutputField.fromJson(data['output_field'])

        return new Query(
            data['id'],
            data['name'],
            data['order'],
            data['data'],
            outputField
        )
    }
}
