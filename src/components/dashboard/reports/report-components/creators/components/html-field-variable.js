import {Grid, TextField, Typography} from '@mui/material';
import {Tiptap} from "@/components/dashboard/common/tiptap/tiptap-editor";


export const HtmlFieldVariable = (props) => {
    const {
        label,
        description,
        name,
        formik,
        ...other
    } = props;

    const onContentUpdate = (value) => {
        formik.setFieldValue(name, value);
    };

    return (
        <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
                <Typography variant="h6">
                    {label}
                </Typography>
                <Typography color="textSecondary"
                            variant="body2"
                            sx={{ mt: 1 }}>
                    {description}
                </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
                <Tiptap
                    content={formik.values[name]}
                    withToolbar={true}
                    withTaskListExtension={true}
                    withLinkExtension={true}
                    onContentUpdate={onContentUpdate}
                />
            </Grid>
        </Grid>
    );
};

HtmlFieldVariable.propTypes = {
};
