import Repository from "./repository";
import {backendConfig} from "../../config";


class RecordsRepository extends Repository {
    async create({docQueryId, payload}) {
        let response = await this.post(
            `/campaigns/doc-queries/${docQueryId}/records/create/`,
            payload
        )
        return response;
    }

    async list({docQueryId}) {
        let response = await this.get(`campaigns/doc-queries/${docQueryId}/records/`);
        return response.data.map((document_data) => Document.fromJson(document_data));
    }
}

export const recordsRepository = new RecordsRepository(backendConfig.url);
