import {Box, Typography} from '@mui/material';
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export const ComponentLabel = (props) => {
    const {
        index,
        label,
        enableEdit,
        usePredefined,
        handleSwitchChange,
        hasPredefinedAnswers,
        isSelected,
        ...other
    } = props;

    let letter = String.fromCharCode(97 + index);
    return (
        <Box sx={{display: "flex"}}>
            <Typography variant="body1"
                        sx={{ fontWeight: isSelected ? 'bold': 'regular' }}
                        key={`answer-${letter}`}
                        color="textSecondary">
                {letter}) {label}
            </Typography>
            {
                hasPredefinedAnswers &&
                <FormControlLabel control={<Switch />}
                                  disabled={!enableEdit}
                                  checked={usePredefined}
                                  onChange={handleSwitchChange}
                                  sx={{
                                      position: "absolute",
                                      right: 0
                                  }}
                                  label="Wybierz z dostępnych"/>
            }
        </Box>
    );
};
