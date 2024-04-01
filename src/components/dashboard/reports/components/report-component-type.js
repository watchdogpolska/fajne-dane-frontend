import {Chip} from '@mui/material';


const COMPONENT_TYPE_CONFIGS = {
    "TABLE": {
        name: "TABELA",
        color: "#eec236"
    },
    "BAR_PLOT": {
        name: "WYKRES SŁUPKOWY",
        color: "#35b693"
    },
    "HTML": {
        name: "SEKCJA HTML",
        color: "#6c8cff"
    },
    "HEADER": {
        name: "NAGŁÓWEK",
        color: "#ff8383"
    },
    "MAP_FREQUENCY": {
        name: "MAPA CZĘSTOŚCI",
        color: "#cb7cff"
    }
};

export const ReportComponentType = (props) => {
    const {
        type,
        ...other
    } = props;
    let config = COMPONENT_TYPE_CONFIGS[type];

    return (
        <Chip label={config.name}
              sx={{
                  color: "white",
                  background: `${config.color} !important`
              }}/>
    );
};

ReportComponentType.propTypes = {
};
