import axios from 'axios';
import { format } from 'date-fns';

export const getChartData = ({symbol, ...params}) => (
    axios.get(
        `yahoo/v8/finance/chart/${symbol}`,
        {
            params: {
                interval: '1d',
                ...params
            }
        })
        .then(({data: {chart: {result: [{indicators, timestamp}]}}}) => (
            timestamp
                .map((date) => format(new Date(date * 1000), 'MM/DD'))
                .map((date, i) => ({
                    label: date,
                    value: indicators.quote[0].close[i]
                }))
        ))
);
