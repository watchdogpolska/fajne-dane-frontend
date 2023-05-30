
export default class Pagination {
    constructor(count, next, previous, results) {
        this.count = count;
        this.next = next;
        this.previous = previous;
        this.results = results;
    }

    static fromJson(type, data) {
        let results = null;
        if (data.constructor === Array)
            results = data;
        else
            results = data['results'].map((result) => type.fromJson(result));

        return new Pagination(
            data['count'],
            data['next'],
            data['previous'],
            results
        );
    }
}
