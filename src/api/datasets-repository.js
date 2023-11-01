import Papa from "papaparse";


class Dataset {
    constructor(url) {
        this.url = url;
        this.data = null;
        this.loading = true;
    }
}


function fetchData(url, onComplete) {
    Papa.parse(url, {
        download: true,
        delimiter: ",",
        skipEmptyLines: true,
        header: true,
        complete: onComplete
    });
}


export class DatasetsRepository {
    constructor() {
        this.datasets = {};

    }

    registerDataset(url) {
        if (!(url in this.datasets)) {
            this.datasets[url] = new Dataset(url);
        }
    }

    getDataset(key) {
        return this.datasets[key];
    }

    async fetch(onComplete) {
        Object.values(this.datasets).forEach((dataset) => {
            fetchData(dataset.url, (results) => {
                this.datasets[dataset.url].data = results;
                this.datasets[dataset.url].loading = false;
                if (!this.isLoading()) {
                    onComplete();
                }
            });
        });
    }

    isLoading() {
        for (const [key, dataset] of Object.entries(this.datasets)) {
            if (dataset.loading) {
                return true;
            }
        }
        return false;
    }
}
