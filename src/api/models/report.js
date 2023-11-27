import {createReportComponent} from "@/api/models/report-components/factory";
import ComponentLayout from "@/api/models/layout/component-layout";

export default class Report {
    constructor(id, name, layout, components) {
        this.id = id;
        this.name = name;
        this.layout = layout;
        this.components = components;
    }
    static fromJson(data) {
        let components = data['components'] || [];

        let layout = {};
        if ('layout' in data) {
            for (const [key, value] of Object.entries(data['layout'])) {
                layout[key] = ComponentLayout.fromJson(value);
            }
        }

        return new Report(
            data['id'],
            data['name'],
            layout,
            components.map((q) => createReportComponent(q)),
        )
    }
}
