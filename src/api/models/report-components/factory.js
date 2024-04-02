import BarPlotComponent from './bar-plot';
import TableComponent from './table';
import HTMLComponent from './html';
import HeaderComponent from './header';
import MapFrequencyComponent from './map-frequency';
import ReferencesComponent from "./references";


export function createReportComponent(data) {
    if (data['type'] === 'BAR_PLOT') {
        return BarPlotComponent.fromJson(data);
    } else if (data['type'] === "TABLE") {
        return TableComponent.fromJson(data)
    } else if (data['type'] === "HEADER") {
        return HeaderComponent.fromJson(data)
    } else if (data['type'] === "HTML") {
        return HTMLComponent.fromJson(data)
    } else if (data['type'] === "MAP_FREQUENCY") {
        return MapFrequencyComponent.fromJson(data)
    } else if (data['type'] === "REFERENCES") {
        return ReferencesComponent.fromJson(data)
    }
    return null;
}
