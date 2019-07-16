import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

import InputComponent from './InputComponent';

const useStyles = makeStyles(() => ({
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto'
    }
}));

const Control = React.memo((props) => {

    const classes = useStyles();

    const inputProps = useMemo(
        () => ({
            inputComponent: InputComponent,
            inputProps: {
                className: classes.input,
                ref: props.innerRef,
                children: props.children,
                ...props.innerProps
            }
        }),
        [
            props.children,
            props.innerRef
        ]
    );

    return (
        <TextField
            fullWidth
            InputProps={inputProps}
            {...props.selectProps.TextFieldProps}/>
    );
});

Control.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    selectProps: PropTypes.object.isRequired
};

export default Control;