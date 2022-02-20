import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import * as Yup from 'yup';
import {useTheme} from '@mui/material/styles';
import {Box, Button, Divider, Grid, Typography} from '@mui/material';
import {documentQueryRepository} from '@/api/repositories/document-query-repository';
import {recordsRepository} from '@/api/repositories/records-repository';
import {OutputFieldForm} from "./output-field-form";
import DocQueryRecords from '@/logic/doc-query-form/doc-query-records';
import {DocumentQueryStatus} from '@/components/dashboard/common/statuses/document-query-status';
import NextLink from 'next/link';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {EyeButton} from '@/components/dashboard/campaigns/doc-queries/components/eye-button';
import {EditButtons} from '@/components/dashboard/campaigns/doc-queries/components/edit-buttons';


export const DocQueryForm = (props) => {
    const {
        campaignId,
        documentId,
        docQueryId,
        ...other
    } = props;

    const theme = useTheme();
    const router = useRouter();
    const [showConflicts, setShowConflicts] = useState(false);
    const [loading, setLoading] = useState(true);
    const [enableEdit, setEnableEdit] = useState(true);
    const [documentQuery, setDocumentQuery] = useState(null);
    const [answerValue, setAnswerValue] = useState(null);

    async function fetchData() {
        setLoading(true);
        let documentQuery = await documentQueryRepository.details({docQueryId: docQueryId});
        if (documentQuery.acceptedRecord) {
            setAnswerValue(documentQuery.acceptedRecord.value);
            setEnableEdit(false);
        }

        setDocumentQuery(documentQuery);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [docQueryId]);


    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255),
        }),
        onSubmit: async (values, helpers) => {
            try {
                let response = await recordsRepository.create({
                    docQueryId: docQueryId,
                    payload: {
                        "value": answerValue,
                        "probability": 1.0,
                        "parent": docQueryId
                    }
                })
                fetchData();
            } catch (err) {
                console.error(err);
            }
        }
    });

    if (loading)
        return <div>Loading</div>;
    
    let docQueryRecords = new DocQueryRecords(documentQuery);

    let editButtons = null;
    let saveButton = null;
    if (documentQuery.status === "CLOSED") {
        let selectedAnswer = documentQuery.acceptedRecord.value;
        let disableSave = selectedAnswer === answerValue;

        editButtons = <EditButtons onToggleClick={() => {
                                        setEnableEdit(!enableEdit)
                                        setAnswerValue(selectedAnswer)
                                   }}
                                   disableSave={disableSave}
                                   onSaveClick={() => {formik.handleSubmit()}}
                                   toggle={enableEdit}/>
    } else {
        console.log(docQueryRecords);
        if (docQueryRecords.hasConflicts)
            editButtons = <EyeButton text={showConflicts ? "Ukryj konflikt" : "Zobacz konflikt"}
                                     onToggleClick={() => {setShowConflicts(!showConflicts)}}
                                     toggle={showConflicts}/>
        saveButton = (
            <>
                <Divider/>
                <Button disabled={formik.isSubmitting || answerValue == null}
                        sx={{
                            marginTop: "24px"
                        }}
                        type="submit"
                        size="small"
                        variant="contained">
                    Zapisz zmiany
                </Button>
            </>
        );
    }

    return (
        <Grid container spacing={3}
              sx={{
                  ml: 0,
                  width: "100%"
              }}>
            <Grid item xs={12}
                  sx={{
                      paddingLeft: "12px !important",
                      paddingTop: "36px !important",
                      paddingBottom: "12px",
                      backgroundColor: theme.palette.neutral[100],
                      borderBottomWidth: 8,
                      borderBottomColor: theme.palette.neutral[300],
                      borderBottomStyle: "solid"
                  }}>
                <Grid container>
                    <Grid item xs={6}>
                        <NextLink href={`/dashboard/campaigns/${campaignId}/documents/${documentId}`}
                                  passHref>
                            <Button component="a"
                                    endIcon={(
                                        <ArrowBackIcon fontSize="small" />
                                    )}
                                    size="small"
                                    variant="outlined">
                                Wróć do pytań
                            </Button>
                        </NextLink>
                    </Grid>
                    <Grid item xs={6}
                          sx={{
                              textAlign: "right",
                              paddingRight: "12px",
                              display: "flex",
                              color: 'primary.main',
                              justifyContent: "flex-end"
                          }}>
                        {editButtons}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}
                  sx={{
                      paddingLeft: "12px !important",
                  }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3} >
                        <Grid item xs={12}
                              sx={{
                                  paddingRight: "12px"
                              }}>
                            <Box component="span"
                                 sx={{
                                     display: "inline-block"
                                 }}>
                                <Typography variant="subtitle2">
                                    Pytanie 7
                                </Typography>
                            </Box>

                            <Box component="span"
                                 sx={{
                                     float: "right"
                                 }}>
                                <Typography variant="body2">
                                    status:
                                    <Box component="span" sx={{ml: 1}}/>
                                    <DocumentQueryStatus status={documentQuery.status}/>
                                </Typography>
                            </Box>

                            <OutputFieldForm docQueryRecords={docQueryRecords}
                                             enableEdit={enableEdit}
                                             value={answerValue}
                                             setAnswerValue={setAnswerValue}
                                             showConflicts={showConflicts}/>

                        </Grid>
                        <Grid item xs={12}
                              sx={{
                                  textAlign: "center",
                                  paddingBottom: "32px"
                              }}>
                            {saveButton}
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

DocQueryForm.propTypes = {
};
