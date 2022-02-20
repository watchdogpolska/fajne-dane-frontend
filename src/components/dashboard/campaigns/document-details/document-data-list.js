import {DocumentDataField} from "./document-data-field";
import {Grid, Divider, List} from '@mui/material';


export const DocumentDataList = (props) => {
    const {
        dataFields,
        ...other
    } = props;

    let data = [
        {name: "Instytucja", value: "Urząd Miejski W Paczkowie"},
        {name: "Region", value: "Województwo opolskie, powiat nyski"},
        {name: "Data odpowiedzi", value: "12/05/2021"}
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
