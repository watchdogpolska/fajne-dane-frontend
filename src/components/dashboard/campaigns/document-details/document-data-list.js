import {DocumentDataField} from "./document-data-field";
import {Grid, Divider, List} from '@mui/material';


export const DocumentDataList = (props) => {
    const {
        dataFields,
        ...other
    } = props;

    let data = [
        {name: "Instytucja", value: "Work in progress"},
        {name: "Region", value: "Województwo"},
        {name: "Data odpowiedzi", value: "99/99/9999"}
    ]

    let fields = [];
    for (let i = 0; i < data.length; i++) {
        let field = data[i];
        fields.push(<Divider key={`divider-${i}`}/>);
        fields.push(<DocumentDataField key={`element-${i}`} label={field.name} value={field.value}/>);
    }

    return (
        <List container sx={{py: 0}}>
            {fields}
        </List>
    );
};
