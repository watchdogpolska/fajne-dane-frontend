import Repository from "./repository";
import {createReportComponent} from "@/api/models/report-components/factory";
import HTMLComponent from "@/api/models/report-components/html";
import BarPlotComponent from "@/api/models/report-components/bar-plot";
import HeaderComponent from "@/api/models/report-components/header";
import MapFrequencyComponent from "@/api/models/report-components/map-frequency";
import TableComponent from "@/api/models/report-components/table";
import ReferencesComponent from "@/api/models/report-components/references";


export class ReportComponentsRepository extends Repository {

    async createComponent(componentType, reportId, values) {
        if (componentType === "title-block")
            return this.createHeaderComponent(reportId, values);
        else if (componentType === "references")
            return this.createReferencesComponent(reportId, values);
        else if (componentType === "frequency-plot")
            return this.createFrequencyPlotComponent(reportId, values);
        else if (componentType === "frequency-table")
            return this.createFrequencyTableComponent(reportId, values);
        else if (componentType === "html-body")
            return this.createHTMLComponent(reportId, values);
        else if (componentType === "answers-map")
            return this.createAnswersMapComponent(reportId, values);
        else if (componentType === "answers-table")
            return this.createAnswersTableComponent(reportId, values);
        throw new Error(`Component type: ${componentType} not found!`);
    }

    async createHTMLComponent(reportId, {name, text}) {
        let response = await this.post(`/reports/${reportId}/components/create/html/`, {
            name: name,
            text: text
        })
        return HTMLComponent.fromJson(response.data);
    }

    async createReferencesComponent(reportId, {name}) {
        let response = await this.post(`/reports/${reportId}/components/create/references/`, {
            name: name,
        })
        return ReferencesComponent.fromJson(response.data);
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

    async createFrequencyTableComponent(reportId, {name, title, dataSourceId, dataSourceColumn}) {
        let response = await this.post(`/reports/${reportId}/components/create/table/`, {
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
                type: "TABLE",
                title: title,
                index: dataSourceColumn,
                value: "count"
            }
        })
        return TableComponent.fromJson(response.data);
    }

    async createAnswersMapComponent(reportId, {name, title, dataSourceId, dataSourceKey}) {
        let dataSourceKeyName = dataSourceKey.replace('_key_', '_name_');
        let response = await this.post(`/reports/${reportId}/components/create/answersmap/`, {
            data: {
                name: name,
                type: "BASE",
                keys: [dataSourceKey, dataSourceKeyName],
                values: ["document_id"],
                aggregation: "NOTNAN",
                data_source_id: dataSourceId,
            },
            component: {
                name: name,
                type: "MAP_FREQUENCY",
                title: title,
                index: dataSourceKeyName,
                value: "document_id"
            }
        })
        return MapFrequencyComponent.fromJson(response.data);
    }

    async createAnswersTableComponent(reportId, {name, title, dataSourceId, dataSourceKey}) {
        let dataSourceKeyName = dataSourceKey.replace('_key_', '_name_');
        let response = await this.post(`/reports/${reportId}/components/create/table/`, {
            data: {
                name: name,
                type: "BASE",
                keys: [dataSourceKey, dataSourceKeyName],
                values: ["document_id"],
                aggregation: "NOTNAN",
                data_source_id: dataSourceId,
            },
            component: {
                name: name,
                type: "TABLE",
                title: title,
                index: dataSourceKeyName,
                value: "document_id"
            }
        })
        return TableComponent.fromJson(response.data);
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
    }

    async updateComponent(id, payload) {
        let response = await this.patch(
            `/reports/components/${id}/`,
            payload
        )
        return createReportComponent(response.data);
    }
}
