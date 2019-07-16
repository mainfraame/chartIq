import Big from 'big.js';

export const ma = (points, size) => {

    if (size > points.length) {
        return Array(points.length);
    }

    let i = 0;
    let sum = new Big(0);
    let total = 0;

    const averages = [];

    for (; i < points.length && total < size - 1; i++) {
        if (typeof points[i] === 'number') {
            sum = sum.plus(points[i]);
            total++;
        }
    }

    for (; i < points.length; i++) {
        if (typeof points[i] === 'number') {
            sum = sum.plus(points[i]);
        }

        if (typeof points[i - size] === 'number') {
            sum = sum.minus(points[i - size]);
        }

        averages[i] = Number(sum.div(size));
    }

    return averages;
};
