import Repository from "./repository";
import Institution from '../models/institutions/institution';
import Pagination from "../models/utils/pagination";


export class InstitutionRepository extends Repository {
    async list({groupId, params}) {
        let response = await this.get(`campaigns/institution-groups/${groupId}/institutions/`, params);
        return Pagination.fromJson(Institution, response.data)
    }

    async details({id}) {
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
    async bulkDelete({groupId, ids}) {
        return await this.post(
            `campaigns/institution-groups/${groupId}/institutions/delete/`,
            { ids: ids }
        )
    }

    async update({id, name, key, address, link}) {
        let response = await this.patch(
            `campaigns/institution/${id}/`,
            { name: name, key:key, address:address, link:link }
        )
        return Institution.fromJson(response.data);
    }
}
