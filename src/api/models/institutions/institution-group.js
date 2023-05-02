
export default class InstitutionGroup {
    constructor(id, name, institutions_count, fields) {
        this.id = id;
        this.name = name;
        this.institutions_count = institutions_count;
        this.fields = fields;
    }

    static fromJson(data) {
        return new InstitutionGroup(
            data['id'],
            data['name'],
            data['institutions_count'],
            data['fields']
        );
    }
}
