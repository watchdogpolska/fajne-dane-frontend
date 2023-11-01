import Repository from "./repository";
import Report from '../models/report';


export class ReportRepository extends Repository {
    async getReport({id}) {
        let response = await this.get(`/reports/${id}/`)
        return Report.fromJson(response.data);
    }

    async list() {
        let response = await this.get(`/reports/`);
        return response.data.map((report_data) => Report.fromJson(report_data));
    }
}
