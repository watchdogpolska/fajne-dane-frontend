
export default class DataSource {
    constructor(id, campaignName, fileUrl, availableKeys, queryLabels) {
        this.id = id;
        this.campaignName = campaignName;
        this.fileUrl = fileUrl;
        this.availableKeys = availableKeys;
        this.queryLabels = queryLabels;
    }
    static fromJson(data) {

        return new DataSource(
            data['id'],
            data['campaign_name'],
            data['file_url'],
            data['available_keys'],
            data['query_labels']
        )
    }
}
