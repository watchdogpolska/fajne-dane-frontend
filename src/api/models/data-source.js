
export default class DataSource {
    constructor(id, campaign_name, file_url) {
        this.id = id;
        this.campaign_name = campaign_name;
        this.file_url = file_url;
    }
    static fromJson(data) {

        return new DataSource(
            data['id'],
            data['campaign_name'],
            data['file_url'],
        )
    }
}
