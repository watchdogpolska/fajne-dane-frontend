import React from "react"
import HTMLComponent from './components/html';
import HeaderComponent from './components/header';
import BarPlotComponent from './components/bar-plot';
import TableComponent from './components/table';
import MapFrequencyComponent from "./components/map-frequency";


let Components = {
    "HEADER": HeaderComponent,
    "HTML": HTMLComponent,
    "BAR_PLOT": BarPlotComponent,
    "TABLE": TableComponent,
    "MAP_FREQUENCY": MapFrequencyComponent
};


export default class ComponentFactory {

    create(component, layout) {
        let componentType = Components[component.type];
        return React.createElement(componentType, {
            key: `component-${component.id}`,
            component: component,
            layout: layout
        });
    }
}
