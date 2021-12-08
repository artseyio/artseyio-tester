import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        textColor: string;
        textColorFaded: string;
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        borderColor: string;
        colorRed: string;
        colorBlue: string;
        colorGreen: string;
        cursorColor: string;
    }
}