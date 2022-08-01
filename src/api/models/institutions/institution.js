
export default class Institution {
    constructor(id, key, name) {
        this.id = id;
        this.key = key;
        this.name = name;
    }

    static fromJson(data) {
        return new Institution(
            data['id'],
            data['key'],
            data['name']
        );
    }
}
