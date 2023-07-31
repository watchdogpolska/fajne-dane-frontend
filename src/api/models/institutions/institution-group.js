
export default class InstitutionGroup {
    constructor(id, name, institutions_count, fields, parent) {
        this.id = id;
        this.name = name;
        this.institutions_count = institutions_count;
        this.fields = fields;
        this.parent = parent;
    }

    static fromJson(data) {
        let parent = data['parent'] ? InstitutionGroup.fromJson(data['parent']) : null;

        return new InstitutionGroup(
            data['id'],
            data['name'],
            data['institutions_count'],
            data['fields'],
            parent
        );
    }
}
