
export class ValidationError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static fromJson(data) {
        return new ValidationError(
            data['code'], data['message']
        );
    }
}
