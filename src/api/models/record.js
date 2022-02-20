
export default class Record {
    constructor(id, value, probability, source, status) {
        this.id = id;
        this.value = value;
        this.probability = probability;
        this.source = source;
        this.status = status;
    }
    
    static fromJson(data) {
        return new Record(
            data['id'],
            data['value'],
            data['probability'],
            data['source'],
            data['status']
        )
    }
}
