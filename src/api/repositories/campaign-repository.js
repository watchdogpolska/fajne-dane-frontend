import Repository from "./repository";
import {backendConfig} from "../../config";
import Campaign from "../models/campaign";


class CampaignRepository extends Repository {
    async list() {
        let response = await this.get("campaigns/")
        return response.data.map((campaign_data) => Campaign.fromJson(campaign_data));
    }

    async getCampaign({id}) {
        let response = await this.get(`campaigns/${id}/`);
        return Campaign.fromJson(response.data);
    }

    async deleteCampaign({id}) {
        let response = await this.delete(`campaigns/${id}/`);
        return Campaign.fromJson(response.data);
    }

    async updateCampaign({id, payload}) {
        let response = await this.put(
            `/campaigns/${id}/`,
            payload
        )
        console.log(response);
        return response;
    }
    
    async createCampaign({name, template}) {
        let response = await this.post(
            '/campaigns/create/',
            { name: name, template: template }
        )
        return response;
    }
}

export const campaignRepository = new CampaignRepository(backendConfig.url);
