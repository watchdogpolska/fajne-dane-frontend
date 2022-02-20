import {Box, Button, Card, CardContent, Grid, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {Duplicate as DuplicateIcon} from '@/icons/duplicate';
import {Download as DownloadIcon} from '@/icons/download';
import NextLink from 'next/link';


export const ResourceFileDownloadCard = (props) => {
    const {
        formik,
        file,
        onDrop,
        disabled,
        ...other
    } = props;
    let linkParts = file.split('/');
    let fileName = linkParts[linkParts.length-1];

    return (
        <Card className={disabled ? "disabled" : ""}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}
                          sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'stretch',
                              flexWrap: 'nowrap',
                              justifyContent: 'space-between',
                              alignContent: 'flex-start'
                          }}>
                        <Box>
                            <Typography variant="h6">
                                Plik źródła danych
                            </Typography>
                            <Typography color="textSecondary"
                                        variant="body2"
                                        sx={{ mt: 1 }}>
                                Zaakceptowanego pliku nie możesz już edytować.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <ListItem
                            key={"path"}
                            sx={{
                                border: 1,
                                borderColor: "divider",
                                py: 2,
                                borderRadius: 1,
                                '& + &': {
                                    mt: 1
                                }
                            }}
                        >
                            <ListItemIcon>
                                <DuplicateIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary={fileName}
                                primaryTypographyProps={{
                                    color: 'textPrimary',
                                    variant: 'subtitle2'
                                }}
                            />
                        </ListItem>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                mx: -1,
                                mb: -1,
                                mt: -1
                            }}
                        >
                            <NextLink href={file} download passHref>
                                <Button component="a" 
                                        sx={{ m: 1 , ml: 'auto'}}
                                        startIcon={(
                                            <DownloadIcon fontSize="small"/>
                                        )}
                                        size="small"
                                        variant="contained">
                                    Pobierz
                                </Button>
                            </NextLink>
                            
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

ResourceFileDownloadCard.propTypes = {
};
