import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
        padding: theme.spacing(0.5)
    }
}));

const ValueContainer = React.memo((props) => {

    const classes = useStyles();

    return (
        <div className={classes.valueContainer}>
            {props.children}
        </div>
    );
});

ValueContainer.propTypes = {
    children: PropTypes.node,
    selectProps: PropTypes.object.isRequired
};

export default ValueContainer;