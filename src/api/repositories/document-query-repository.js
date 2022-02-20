import Repository from "./repository";
import {backendConfig} from "../../config";
import DocumentQuery from "../models/document-query";


class DocumentQueryRepository extends Repository {
    async details({docQueryId}) {
        let response = await this.get(`campaigns/doc-queries/${docQueryId}/`);
        return DocumentQuery.fromJson(response.data);
    }
    
    async statusList({documentId}) {
        let response = await this.get(`campaigns/documents/${documentId}/statuses/`);
        return response.data.map((data) => DocumentQuery.fromJson(data));
    }
}

export const documentQueryRepository = new DocumentQueryRepository(backendConfig.url);
