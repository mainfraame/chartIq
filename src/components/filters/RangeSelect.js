import React, { useMemo } from 'react';

import Select from '../Select/Select';

export default React.memo((props) => {

    const options = useMemo(
        () => ([
            {
                label: '1 Month',
                value: '1mo'
            },
            {
                label: '3 Month',
                value: '3mo'
            },
            {
                label: '6 Month',
                value: '6mo'
            },
            {
                label: '1 Year',
                value: '1y'
            },
            {
                label: '2 Year',
                value: '2y'
            },
            {
                label: '5 Year',
                value: '5y'
            },
            {
                label: '10 Year',
                value: '10y'
            },
            {
                label: 'YTD',
                value: 'ytd'
            },
            {
                label: 'Max',
                value: 'max'
            }
        ]),
        []
    );

    return (
        <Select
            label='Range'
            onChange={props.onChange}
            options={options}
            value={props.value}/>
    );
});