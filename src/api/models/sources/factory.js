import FileSource from "./file-source";
import UserSource from "./user-source";


export function createSource(data) {
    if (data['type'] === 'FILE')
        return FileSource.fromJson(data);
    else if (data['type'] === "USER")
        return UserSource.fromJson(data)
    return null;
}
