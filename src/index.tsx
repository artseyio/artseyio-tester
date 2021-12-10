import { Reset } from 'styled-reset';
import { ThemeProvider } from 'styled-components';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Typography from './components/Typography';

const Theme = {
    textColor: "#525252",
    textColorFaded: "#bebebe",
    primaryColor: "#0068b4",
    secondaryColor: "#0098ff",
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(0, 0, 0, 0.1)",
    colorRed: "#ff4a4a",
    colorBlue: "#4c5fff",
    colorGreen: "#2ea169",
    cursorColor: "#1E1E1E"
};

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={Theme}>
            <Reset/>
            <Typography/>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
