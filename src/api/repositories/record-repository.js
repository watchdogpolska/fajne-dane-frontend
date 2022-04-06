import Repository from "./repository";
import Document from '../models/document';


export class RecordRepository extends Repository {
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
