import Source from "./source";


export default class FileSource extends Source {
    constructor(id, name, description, sourceLink, sourceDate, created, file, status) {
        super(id, name, "FILE");
        this.description = description;
        this.sourceLink = sourceLink;
        this.sourceDate = sourceDate;
        this.created = created;
        this.file = file;
        this.status = status;
    }

    static fromJson(data) {
        return new FileSource(
            data['id'],
            data['name'],
            data['description'],
            data['source_link'],
            new Date(Date.parse(data['source_date'])),
            new Date(Date.parse(data['created'])),
            data['file'],
            data['status']
        );
    }
}
