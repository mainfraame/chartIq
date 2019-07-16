import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1, 2)
    }
}));

const NoOptionsMessage = React.memo((props) => {

    const classes = useStyles();

    return (
        <Typography
            color='textSecondary'
            className={classes.root}
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