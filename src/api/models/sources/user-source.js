import Source from "./source";
import User from "../user";


export default class UserSource extends Source {
    constructor(id, name, user) {
        super(id, name, "USER");
        this.user = user;
    }

    static fromJson(data) {
        return new UserSource(
            data['id'],
            data['name'],
            User.fromJson(data['user'])
        );
    }
}
