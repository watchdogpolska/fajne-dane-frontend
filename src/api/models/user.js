
export default class User {
    constructor(id, firstName, lastName, email) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }

    static fromJson(data) {
        return new User(
            data['id'], data['first_name'], data['last_name'], data['email']
        )
    }
}