import styled from "styled-components";
import logo from './assets/logo.png';
import ArtseyInput from './components/ArtseyInput';

function App() {
    return (
        <StyledApp>
            <img src={logo} alt="logo" id="logo" />
            <h1>ARTSEY Tester</h1>
            <p>
                On this site you're able to test the great ARTSEY layout. Without the need of a dedicated keyboard. The tester supports all alpha key combos, space and backspace.
                To learn more about ARTSEY visit the <a href="https://artsey.io" title="ARTSEY Website" target="_blank" rel="noreferrer">website</a>.<br/>
                <a href="https://raw.githubusercontent.com/artseyio/artsey/main/layout%20diagrams/current.jpg" title="ARTSEY Cheatsheet">Cheatsheet</a> - <a href="Learning_Artsey.pdf" title="Learn ARTSEY Book">Learn ARTSEY Book</a>
            </p>
            <ArtseyInput></ArtseyInput>
        </StyledApp>
    );
}

const StyledApp = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    max-width: 700px;
    margin: 25px auto;

    #logo {
        width: 150px;S
    }

    p {
        text-align: center;
    }
`;

export default App;
