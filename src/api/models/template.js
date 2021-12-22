

class TemplateValidationError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static fromJson(data) {
        return new TemplateValidationError(
            data['code'], data['message']
        );
    }
}


export class TemplateValidationReport {
    constructor(isValid, errors) {
        this.isValid = isValid;
        this.errors = errors;
    }

    static fromJson(data) {
        return new TemplateValidationReport(
            data['is_valid'], data['errors'].map(
                (e) => new TemplateValidationError(e['code'], e['message'])
            )
        );
    }
}


export class TemplateWrapper {
    constructor(template) {
        this.template = template;
    }

    static fromJson(data) {
        return new TemplateWrapper(
            data['template']
        );
    }
}
