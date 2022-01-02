
export default class Source {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fromJson(data) {
        return new Source(
            data['id'],
            data['name']
        );
    }
}
