import Repository from "./repository";
import {backendConfig} from "../../config";
import FileSource from "../models/sources/file-source";
import {ParsingReport} from "../models/validation/parsing";


class FileSourceRepository extends Repository {
    async list({campaignId}) {
        let response = await this.get(`campaigns/${campaignId}/sources/`);
        return response.data.map((source_data) => FileSource.fromJson(source_data));
    }

    async getFileSource({campaignId, id}) {
        let response = await this.get(`campaigns/${campaignId}/sources/${id}/`);
        return FileSource.fromJson(response.data);
    }

    async validate({campaignId, file}) {
        let response = await this.postFile(
            `campaigns/${campaignId}/sources/validate/`,
            {file: file}
        );
        return ParsingReport.fromJson(response.data);
    }

    async patchFileSource({campaignId, id, name, description, source, file}) {
        let response = await this.patch(
            `campaigns/${campaignId}/sources/${id}/`,
            {
                name: name,
                description: description,
                source: source,
                file: file
            }
        );
        return FileSource.fromJson(response.data);
    }

    async create({campaignId, name, description, source, file}) {
        let response = await this.postFile(
            `campaigns/${campaignId}/sources/create/`,
            {
                name: name,
                description: description,
                source: source,
                file: file
            }
        );
        return FileSource.fromJson(response.data);
    }
}

export const fileSourceRepository = new FileSourceRepository(backendConfig.url);
