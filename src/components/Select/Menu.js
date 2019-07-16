import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    menu: {
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
            className={classes.menu}
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