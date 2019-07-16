import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import WindowedSelect from 'react-windowed-select';
import { useTheme } from '@material-ui/core/styles';

import Control from './Control';
import Menu from './Menu';
import NoOptionsMessage from './NoOptionsMessage';
import Option from './Option';
import Placeholder from './Placeholder';
import SingleValue from './SingleValue';
import ValueContainer from './ValueContainer';

const Select = React.memo((props) => {

    const theme = useTheme();

    const components = useMemo(
        () => ({
            Control,
            Menu,
            NoOptionsMessage,
            Option,
            Placeholder,
            SingleValue,
            ValueContainer
        }),
        []
    );

    const optionsHash = useMemo(
        () => {
            // using for-loop instead of reduce for performance
            let i = 0;
            const options = {};

            for (; i < props.options.length; i++) {
                options[props.options[i].value] = props.options[i];
            }

            return options;
        },
        [
            props.options
        ]
    );

    const selectStyles = useMemo(
        () => ({
            input: (base) => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit'
                }
            }),
            option: (base) => ({
                ...base,
                height: 30
            })
        }),
        []
    );

    const textFieldProps = useMemo(
        () => ({
            label: props.label,
            InputLabelProps: {
                shrink: true
            },
            placeholder: props.placeholder
        }),
        [
            props.placeholder,
            props.label
        ]
    );

    const onChange = useCallback(
        ({value}) => props.onChange(value),
        [props.onChange]
    );

    return (
        <WindowedSelect
            components={components}
            onChange={onChange}
            options={props.options}
            styles={selectStyles}
            TextFieldProps={textFieldProps}
            value={optionsHash[props.value]}/>
    );
});

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any
        })
    ),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.any
};

export default Select;