import Repository from "./repository";
import Document from "../models/document";
import Pagination from "../models/utils/pagination";


export class DocumentRepository extends Repository {
    async list({campaignId, params}) {
        let response = await this.get(`campaigns/${campaignId}/documents/`, params);
        return Pagination.fromJson(Document, response.data)
    }
    
    async statuses({campaignId, params}) {
        let response = await this.get(`campaigns/${campaignId}/documents/status/`, params);
        return response.data
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
    
    async next({campaignId}) {
        let response = await this.get(`campaigns/${campaignId}/documents/next/`);
        return Document.fromJson(response.data);
    }
}
