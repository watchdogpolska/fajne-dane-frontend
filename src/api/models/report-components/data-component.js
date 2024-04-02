import Component from "./component";


export default class DataComponent extends Component {
    constructor(id, name, type, dataView) {
        super(id, name, type);
        this.dataView = dataView;
    }
    get dataUrl() {
        return this.dataView.fileUrl;
    }
}
