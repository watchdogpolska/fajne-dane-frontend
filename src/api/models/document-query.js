import Query from "./query";
import Record from "./record";


export default class DocumentQuery {
    constructor(id, query, status, records, acceptedRecords) {
        this.id = id;
        this.query = query;
        this.status = status;
        this.records = records;
        this.acceptedRecords = acceptedRecords;
    }

    static fromJson(data) {
        let records = data['records'] || [];
        let query = null;
        if ('query' in data)
            query = Query.fromJson(data['query']);
        let acceptedRecords = data['accepted_records'] || [];

        return new DocumentQuery(
            data['id'],
            query,
            data['status'],
            records.map((q) => Record.fromJson(q)),
            acceptedRecords.map((r) => Record.fromJson(r))
        )
    }
}
