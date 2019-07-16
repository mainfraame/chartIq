import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import Big from 'big.js';

import { std } from '../utils/math';
import { ma } from '../utils/technicals';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    }
}));

const LinGraph = React.memo((props) => {

    const theme = useTheme();

    const classes = useStyles();

    const $canvas = useRef();

    const ctx = useMemo(
        () => $canvas.current && $canvas.current.getContext('2d'),
        [$canvas.current]
    );

    const dimensions = useMemo(
        () => $canvas.current ? $canvas.current.getBoundingClientRect() : {width: 0, height: 0},
        [$canvas.current]
    );

    const values = useMemo(
        () => props.data.map(({value}) => value),
        [props.data]
    );

    const technicals = useMemo(
        () => (
            Object.keys(props.technicals)
                .filter((k) => props.technicals[k])
                .map((k) => ma(values, k))
        ),
        [
            props.technicals,
            values
        ]
    );

    const structure = useMemo(
        () => {
            const basePadding = theme.spacing(1);

            const paddingTop = basePadding;
            const paddingLeft = basePadding;
            const paddingBottom = basePadding * 4;
            const paddingRight = basePadding * 6;

            return {
                basePadding,
                paddingBottom,
                paddingLeft,
                paddingRight,
                paddingTop,
                height: dimensions.height - (paddingTop + paddingBottom),
                width: dimensions.width - (paddingLeft + paddingRight)
            };
        },
        [
            dimensions,
            theme
        ]
    );

    const scale = useMemo(
        () => {

            if (!values.length) {
                return {};
            }

            const standardDev = new Big(std(values));

            const allValues = [
                ...values,
                ...technicals.reduce((acc, arr) => [...acc, ...arr.filter(Boolean)], [])
            ];

            const maxVal = Number(new Big(Math.max(...allValues)).plus(standardDev.div(2)));
            const minVal = Number(new Big(Math.min(...allValues)).minus(standardDev.div(2)));

            const stepY = new Big(structure.height).div(new Big(maxVal).minus(minVal));

            const minY = new Big(minVal).times(stepY).plus(structure.height);

            const stepXPadding = new Big(structure.paddingLeft).plus(structure.basePadding);
            const stepYPadding = new Big(structure.paddingTop);

            const stepX = new Big(structure.width)
                .minus(stepXPadding)
                .div(values.length);

            return {
                maxVal,
                minVal,
                stepX,
                stepXPadding,
                stepYPadding,
                minY,
                stepY
            };
        },
        [
            structure,
            technicals,
            values
        ]
    );

    const xAxisLabels = useMemo(
        () => props.data.map(({label}) => label),
        [props.data]
    );

    const calcDataPoints = useCallback(
        (values) => (
            values.reduce((acc, value, i) => {

                if (!value) {
                    return [
                        ...acc,
                        null
                    ];
                }

                const isLastVal = i === values.length - 1;

                const startX = Number(scale.stepX.times(i).plus(scale.stepXPadding));

                const endX = isLastVal ? startX : Number(scale.stepX.times(i + 1).plus(scale.stepXPadding));

                const startY = Number(
                    new Big(value)
                        .times(scale.stepY)
                        .times(-1)
                        .plus(scale.minY)
                );

                const endY = isLastVal ? startY : Number(
                    new Big(values[i + 1])
                        .times(scale.stepY)
                        .times(-1)
                        .plus(scale.minY)
                );

                return [
                    ...acc,
                    {
                        value,
                        startX,
                        startY,
                        endX,
                        endY
                    }
                ];
            }, [])
        ),
        [
            scale,
            structure
        ]
    );

    const xLabels = useMemo(
        () => {

            const allLabels = values.length ?
                xAxisLabels.map((text, i) => ({
                    text,
                    x: Number(scale.stepX.times(i).plus(scale.stepXPadding)),
                    y: structure.height + (structure.paddingTop + structure.basePadding)
                })) : [];

            const labels = [];

            const delta = Math.floor(allLabels.length / props.labelCount);

            for (let i = 0; i < allLabels.length; i = i + delta) {
                labels.push(allLabels[i]);
            }

            return labels;
        },
        [
            props.labelCount,
            scale,
            structure,
            values,
            xAxisLabels
        ]
    );

    const yLabels = useMemo(
        () => (
            new Array(values.length ? props.labelCount : 0)
                .fill(undefined)
                .map((n, i) => ({
                    text: (scale.minVal + ((scale.maxVal - scale.minVal) * ((1 / props.labelCount) * i))).toFixed(2),
                    x: structure.width + structure.paddingLeft,
                    y: (((structure.height / props.labelCount) * i) * -1) + structure.height
                }))
        ),
        [
            props.labelCount,
            scale,
            structure,
            values
        ]
    );

    const data = useMemo(
        () => calcDataPoints(values),
        [
            calcDataPoints,
            values
        ]
    );

    const technicalSeries = useMemo(
        () => (
            technicals.reduce((acc, arr) => ([
                ...acc,
                calcDataPoints(arr)
            ]), [])
        ),
        [
            calcDataPoints,
            technicals
        ]
    );

    const drawLine = useCallback(
        (startX, startY, endX, endY) => {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        },
        [
            ctx
        ]
    );

    useEffect(
        () => {
            if (ctx) {

                ctx.clearRect(0, 0, dimensions.width, dimensions.height);

                ctx.strokeStyle = theme.palette.chart.label.color;

                // draw Y border
                drawLine(structure.width, structure.paddingTop, structure.width, structure.height);
                // draw X border
                drawLine(structure.paddingLeft, structure.height, structure.width, structure.height);

                ctx.font = `400 ${theme.palette.chart.label.fontSize}px Roboto`;

                const labelOffsetY = theme.palette.chart.label.fontSize / 4;

                yLabels.forEach((label) => {

                    ctx.fillText(label.text, label.x, label.y);

                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = theme.palette.chart.label.color;

                    // draw y axis line
                    drawLine(
                        structure.paddingLeft,
                        label.y - labelOffsetY,
                        structure.width,
                        label.y - labelOffsetY
                    );
                });

                // draw x labels
                xLabels.forEach((label) => {
                    ctx.fillText(
                        label.text,
                        label.x,
                        label.y
                    );
                });

                ctx.strokeStyle = theme.palette.chart.dataPoint;
                ctx.lineWidth = 2;

                // draw points
                data.forEach((point) => {
                    drawLine(
                        point.startX,
                        point.startY,
                        point.endX,
                        point.endY
                    );
                });

                // draw technical series
                technicalSeries.forEach((series, i) => {

                    ctx.strokeStyle = theme.palette.chart.technicals[i];

                    series.forEach((point) => {
                        drawLine(
                            point.startX,
                            point.startY,
                            point.endX,
                            point.endY
                        );
                    });
                });
            }
        },
        [
            ctx,
            data,
            technicalSeries,
            xLabels,
            yLabels,
            structure
        ]
    );

    return (
        <canvas
            ref={$canvas}
            className={classes.root}
            height={dimensions.height}
            width={dimensions.width}/>
    );
});

LinGraph.defaultProps = {
    labelCount: 19
};

export default LinGraph;




