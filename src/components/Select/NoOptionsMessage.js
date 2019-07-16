import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    noOptionsMessage: {
        padding: theme.spacing(1, 2)
    }
}));

const NoOptionsMessage = React.memo((props) => {

    const classes = useStyles();

    return (
        <Typography
            color='textSecondary'
            className={classes.noOptionsMessage}
            {...props.innerProps}>
            {props.children}
        </Typography>
    );
});

NoOptionsMessage.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired
};

export default NoOptionsMessage;