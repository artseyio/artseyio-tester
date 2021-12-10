import { createGlobalStyle } from "styled-components";

function Typography() {
    return <GlobalStyle/>;
}

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    body {
        background: ${ p => p.theme.backgroundColor };
        color: ${ p => p.theme.textColor };
        line-height: 1.65;
        font-weight: 400;
        font-family: Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue,sans-serif;
        overflow:hidden;
    }

    p { margin-bottom: 1.15rem; text-align: justify; }

    h1, h2, h3, h4, h5 {
        margin: 0 0 2rem 0;
        line-height: 1.15;
        font-weight: 100;
    }
    
    h1 {
        margin-top: 0;
        font-size: 2.488em;
    }

    h2 { font-size: 2.074em; }
    h3 { font-size: 1.728em; }
    h4 { font-size: 1.44em; }
    h5 { font-size: 1.2em; }
    small, .text-small { font-size: 0.833em; color: #777777; }

    a {
        text-decoration: none;
        color: ${ p => p.theme.primaryColor };
        &:hover {
            font-weight: bold;
        }
        i {
            vertical-align: middle;
            color: ${ p => p.theme.textColorFaded };
            &:hover { color: ${ p => p.theme.primaryColor }; }
        }
    }
`;

export default Typography;