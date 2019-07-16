import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import MACheckboxes from './filters/MACheckboxes';
import RangeSelect from './filters/RangeSelect';
import SymbolSelect from './filters/SymbolSelect';
import Graph from './LineGraph';

import useChartData from '../hooks/useChartData';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1),
        flexGrow: 1
    },
    checkboxes: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    chart: {
        flexGrow: 1
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    }
}));

export default React.memo(() => {

    const classes = useStyles();

    const [filters, setFilters] = useState({
        range: '3mo',
        symbol: 'IBM',
        technicals: {
            5: true,
            10: true,
            20: true
        }
    });

    const data = useChartData(filters);

    const onChangeRange = useCallback(
        (range) => {
            setFilters((prev) => ({
                ...prev,
                range
            }));
        },
        []
    );

    const onChangeSymbol = useCallback(
        (symbol) => {
            setFilters((prev) => ({
                ...prev,
                symbol
            }));
        },
        []
    );

    const onChangeTechnicals = useCallback(
        ({currentTarget}) => {
            setFilters((prev) => ({
                ...prev,
                technicals: {
                    ...prev.technicals,
                    [Number(currentTarget.value)]: currentTarget.checked
                }
            }));
        },
        []
    );

    return (
        <div className={classes.root}>
            <Grid container
                  spacing={1}
                  component={Paper}>
                <Grid item xs={4}>
                    <SymbolSelect
                        onChange={onChangeSymbol}
                        value={filters.symbol}/>
                </Grid>
                <Grid item xs={2}>
                    <RangeSelect
                        onChange={onChangeRange}
                        value={filters.range}/>
                </Grid>
                <Grid item xs={6} className={classes.checkboxes}>
                    <MACheckboxes
                        onChange={onChangeTechnicals}
                        values={filters.technicals}/>
                </Grid>
            </Grid>
            <Grid container
                  spacing={1}
                  className={classes.chart}>
                <Grid item xs={12}
                      component={Paper}
                      className={classes.paper}>
                    <Graph
                        technicals={filters.technicals}
                        data={data}/>
                </Grid>
            </Grid>
        </div>
    );
});