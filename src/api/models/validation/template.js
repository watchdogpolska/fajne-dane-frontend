import {ValidationError} from "./errors";


export class TemplateValidationReport {
    constructor(isValid, errors) {
        this.isValid = isValid;
        this.errors = errors;
    }

    static fromJson(data) {
        return new TemplateValidationReport(
            data['is_valid'], data['errors'].map(
                (e) => new ValidationError(e['code'], e['message'])
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
