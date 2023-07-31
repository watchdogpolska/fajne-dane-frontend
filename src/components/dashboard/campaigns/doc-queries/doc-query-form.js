import {useEffect, useState, useReducer, useRef} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import * as Yup from 'yup';
import {useTheme} from '@mui/material/styles';
import {Box, Button, Divider, Grid, Typography} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";
import {OutputFieldForm} from "./output-field-form";
import DocQueryRecords from '@/logic/doc-query-form/doc-query-records';
import {DocumentQueryStatus} from '@/components/dashboard/common/statuses/document-query-status';
import NextLink from 'next/link';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {EyeButton} from '@/components/dashboard/campaigns/doc-queries/components/eye-button';
import {EditButtons} from '@/components/dashboard/campaigns/doc-queries/components/edit-buttons';
import {AcceptedRecordsSource} from './components/accepted-records-souce';
import {compareArrays} from '@/utils/array';
import {Loading} from '@/components/dashboard/common/loading';
import toast from 'react-hot-toast';


export const DocQueryForm = (props) => {
    const {
        campaignId,
        documentId,
        docQueryId,
        onSave,
        ...other
    } = props;

    const prevDocQueryIdRef = useRef();
    const theme = useTheme();
    const router = useRouter();
    const { repositories } = useAuth();

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            showConflics: false,
            loading: true,
            enableEdit: true,
            documentQuery: null,
            answerValues: []
        }
    );

    const setAnswerValues = function (values) {
        setState({answerValues: values});
    }

    async function fetchData() {
        setState({loading: true});

        let documentQuery = await repositories.documentQuery.details({docQueryId: docQueryId});

        let _state = {};
        let fetchedAnswerValues = [];
        if (documentQuery.acceptedRecords) {
            fetchedAnswerValues = documentQuery.acceptedRecords.map((r) => (r.value));
            _state['enableEdit'] = false;
            _state['showConflicts'] = false;
        }
        _state['answerValues'] = fetchedAnswerValues;
        _state['documentQuery'] = documentQuery;

        if (documentQuery.status !== "CLOSED")
            _state['enableEdit'] = true;

        _state['loading'] = false;
        setState(_state);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (prevDocQueryIdRef.current)
            fetchData();
        prevDocQueryIdRef.current = docQueryId;
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
                await repositories.record.create({
                    docQueryId: docQueryId,
                    payload: state.answerValues.map(
                        (value) => ({
                            "value": value,
                            "probability": 1.0,
                            "parent": docQueryId
                        })
                    )
                })
                await fetchData();
                onSave();
                if (state.enableEdit)
                    toast.success('Dokument zostały zaktualizowany');
                else
                    toast.success('Dokument zostały oznaczony');
            } catch (err) {
                console.error(err);
            }
        }
    });

    if (state.loading)
        return <Loading/>;

    let docQueryRecords = new DocQueryRecords(state.documentQuery);

    let editButtons = null;
    let saveButton = null;

    if (state.documentQuery.status === "CLOSED") {
        let selectedAnswers = state.documentQuery.acceptedRecords.map((r) => r.value);
        let disableSave = compareArrays(selectedAnswers, state.answerValues);
        if (state.answerValues === "" ||
            state.answerValues === null ||
            state.answerValues === undefined ||
            state.answerValues.length === 0)
            disableSave = true;

        editButtons = <EditButtons onToggleClick={() => {
                                        setState({
                                            enableEdit: !state.enableEdit,
                                            answerValues: selectedAnswers
                                        })
                                   }}
                                   disableSave={disableSave}
                                   onSaveClick={() => {formik.handleSubmit()}}
                                   toggle={state.enableEdit}/>
    } else {
        if (docQueryRecords.hasConflicts)
            editButtons = <EyeButton text={state.showConflicts ? "Ukryj konflikt" : "Zobacz konflikt"}
                                     onToggleClick={() => setState({showConflicts: !state.showConflicts})}
                                     toggle={state.showConflicts}/>
        saveButton = (
            <>
                <Divider/>
                <Button disabled={formik.isSubmitting || state.answerValues.length === 0}
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
                    <Grid item xs={5}>
                        <NextLink href={`/dashboard/campaigns/${campaignId}/documents/${documentId}`}
                                  passHref>
                            <Button component="a"
                                    startIcon={(
                                        <ArrowBackIcon fontSize="small" />
                                    )}
                                    size="small"
                                    variant="outlined">
                                Wróć do pytań
                            </Button>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box component="div"
                             sx={{
                                 textAlign: "right",
                                 paddingRight: "12px",
                                 display: "flex",
                                 justifyContent: "flex-end",
                                 color: 'primary.main',
                             }}>
                            {editButtons}
                        </Box>
                        <Box component="div"
                             sx={{
                                 textAlign: "right",
                                 paddingRight: "12px",
                                 display: "flex",
                                 justifyContent: "flex-end",
                             }}>
                            <AcceptedRecordsSource acceptedRecords={state.documentQuery.acceptedRecords}/>
                        </Box>
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
                                    Pytanie {state.documentQuery.query.order + 1}
                                </Typography>
                            </Box>

                            <Box component="span"
                                 sx={{
                                     float: "right"
                                 }}>
                                <Typography variant="body2">
                                    status:
                                    <Box component="span" sx={{ml: 1}}/>
                                    <DocumentQueryStatus status={state.documentQuery.status}/>
                                </Typography>
                            </Box>

                            <OutputFieldForm docQueryRecords={docQueryRecords}
                                             enableEdit={state.enableEdit}
                                             values={state.answerValues}
                                             setAnswerValues={setAnswerValues}
                                             showConflicts={state.showConflicts}/>

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
