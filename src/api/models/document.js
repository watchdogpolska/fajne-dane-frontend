
export default class Document {
    constructor(id, data, source, status, created) {
        this.id = id;
        this.data = data;
        this.source = source;
        this.status = status;
        this.created = created;
    }
    
    get institution() {
        for (let [key, value] of Object.entries(this.data)) {
            if (key == "institution_id")
                return value;
        }
    }

    get created_date() {
        let result = this.created.toISOString().replace('-', '/').split('T')[0].replace('-', '/');
        return result.split('/').reverse().join('/');
    }

    static fromJson(data) {
        return new Document(
            data['id'],
            data['data'],
            data['source'],
            data['status'],
            new Date(Date.parse(data['created'])),
        )
    }
}
