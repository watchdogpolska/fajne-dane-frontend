
export default class Pagination {
    constructor(count, next, previous, results) {
        this.count = count;
        this.next = next;
        this.previous = previous;
        this.results = results;
    }

    static fromJson(type, data) {
        return new Pagination(
            data['count'],
            data['next'],
            data['previous'],
            data['results'].map((result) => type.fromJson(result))
        );
    }
}
