import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';


export const ReportComponentSizeSelect = (props) => {
    const {
        index,
        value,
        onChange,
        ...other
    } = props;

    const handleChange = (event) => {
        onChange(index, event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id={`report-component-size-${index}-label`}>Rozmiar</InputLabel>
            <Select labelId={`report-component-size-${index}-label`}
                    id={`report-component-size-${index}`}
                    value={value}
                    label="Rozmiar"
                    onChange={handleChange}>
                <MenuItem value={4}>Mały</MenuItem>
                <MenuItem value={6}>Średni</MenuItem>
                <MenuItem value={12}>Duży</MenuItem>
            </Select>
        </FormControl>

    );
};

ReportComponentSizeSelect.propTypes = {
};
