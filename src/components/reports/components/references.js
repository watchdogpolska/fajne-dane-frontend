import React from 'react';
import {Grid, Typography, Box, List, ListItem, ListItemText, ListItemIcon, Link} from '@mui/material';
import {Bookmark as BookmarkIcon} from '@mui/icons-material';


const ReferencesComponent = (props) => {
    const {
        component,
        layout,
        ...other
    } = props;

    let width = 12;
    if (layout) {
        width = layout.width;
    }

    return (
        <Grid item md={width} xl={width}>
            <Typography color="textSecondary">
                <b>Źródła danych:</b>
            </Typography>
            <List dense={true}>
                {
                    component.data.map((reference, index) =>
                        <Box key={"reference-item-"+index} display="flex" alignItems="left">
                            <Typography color="textSecondary" variant="body2">
                                [{index+1}] {reference.name},
                            </Typography>
                            <Link href={reference.link}
                                  sx={{
                                      ml: 1
                                  }}
                                  variant="body2">
                                {reference.link}
                            </Link>
                            <Typography color="textSecondary" variant="body2">
                                , dostęp: {reference.timestamp.split(" ")[0]};
                            </Typography>
                        </Box>
                    )
                }
            </List>
        </Grid>
    );
};

export default ReferencesComponent;
