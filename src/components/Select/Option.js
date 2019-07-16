import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 30,
        minHeight: 'unset'
    },
    menuItemGutters: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
}));

const Option = React.memo((props) => {

    const classes = useStyles();

    const css = useMemo(
        () => ({
            gutters: classes.menuItemGutters
        }),
        []
    );

    const style = useMemo(
        () => ({
            fontWeight: props.isSelected ? 500 : 400
        }),
        [
            props.isSelected
        ]
    );

    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component='div'
            classes={css}
            className={classes.root}
            style={style}
            {...props.innerProps}>
            {props.children}
        </MenuItem>
    );
});

Option.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool
};

export default Option;