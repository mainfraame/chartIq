import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from './components/NavBar';
import Page from './components/Page';

import { theme } from './theme';

const useStyles = makeStyles({
    '@global': {
        html: {
            fontSize: '75%',
        },
        body: {
            height: '100vh'
        },
        '#root': {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
        },
        '.fast-virtualized-item': {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        },
        '.fast-option': {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    }
});

export default React.memo(() => {

    useStyles();

    return (
        <ThemeProvider theme={theme}>
            <>
                <CssBaseline/>
                <NavBar/>
                <Page/>
            </>
        </ThemeProvider>
    );
});