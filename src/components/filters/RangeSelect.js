import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Select from '../Select/Select';

const RangeSelect = React.memo((props) => {

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
            label={props.label}
            onChange={props.onChange}
            options={options}
            placeholder={props.placeholder}
            value={props.value}/>
    );
});

RangeSelect.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

RangeSelect.defaultProps = {
    label: 'Range',
    placeholder: 'Select Range'
};

export default RangeSelect;