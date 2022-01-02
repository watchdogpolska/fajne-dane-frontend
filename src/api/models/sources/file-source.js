import Source from "./source";


export default class FileSource extends Source {
    constructor(id, name, description, source, file) {
        super(id, name);
        this.description = description;
        this.source = source;
        this.file = file;
    }

    static fromJson(data) {
        return new FileSource(
            data['id'],
            data['name'],
            data['description'],
            data['source'],
            data['file']
        );
    }
}
