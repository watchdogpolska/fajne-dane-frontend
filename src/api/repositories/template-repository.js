import Repository from "./repository";
import {backendConfig} from "../../config";
import {TemplateWrapper, TemplateValidationReport} from "../models/validation/template";


class TemplateRepository extends Repository {
    async getMetaTemplate() {
        let response = await this.get("campaigns/template/")
        return TemplateWrapper.fromJson(response.data);
    }
    
    async validate({template}) {
        let response = await this.post(
            '/campaigns/template/validate/',
            { template: template }
        )
        return TemplateValidationReport.fromJson(response.data);
    }
}

export const templateRepository = new TemplateRepository(backendConfig.url);
