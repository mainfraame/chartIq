import React, { useEffect, useState } from 'react';

import Select from '../Select/Select';
import { getSymbols } from '../../resources/iex';

const SymbolSelect = React.memo((props) => {

    const [options, setOptions] = useState([]);

    useEffect(
        () => {
            getSymbols()
                .then((data) => {
                    setOptions(() => (
                        data.map(({symbol, name}) => ({
                            label: `${symbol} - ${name}`,
                            value: symbol
                        }))
                    ));
                });
        },
        []
    );

    return (
        <Select
            label='Symbol'
            onChange={props.onChange}
            options={options}
            placeholder='Select Symbol'
            value={props.value}/>
    );
});

export default SymbolSelect;