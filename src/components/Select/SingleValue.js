import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    singleValue: {
        fontSize: 16
    }
}));

const SingleValue = React.memo((props) => {

    const classes = useStyles();

    return (
        <Typography
            className={classes.singleValue}
            {...props.innerProps}>
            {props.children}
        </Typography>
    );
});

SingleValue.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired
};

export default SingleValue;