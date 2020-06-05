import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/apollo-cli';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultTheme, darkTheme } from './theme';
import { CssBaseline } from '@material-ui/core';

export const wrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {element}
        </ThemeProvider>
    </ApolloProvider>
);