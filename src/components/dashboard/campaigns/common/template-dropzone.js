import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import {Box, Link, Typography} from '@mui/material';

export const TemplateDropzone = (props) => {
    const {
        accept,
        disabled,
        file,
        getFilesFromEvent,
        maxFiles,
        maxSize,
        minSize,
        noClick,
        noDrag,
        noDragEventsBubbling,
        noKeyboard,
        onDrop,
        onDropAccepted,
        onDropRejected,
        onFileDialogCancel,
        onRemove,
        onRemoveAll,
        onUpload,
        preventDropOnDocument,
        ...other
    } = props;

    // We did not add the remaining props to avoid component complexity
    // but you can simply add it if you need to.
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        maxFiles,
        maxSize,
        minSize,
        onDrop,
        disabled: file !== null
    });

    return (
        <div className={file ? "disabled" : ""} {...other}>
            <Box
                sx={{
                    alignItems: 'center',
                    border: 1,
                    borderRadius: 1,
                    borderStyle: 'dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    outline: 'none',
                    p: 5,
                    ...(isDragActive && {
                        backgroundColor: 'action.active',
                        opacity: 0.5
                    }),
                    '&:hover': {
                        backgroundColor: 'action.hover',
                        cursor: 'pointer',
                        opacity: 0.5
                    }
                }}
                {...getRootProps()}>
                <input {...getInputProps()} />
                <Box
                    sx={{
                        '& img': {
                            width: 100
                        }
                    }}
                >
                    <img
                        alt="Select file"
                        src="/static/undraw_add_file2_gvbb.svg"
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">
                        {(maxFiles && maxFiles === 1) ? 'Wybierz plik' : 'Wybierz pliki'}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1">
                            {(maxFiles && maxFiles === 1) ? 'Przeciągnij plik' : 'Przeciągnij pliki'}
                            {' lub '}
                            <Link underline="always">
                                wybierz
                            </Link>
                            {' '}
                            ze swojego komputera
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

TemplateDropzone.propTypes = {
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

TemplateDropzone.defaultProps = {
};
