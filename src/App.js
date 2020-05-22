import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme, StylesProvider} from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyALhVwGIYxvdtqWj5YsbHDZkxyjpXHZRlA",
    authDomain: "jchat-116ce.firebaseapp.com",
    databaseURL: "https://jchat-116ce.firebaseio.com",
    projectId: "jchat-116ce",
    storageBucket: "jchat-116ce.appspot.com",
    messagingSenderId: "941189402999",
    appId: "1:941189402999:web:650b9b013d24c5a5515172",
    measurementId: "G-GYGGZZBRB8"
});

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'apple-system',
            'BlinkMacSystemFont',
            'Segoe UI', 'Roboto',
            'Oxygen',
            'Ubuntu',
            'Cantarell',
            'Fira Sans',
            'Droid Sans',
            'Helvetica Neue',
            'sans-serif'
        ].join(','),
        palette: {
           primary: red
        }
    },


});

const App = () => (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <StylesProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <Route path='/login'>
                            <Login/>
                        </Route>
                        <Route path='/signup'>
                            <SignUp/>
                        </Route>
                        <Route path='/dashboard'>
                            <Dashboard/>
                        </Route>
                    </ThemeProvider>
                </StylesProvider>
            </Switch>
            {/*<GlobalStyles/>*/}
        </BrowserRouter>
    </div>
);


export default App;
