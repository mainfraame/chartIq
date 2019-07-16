import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    ...theme.palette.chart.technicals.reduce((acc, color, i) => ({
        ...acc,
        [`technical${i}`]: {
            color: `${color} !important`
        }
    }), {})
}));

const MACheckboxes = React.memo((props) => {

    const classes = useStyles();

    const checkboxes = useMemo(
        () => {
            return Object.keys(props.values).map((key, i) => ({
                checked: props.values[key],
                classes: {
                    checked: classes[`technical${i}`]
                },
                value: key
            }));
        },
        [
            classes,
            props.values
        ]
    );

    return (
        <FormGroup row align='center'>
            {checkboxes.map((checkbox) => (
                <FormControlLabel
                    key={checkbox.value}
                    control={
                        <Checkbox
                            checked={checkbox.checked}
                            classes={checkbox.classes}
                            onChange={props.onChange}
                            value={checkbox.value}/>
                    }
                    label={`${checkbox.value}-Day MA`}/>
            ))}
        </FormGroup>
    );
});

MACheckboxes.propTypes = {
    onChange: PropTypes.func,
    values: PropTypes.shape({
        5: PropTypes.bool,
        10: PropTypes.bool,
        20: PropTypes.bool,
        40: PropTypes.bool
    })
};

export default MACheckboxes;