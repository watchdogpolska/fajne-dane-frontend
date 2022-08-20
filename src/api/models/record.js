import {createSource} from "./sources/factory";


export default class Record {
    constructor(id, value, probability, source, status) {
        this.id = id;
        this.value = value;
        this.probability = probability;
        this.source = source;
        this.status = status;
    }
    
    static fromJson(data) {
        let source = null;
        if ('source' in data)
            source = createSource(data['source'])
        
        return new Record(
            data['id'],
            data['value'],
            data['probability'],
            source,
            data['status']
        )
    }
}
