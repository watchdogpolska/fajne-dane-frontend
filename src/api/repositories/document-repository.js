import Repository from "./repository";
import Document from "../models/document";


export class DocumentRepository extends Repository {
    async list({campaignId}) {
        let response = await this.get(`campaigns/${campaignId}/documents/`);
        return response.data.map((document_data) => Document.fromJson(document_data));
    }
    
    async details({id}) {
        let response = await this.get(`campaigns/documents/${id}/`);
        return Document.fromJson(response.data);
    }
    
    async createDocument({data, campaignId}) {
        let response = await this.post(
            `campaigns/${campaignId}/documents/create/`,
            { campaign: campaignId, data: data }
        )
        return Document.fromJson(response.data);
    }

    async bulkDelete({campaignId, ids}) {
        let response = await this.post(
            `campaigns/${campaignId}/documents/delete/`,
            { ids: ids }
        )
        return response;
    }
}
