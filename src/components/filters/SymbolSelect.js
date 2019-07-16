import React from 'react';
import PropTypes from 'prop-types';

import Select from '../Select/Select';

import useSymbols from '../../hooks/useSymbols';

const SymbolSelect = React.memo((props) => {

    const options = useSymbols((data) => (
        data.map(({symbol, name}) => ({
            label: `${symbol} - ${name}`,
            value: symbol
        }))
    ));

    return (
        <Select
            label={props.label}
            onChange={props.onChange}
            options={options}
            placeholder={props.placeholder}
            value={props.value}/>
    );
});

SymbolSelect.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

SymbolSelect.defaultProps = {
    label: 'Symbol',
    placeholder: 'Select Symbol'
};

export default SymbolSelect;