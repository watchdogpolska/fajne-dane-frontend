import Repository from "./repository";
import DocumentQuery from "../models/document-query";


export class DocumentQueryRepository extends Repository {
    async details({docQueryId}) {
        let response = await this.get(`campaigns/doc-queries/${docQueryId}/`);
        return DocumentQuery.fromJson(response.data);
    }
    
    async statusList({documentId}) {
        let response = await this.get(`campaigns/documents/${documentId}/statuses/`);
        return response.data.map((data) => DocumentQuery.fromJson(data));
    }
}
