import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  ${normalize}

  html, body {
    margin: 0;
    padding: 0;
    display: flex;
    min-height: 100vh;
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    transition: all 0.2s ease-in-out;
  }

  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
