export const ma = (data, size) => {

    if (size > data.length) {
        return Array(data.length);
    }

    let i = 0;
    let sum = 0;
    let total = 0;

    const averages = [];

    for (; i < data.length && total < size - 1; i++) {
        if (typeof data[i] === 'number') {
            sum += data[i];
            total++;
        }
    }

    for (; i < data.length; i++) {
        if (typeof data[i] === 'number') {
            sum += data[i];
        }

        if (typeof data[i - size] === 'number') {
            sum -= data[i - size];
        }

        averages[i] = sum / size;
    }

    return averages;
};
