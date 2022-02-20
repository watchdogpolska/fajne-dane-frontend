
export default class DocQueryNavigator {
    constructor(docQueries, docQueryId, status) {
        this.docQueries = docQueries;
        this.docQueryId = docQueryId;
        this.status = status;

        this.currentIndex = this._getIndexOf(docQueryId);
    }
    
    _getIndexOf(docQueryId) {
        let index = -1;
        for (let docQuery of this.docQueries) {
            index += 1;
            if (docQueryId == docQuery.id)
                return index;
        }
        return -1;
    }

    getNextId() {
        let initial = Math.max(this.currentIndex+1, 0);
        for (let i = initial; i < this.docQueries.length; i++) {
            let docQuery = this.docQueries[i];

            if (this.status && docQuery.status != status)
                continue

            return docQuery.id;
        }
        return null;
    }

    getPrevId() {
        let initial = this.currentIndex >= 0 ? this.currentIndex - 1 : this.docQueries.length - 1;
        for (let i = initial; i >= 0; i--) {
            let docQuery = this.docQueries[i];

            if (this.status && docQuery.status != status)
                continue

            return docQuery.id;
        }
        return null;
    }
}