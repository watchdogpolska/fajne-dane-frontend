function compareDocumentQueries( a, b ) {
    if ( a.query.order < b.query.order ) return -1;
    if ( a.query.order > b.query.order ) return 1;
    return 0;
}


function _getIndexOfElementId(elementId, elements) {
    let index = -1;
    for (let element of elements) {
        index += 1;
        if (elementId == element.id)
            return index;
    }
    return -1;
}


export default class DocQueryNavigator {
    constructor(docQueries) {
        this.openedDocQueries = [];
        this.closedDocQueries = [];
        for (let docQuery of docQueries.sort(compareDocumentQueries)) {
            if (docQuery.status == 'CLOSED') {
                this.closedDocQueries.push(docQuery);
            } else {
                this.openedDocQueries.push(docQuery);
            }
        }

        this.docQueries = this.openedDocQueries.concat(this.closedDocQueries);
    }
    
    getNext(id) {
        let index = _getIndexOfElementId(id, this.docQueries);
        if (index == this.docQueries.length - 1)
            return null;
        return this.docQueries[index+1];
    }

    getPrev(id) {
        let index = _getIndexOfElementId(id, this.docQueries);
        if (index <= 0)
            return null;
        return this.docQueries[index-1];
    }
}