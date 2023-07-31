import Repository from "./repository";
import InstitutionGroup from '../models/institutions/institution-group';


export class InstitutionGroupRepository extends Repository {
    async list() {
        let response = await this.get(`campaigns/institution-groups/`);
        return response.data.map((data) => InstitutionGroup.fromJson(data));
    }

    async details({groupId}) {
        let response = await this.get(`campaigns/institution-groups/${groupId}/`);
        return InstitutionGroup.fromJson(response.data);
    }

    async create({name, parent, fields}) {
        let response = await this.post(
            `campaigns/institution-groups/create/`,
            { name: name, parent_id: parent, fields: fields }
        )
        return InstitutionGroup.fromJson(response.data);
    }

    async update({groupId, name}) {
        let response = await this.patch(
            `campaigns/institution-groups/${groupId}/`,
            { name: name }
        )
        return InstitutionGroup.fromJson(response.data);
    }

    async deleteGroup({groupId}) {
        let response = await this.delete(`campaigns/institution-groups/${groupId}/`);
        return response;
    }
}
