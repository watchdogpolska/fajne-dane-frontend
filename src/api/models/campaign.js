import {DocumentField} from './document-field';


export default class Campaign {
    constructor(id, name, status, created, template, documentFields) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.created = created;
        this.template = template;
        this.documentFields = documentFields;
    }

    get createdDate() {
        let result = this.created.toISOString().replace('-', '/').split('T')[0].replace('-', '/');
        return result.split('/').reverse().join('/');
    }

    static fromJson(data) {
        let documentFields = null;
        if (data['document_fields_objects'])
            documentFields = data['document_fields_objects'].map((field) => DocumentField.fromJson(field));
        
        return new Campaign(
            data['id'],
            data['name'],
            data['status'],
            new Date(Date.parse(data['created'])),
            data['template'] || null,
            documentFields
        )
    }
}
