import PropTypes from 'prop-types';
import {Box, Button, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography} from '@mui/material';
import {Duplicate as DuplicateIcon} from '../../../../icons/duplicate';
import {ArrowRight as ArrowRightIcon} from '../../../../icons/arrow-right';
import {Download as DownloadIcon} from '../../../../icons/download';
import {X as XIcon} from '../../../../icons/x';
import {bytesToSize} from '../../../../utils/bytes-to-size';


export const TemplateDropzoneElements = (props) => {
    const {
        file,
        onRemove,
        onValidate,
        onDownloadReport,
        validationReport,
        ...other
    } = props;
    
    let itemColor = "divider";
    if (validationReport) {
        if (validationReport.isValid)
            itemColor = 'secondary.main';
        else {
            itemColor = 'error.main';
        }
    }

    let items = null;
    if (file) {
        items = (
            <>
                <ListItem
                    key={file.path}
                    sx={{
                        border: 1,
                        borderColor: itemColor,
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
                        primary={file.name}
                        primaryTypographyProps={{
                            color: 'textPrimary',
                            variant: 'subtitle2'
                        }}
                        secondary={bytesToSize(file.size)}
                    />
                    <Tooltip title="Usuń">
                        <IconButton edge="end"
                                    onClick={() => onRemove && onRemove(file)}>
                            <XIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </ListItem>
                {validationReport &&
                    <Typography color={itemColor}
                                variant="body2"
                                sx={{ mt: 1 }}>
                        {validationReport.isValid ?
                            "Sukces! Szablon pliku odpowiada schematowi zbioru danych. Dodaj zbiór, aby zakończyć." :
                            "Plik z szablonem nie jest zgodny ze schematem. Usuń aktualny plik, aby wgrać go ponownie."}
                    </Typography>
                }
            </>
        );
    }

    return (
        <div {...other}>
            <Box sx={{ mt: 2 }}>
                <List>
                    {items}
                </List>
                <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2
                    }}>
                    <Button onClick={onDownloadReport}
                            size="small"
                            sx={{ml: 2}}
                            disabled={!(validationReport && validationReport.isValid === false)}
                            type="button"
                            endIcon={(
                                <DownloadIcon fontSize="small"/>
                            )}
                            variant="outlined">
                        Pobierz raport błędów
                    </Button>
                    <Button onClick={onValidate}
                            size="small"
                            disabled={file === null}
                            sx={{ ml: 2 }}
                            type="button"
                            endIcon={(
                                <ArrowRightIcon fontSize="small" />
                            )}
                            variant="contained">
                        Sprawdź
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

TemplateDropzoneElements.propTypes = {
    accept: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    disabled: PropTypes.bool,
    getFilesFromEvent: PropTypes.func,
    maxFiles: PropTypes.number,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    noClick: PropTypes.bool,
    noDrag: PropTypes.bool,
    noDragEventsBubbling: PropTypes.bool,
    noKeyboard: PropTypes.bool,
    onDrop: PropTypes.func,
    onDropAccepted: PropTypes.func,
    onDropRejected: PropTypes.func,
    onFileDialogCancel: PropTypes.func,
    onRemove: PropTypes.func,
    onRemoveAll: PropTypes.func,
    onUpload: PropTypes.func,
    preventDropOnDocument: PropTypes.bool
};

TemplateDropzoneElements.defaultProps = {
};
