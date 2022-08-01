import DocumentQuery from "./document-query";
import Institution from './institutions/institution';


export default class Document {
    constructor(id, data, source, status, created, institution, documentQueries) {
        this.id = id;
        this.data = data;
        this.status = status;
        this.source = source;
        this.institution = institution;
        this.created = created;
        this.documentQueries = documentQueries;
    }

    get createdDate() {
        let result = this.created.toISOString().replace('-', '/').split('T')[0].replace('-', '/');
        return result.split('/').reverse().join('/');
    }
    
    get institution_id() {
        for (let [key, value] of Object.entries(this.data)) {
            if (key === "institution_id")
                return value;
        }
    }

    static fromJson(data) {
        let documentQueries = data['document_queries'] || [];
        let institution = null;
        if ('institution' in data)
            institution = Institution.fromJson(data['institution']);
        
        return new Document(
            data['id'],
            data['data'],
            data['source'],
            data['status'],
            new Date(Date.parse(data['created'])),
            institution,
            documentQueries.map((q) => DocumentQuery.fromJson(q))
        )
    }
}
