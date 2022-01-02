import {ValidationError} from "./errors";


export class DocumentParsingReport {
    constructor(index, data, isValid, errors) {
        this.index = index;
        this.data = data;
        this.isValid = isValid;
        this.errors = errors;
    }

    static fromJson(data) {
        return new TemplateValidationReport(
            data['index'],
            data['data'],
            data['is_valid'],
            data['errors'].map(
                (e) => new ValidationError(e['code'], e['message'])
            )
        );
    }
}


export class ParsingReport {
    constructor(isValid, validDocumentsCount, invalidDocumentsCount, fileErrors, documentsErrors) {
        this.isValid = isValid;
        this.validDocumentsCount = validDocumentsCount;
        this.invalidDocumentsCount = invalidDocumentsCount;
        this.fileErrors = fileErrors;
        this.documentsErrors = documentsErrors;
    }

    static fromJson(data) {
        return new ParsingReport(
            data['is_valid'],
            data['valid_documents_count'],
            data['invalid_documents_count'],
            data['documents_errors'],
            data['file_errors']
        );
    }
}

