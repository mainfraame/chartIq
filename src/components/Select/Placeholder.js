import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: theme.spacing(1),
        bottom: 6
    }
}));

const Placeholder = React.memo((props) => {

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

Placeholder.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired
};

export default Placeholder;