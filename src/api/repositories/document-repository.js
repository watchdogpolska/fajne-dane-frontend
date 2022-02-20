import Repository from "./repository";
import {backendConfig} from "../../config";
import Document from "../models/document";


class DocumentRepository extends Repository {
    async list({campaignId}) {
        let response = await this.get(`campaigns/${campaignId}/documents/`);
        return response.data.map((document_data) => Document.fromJson(document_data));
    }
    
    async details({id}) {
        let response = await this.get(`campaigns/documents/${id}`);
        return Document.fromJson(response.data);
    }
}

export const documentRepository = new DocumentRepository(backendConfig.url);
