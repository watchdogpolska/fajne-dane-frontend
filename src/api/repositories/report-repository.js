import Repository from "./repository";
import Report from '../models/report';


export class ReportRepository extends Repository {
    async getReport({id}) {
        let response = await this.get(`/reports/${id}/`)
        return Report.fromJson(response.data);
    }

    async renderReport({id}) {
        let response = await this.get(`/reports/${id}/render`)
        return Report.fromJson(response.data);
    }

    async updateReport({id, layout}) {
        let layoutPayload = {};
        for (let [key, value] of Object.entries(layout)) {
            layoutPayload[key] = value.toJson();
        }

        let response = await this.patch(
            `/reports/${id}/`,
            { layout: layoutPayload }
        )
        return Report.fromJson(response.data);
    }

    async list() {
        let response = await this.get(`/reports/`);
        return response.data.map((report_data) => Report.fromJson(report_data));
    }
}
