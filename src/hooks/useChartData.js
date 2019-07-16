import { useEffect, useState } from 'react';

import { getChartData } from '../resources/yahoo';

export default (filters) => {

    const [chartData, setChartData] = useState([]);

    useEffect(
        () => {
            if (filters.symbol) {
                getChartData({symbol: filters.symbol, range: filters.range})
                    .then(setChartData);
            }
        },
        [
            filters.symbol,
            filters.range
        ]
    );

    return chartData;
}