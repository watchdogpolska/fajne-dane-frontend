import Repository from "./repository";
import {Query} from '../models/query';


export class QueryRepository extends Repository {
    async campaignQueries({campaignId}) {
        let response = await this.get(`campaigns/queries/${campaignId}/`);
        return Query.fromJson(response.data);
    }
}
