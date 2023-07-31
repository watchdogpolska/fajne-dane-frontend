import {DocumentDataField} from "./document-data-field";
import {Grid, Divider, List} from '@mui/material';


export const DocumentDataList = (props) => {
    const {
        document,
        ...other
    } = props;

    let data = [
        {name: "Instytucja", value: document.institution.name},
        {name: "TERYT", value: document.institution.key},
    ]

    let fields = [];
    for (let i = 0; i < data.length; i++) {
        let field = data[i];
        fields.push(<Divider key={`divider-${i}`}/>);
        fields.push(<DocumentDataField key={`element-${i}`} label={field.name} value={field.value}/>);
    }

    return (
        <List sx={{py: 0}}>
            {fields}
        </List>
    );
};
