
export default class Institution {
    constructor(id, key, name, link, address) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.link = link;
        this.address = address
    }

    static fromJson(data) {
        return new Institution(
            data['id'],
            data['key'],
            data['name'],
            data['link'],
            data['address']
        );
    }
}
