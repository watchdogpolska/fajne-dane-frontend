
export default function getReportLayoutOrder(report) {
    let sortedLayout = Object.entries(report.layout).sort(
        (a, b) => {return a[1].order - b[1].order});

    let layoutOrder = {};
    Object.entries(sortedLayout).forEach(([index, [id, value]]) => {
        layoutOrder[id] = parseInt(index);
    });

    report.components.forEach((component) => {
       if (!(component.id in layoutOrder)) {
           layoutOrder[component.id] = Object.keys(layoutOrder).length;
       }
    });

    return layoutOrder;
}
