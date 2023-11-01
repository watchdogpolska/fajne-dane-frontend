import {createReportComponent} from "@/api/models/report-components/factory";

export default class Report {
    constructor(id, name, components) {
        this.id = id;
        this.name = name;
        this.components = components;
    }
    static fromJson(data) {
        let components = data['components'] || [];

        return new Report(
            data['id'],
            data['name'],
            components.map((q) => createReportComponent(q))
        )
    }
}
