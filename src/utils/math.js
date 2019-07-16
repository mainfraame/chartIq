import Big from 'big.js';

export const average = (values) => Number(sum(values).div(values.length));

export const std = (values) => {

    const avg = average(values);

    return Math.sqrt(
        average(
            values.map((value) => {

                const diff = new Big(value).minus(avg);

                return Number(diff.times(diff));
            })
        )
    );
};

export const sum = (values) => values.reduce((acc, value) => acc.plus(value), new Big(0));
