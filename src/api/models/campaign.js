
export default class Campaign {
    constructor(id, name, status, created, template) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.created = created;
        this.template = template;
    }

    get created_date() {
        let result = this.created.toISOString().replace('-', '/').split('T')[0].replace('-', '/');
        return result.split('/').reverse().join('/');
    }

    static fromJson(data) {
        return new Campaign(
            data['id'],
            data['name'],
            data['status'],
            new Date(Date.parse(data['created'])),
            data['template'] || null
        )
    }
}
