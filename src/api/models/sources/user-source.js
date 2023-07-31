import Source from "./source";
import User from "../user";


export default class UserSource extends Source {
    constructor(id, name, user) {
        super(id, name);
        this.user = user;
        this.type = "USER";
    }

    static fromJson(data) {
        return new UserSource(
            data['id'],
            data['name'],
            User.fromJson(data['user'])
        );
    }
}
