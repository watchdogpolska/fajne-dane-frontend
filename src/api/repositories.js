import { AuthRepository } from './repositories/auth-repository';
import { CampaignRepository } from './repositories/campaign-repository';
import { DocumentQueryRepository } from './repositories/document-query-repository';
import { DocumentRepository } from './repositories/document-repository';
import { FileSourceRepository } from './repositories/file-source-repository';
import { RecordRepository } from './repositories/record-repository';
import { TemplateRepository } from './repositories/template-repository';
import { InstitutionGroupRepository } from "@/api/repositories/institution-group-repository";
import { InstitutionRepository } from "@/api/repositories/institution-repository";
import { ReportRepository } from "@/api/repositories/report-repository";


export class Repositories {
    constructor(api_url, session) {
        this.session = session;
        
        this.auth = new AuthRepository(api_url, session);
        this.campaign = new CampaignRepository(api_url, session);
        this.document = new DocumentRepository(api_url, session);
        this.documentQuery = new DocumentQueryRepository(api_url, session);
        this.fileSource = new FileSourceRepository(api_url, session);
        this.record = new RecordRepository(api_url, session);
        this.template = new TemplateRepository(api_url, session);
        this.institutionGroup = new InstitutionGroupRepository(api_url, session);
        this.institution = new InstitutionRepository(api_url, session);
        this.report = new ReportRepository(api_url, session);
    }
}
