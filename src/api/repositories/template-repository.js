import Repository from "./repository";
import {TemplateWrapper, TemplateValidationReport} from "../models/validation/template";


export class TemplateRepository extends Repository {
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
