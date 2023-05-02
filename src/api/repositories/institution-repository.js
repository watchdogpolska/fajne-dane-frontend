import Repository from "./repository";
import Institution from '../models/institutions/institution';


export class InstitutionRepository extends Repository {
    async list({groupId}) {
        let response = await this.get(`campaigns/institution-groups/${groupId}/institutions/`);
        return response.data.map((data) => Institution.fromJson(data));
    }

    async details({groupId}) {
        let response = await this.get(`campagins/institution/${id}/`);
        return Institution.fromJson(response.data);
    }
}
