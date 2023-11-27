
export default function getReportLayoutOrder(report) {
    let sortedLayout = Object.entries(report.layout).sort(
        (a, b) => {return a[1].order - b[1].order});

    let layoutOrder = {};
    Object.entries(sortedLayout).forEach(([index, [name, value]]) => {
        layoutOrder[name] = parseInt(index);
    });

    report.components.forEach((component) => {
       if (!(component.name in layoutOrder)) {
           layoutOrder[component.name] = Object.keys(layoutOrder).length;
       }
    });

    return layoutOrder;
}
