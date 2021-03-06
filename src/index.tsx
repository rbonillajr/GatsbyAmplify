import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultTheme, darkTheme } from './theme';
import { CssBaseline } from '@material-ui/core';

export const wrapRootElement = ({ element }) => (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {element}
    </ThemeProvider>
);