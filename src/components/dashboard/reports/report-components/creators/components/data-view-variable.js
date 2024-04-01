import {forwardRef, useEffect, useReducer} from 'react';
import {useAuth} from "@/hooks/use-auth";
import {Grid, Typography} from '@mui/material';
import merge from "@/utils/merge";
import {
    DataSourceSelector
} from "@/components/dashboard/reports/report-components/creators/components/data-source-selector";
import {Selector} from "@/components/dashboard/common/selector";
import {MultiSelector} from "@/components/dashboard/common/multi-selector";
import {Loading} from "@/components/dashboard/common/loading";


export const DataViewVariable = (props) => {
    const {
        formik,
        disableKeys,
        multiColumns,
        dataSourceId,
        dataSourceKeys,
        dataSourceColumns,
        readOnly,
        ...other
    } = props;

    const { repositories } = useAuth();
    const [state, setState] = useReducer(
        (dataSource, newDataSource) => merge(dataSource, newDataSource),
        {
            value: null,
            loading: false
        }
    );

    async function fetchDataSourceData(id) {
        setState({loading: true});
        let dataSource = await repositories.dataSource.getDataSource({id});
        setState({loading: false, value: dataSource});
    }

    useEffect(() => {
        let selectedDataSourceId = formik.values[dataSourceId];
        if (selectedDataSourceId) {
            if (state.value && state.value.id !== selectedDataSourceId) {
                if (!disableKeys) formik.setFieldValue(dataSourceKeys, null);
                formik.setFieldValue(dataSourceColumns, multiColumns ? [] : '');
            }
            fetchDataSourceData(selectedDataSourceId);
        } 
    }, [formik.values[dataSourceId]]);

    let availableKeys = [];
    let queryLabels = [];
    if (state.value) {
        Object.entries(state.value.availableKeys).forEach(([key, value]) => {
            availableKeys.push({index: key, label: value});
        });
        Object.entries(state.value.queryLabels).forEach(([key, value]) => {
            queryLabels.push({index: key, label: value});
        });
    }

    const onContentUpdate = (value) => {
    };

    return (
        <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
                <Typography variant="h6">
                    Źródło danych
                </Typography>
                <Typography color="textSecondary"
                            variant="body2"
                            sx={{ mt: 1 }}>
                    Zbiór danych, który użyty zostanie jako źródło.
                </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
                <DataSourceSelector formik={formik}
                                    label="Źródło danych"
                                    disabled={readOnly}
                                    name={dataSourceId}/>
            </Grid>

            { state.loading ?
                <Loading/>
                :
                <>
                    { !disableKeys ?
                        <>
                            <Grid item md={4} xs={12}>
                                <Typography variant="h6">
                                   Identyfikator
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Kolumna która użyta będzie do podziału zmiennych.
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <Selector formik={formik}
                                          name={dataSourceKeys}
                                          label="Identyfikator"
                                          values={availableKeys}
                                          indexVar="index"
                                          labelVar="label"
                                          disabled={readOnly || (availableKeys.length === 0)}/>
                            </Grid>
                        </>
                        : null
                    }
                    {
                        multiColumns ?
                        <>
                            <Grid item md={4} xs={12}>
                                <Typography variant="h6">
                                    Kolumny
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Kolumny, których wartości będą użyte.
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <MultiSelector formik={formik}
                                               name={dataSourceColumns}
                                               label="Kolumny"
                                               values={queryLabels}
                                               indexVar="index"
                                               labelVar="label"
                                               disabled={readOnly || (queryLabels.length === 0)}/>
                            </Grid>
                        </>
                            :
                        <>
                            <Grid item md={4} xs={12}>
                                <Typography variant="h6">
                                    Kolumna
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Kolumna, której wartości będzie użyta.
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <Selector formik={formik}
                                          name={dataSourceColumns}
                                          label="Kolumna"
                                          values={queryLabels}
                                          indexVar="index"
                                          labelVar="label"
                                          disabled={readOnly || (queryLabels.length === 0)}/>
                            </Grid>
                        </>
                    }
                </>
            }

        </Grid>
    );
};

DataViewVariable.propTypes = {
};
