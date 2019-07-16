import axios from 'axios';

export const getSymbols = () => (
    axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
        .then(({data}) => data)
);