import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    root: {
        fontSize: 16
    }
}));

const SingleValue = React.memo((props) => {

    const classes = useStyles();

    return (
        <Typography
            className={classes.root}
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