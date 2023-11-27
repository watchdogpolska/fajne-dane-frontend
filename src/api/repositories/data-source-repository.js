import Repository from "./repository";
import DataSource from "@/api/models/data-source";


export class DataSourceRepository extends Repository {

    async list() {
        let response = await this.get(`/reports/sources/`);
        return response.data.map((source_data) => DataSource.fromJson(source_data));
    }
}
