import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0
    }
}));

const Menu = React.memo((props) => {

    const classes = useStyles();

    return (
        <Paper
            square
            className={classes.root}
            {...props.innerProps}>
            {props.children}
        </Paper>
    );
});

Menu.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object
};

export default Menu;