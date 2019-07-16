import { useEffect, useState } from 'react';

import { getSymbols } from '../resources/iex';

export default (format) => {

    const [symbols, setSymbols] = useState([]);

    useEffect(
        () => {
            getSymbols()
                .then((data) => {
                    setSymbols(() => format(data));
                });
        },
        []
    );

    return symbols;
}