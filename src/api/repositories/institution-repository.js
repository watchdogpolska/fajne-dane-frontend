import Repository from "./repository";
import Institution from '../models/institutions/institution';
import Pagination from "../models/utils/pagination";


export class InstitutionRepository extends Repository {
    async list({groupId, params}) {
        let response = await this.get(`campaigns/institution-groups/${groupId}/institutions/`, params);
        return Pagination.fromJson(Institution, response.data)
    }

    async details({groupId}) {
        let response = await this.get(`campaigns/institution/${id}/`);
        return Institution.fromJson(response.data);
    }

    async create({groupId, key, name, parentId, link, address}) {
        let response = await this.post(
            `campaigns/institution-groups/${groupId}/institutions/create/`,
            { key: key, name: name, parent_id: parentId, link: link, address: address }
        )
        return Institution.fromJson(response.data);
    }
}
