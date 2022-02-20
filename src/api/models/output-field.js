
export default class OutputFiled {
    constructor(id, name, widget, answers, metadata, type, validation, defaultAnswer) {
        this.id = id;
        this.name = name;
        this.widget = widget;
        this.answers = answers;
        this.metadata = metadata;
        this.type = type;
        this.validation = validation;
        this.defaultAnswer = defaultAnswer;
    }
    
    static fromJson(data) {
        return new OutputFiled(
            data['id'],
            data['name'],
            data['widget'],
            data['answers'],
            data['metadata'],
            data['type'],
            data['validation'],
            data['default_answer'],
        )
    }
}
