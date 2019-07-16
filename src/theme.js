import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const theme = responsiveFontSizes(
    createMuiTheme({
        typography: {
            htmlFontSize: 12
        },
        palette: {
            chart: {
                dataPoint: '#152027',
                label: '#131d24',
                technicals: [
                    '#0ccd87',
                    '#039bff',
                    '#cf281e'
                ]
            },
            primary: {
                light: '#235f8c',
                main: '#152027',
                dark: '#131d24',
                contrastText: '#039bff'
            },
            secondary: {
                light: '#0ccd87',
                main: '#0bb577',
                dark: '#0a9d67',
                contrastText: '#fff'
            }
        }
    })
);