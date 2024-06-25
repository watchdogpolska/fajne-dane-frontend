import Component from "./component";


export default class DataComponent extends Component {
    constructor(id, name, type, dataView, metadata) {
        super(id, name, type, metadata);
        this.dataView = dataView;
    }
    get dataUrl() {
        return this.dataView.fileUrl;
    }
}
