import Repository from "./repository";
import HTMLComponent from "@/api/models/report-components/html";
import {createReportComponent} from "@/api/models/report-components/factory";
import BarPlotComponent from "@/api/models/report-components/bar-plot";
import HeaderComponent from "@/api/models/report-components/header";


export class ReportComponentsRepository extends Repository {
    async createHTMLComponent(reportId, {name, text}) {
        let response = await this.post(`/reports/${reportId}/components/create/html/`, {
            name: name,
            text: text
        })
        return HTMLComponent.fromJson(response.data);
    }

    async createComponent(componentType, reportId, values) {
        if (componentType === "title-block")
            return this.createHeaderComponent(reportId, values);
        if (componentType === "frequency-plot")
            return this.createFrequencyPlotComponent(reportId, values)
        if (componentType === "html-body")
            return this.createHTMLComponent(reportId, values);
        throw new Error(`Component type: ${componentType} not found!`);
    }
    
    async createFrequencyPlotComponent(reportId, {name, title, dataSourceId, dataSourceColumn}) {
        let response = await this.post(`/reports/${reportId}/components/create/barplot/`, {
            data: {
                name: name,
                type: "VALUE_COUNTS",
                keys: [],
                values: [dataSourceColumn],
                aggregation: "COUNT",
                data_source_id: dataSourceId,
            },
            component: {
                name: name,
                type: "BAR_PLOT",
                title: title,
                index: dataSourceColumn,
                value: "count"
            }
        })
        return BarPlotComponent.fromJson(response.data);
    }
    
    async createHeaderComponent(reportId, {name, title, subtitle}) {
        let response = await this.post(`/reports/${reportId}/components/create/header/`, {
            name: name,
            title: title,
            subtitle: subtitle
        })
        return HeaderComponent.fromJson(response.data);
    }

    async getComponent(id) {
        let response = await this.get(`/reports/components/${id}/`);
        return createReportComponent(response.data);
    }

    async deleteComponent(id) {
        let response = await this.delete(`/reports/components/${id}/`);
        console.log(response);
    }

    async updateComponent(id, payload) {
        let response = await this.patch(
            `/reports/components/${id}/`,
            payload
        )
        return createReportComponent(response.data);
    }
}
