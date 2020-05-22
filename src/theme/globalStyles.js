import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    scroll-behavior: smooth;
    font-family: 'Montserrat', apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    padding-bottom: 50px;
  }
  button {
    padding: 0;
    cursor: pointer;
    font-family: 'Montserrat', apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  input,textarea{
    font-family: inherit; 
    font-size: 100%; 
    line-height: 1.15; 
    margin: 0; 
  }
  input{
    overflow: visible;
  }
  [type="submit"] {
    -webkit-appearance: button;
   }
`;

export default GlobalStyles