import DocumentQuery from "./document-query";

export default class Document {
    constructor(id, data, source, status, created, documentQueries) {
        this.id = id;
        this.data = data;
        this.status = status;
        this.source = source;
        this.created = created;
        this.documentQueries = documentQueries;
    }

    get createdDate() {
        let result = this.created.toISOString().replace('-', '/').split('T')[0].replace('-', '/');
        return result.split('/').reverse().join('/');
    }
    
    get institution() {
        for (let [key, value] of Object.entries(this.data)) {
            if (key === "institution_id")
                return value;
        }
    }

    static fromJson(data) {
        let documentQueries = data['document_queries'] || [];
        
        return new Document(
            data['id'],
            data['data'],
            data['source'],
            data['status'],
            new Date(Date.parse(data['created'])),
            documentQueries.map((q) => DocumentQuery.fromJson(q))
        )
    }
}
