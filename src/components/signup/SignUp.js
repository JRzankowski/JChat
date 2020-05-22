import React, {useState} from "react";

import styled from "styled-components";
import {Button, Typography, Input, InputLabel, Paper, CssBaseline, FormControl} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom'

const firebase = require("firebase");


const StyledMain = styled.main`
  width: 100%;
  display: block;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: 0 20px;
  @media(min-width: 400px){
    width: 400px;
    top: 45%;
  }
  @media(max-width: 820px) and (orientation: landscape){
    margin: 50px auto;
  };
   
`;
const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
  @media(min-width: 500px){
    padding: 50px 50px;
  }
  @media(max-width: 820px) and (orientation: landscape){
    padding: 20px 20px;
    //line-height: 1.6;;
`;
const StyledForm = styled.form`
  width: 100%;
`;
const StyledFormControl = styled(FormControl)`
  width: 100%;
`;
const StyledLabel = styled(InputLabel)`
font-size: 14px;
`;
const StyledInput = styled(Input)`
`;
const StyledSubmitButton = styled(Button)`
  margin-top: 30px;
`;
const StyledLink = styled(Typography)`
  margin-top: 10px;
  a{
    font-size: 14px;
    width: 100%;
    text-decoration: none;
    font-weight: bold;
    color: rgba(63,81,181,0.83) ;
    &:hover{
      color: #3f51b5
    }
  }
`;
const StyledError = styled(Typography)`
  color: darkred;
  text-align: center;
`;


const SignUp = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState(null);
    const [signUpError, setSignUpError] = useState(null);
    let history = useHistory();
    const submitSignUp = (e) => {
        e.preventDefault();
        if (!password === passwordConfirmation) {
            setSignUpError('Password do not match !');
        }
        firebase.auth().createUserWithEmailAndPassword(email, password).then(authRes => {
            const user = {
                email: authRes.user.email,
            };
            firebase.firestore().collection('users').doc(email).set(user).then(() => {
                history.push('/dashboard')
            }, dbError => {
                console.log(dbError);
                setSignUpError('Failed to add user')
            })
        }, authError => {
            console.log(authError);
            setSignUpError('Failed to add user')
        })
    };
    const userTyping = (type, e) => {
        switch (type) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password' :
                setPassword(e.target.value);
                break;
            case 'passwordConfirmation':
                setPasswordConfirmation(e.target.value);
                break;
            default:
                break;
        }

    };
    return (
        <StyledMain>
            <StyledContainer>
                <CssBaseline/>
                <Typography component='h2' variant='h5'>Login</Typography>
                <StyledForm onSubmit={(e) => submitSignUp(e)}>
                    <StyledFormControl required fullWidth margin='normal'>
                        <StyledLabel htmlFor='signup-email-input'>Enter Your Email</StyledLabel>
                        <StyledInput onChange={(e) => userTyping('email', e)} autoComplete='email' autoFocus
                                     id="signup-email-input"/>
                    </StyledFormControl>
                    <StyledFormControl required fullWidth margin='normal'>
                        <StyledLabel htmlFor='signup-password-input'>Create A Password</StyledLabel>
                        <StyledInput onChange={(e) => userTyping('password', e)} type="password"
                                     id="signup-password-input"/>
                    </StyledFormControl>
                    <StyledFormControl required fullWidth margin='normal'>
                        <StyledLabel htmlFor='signup-password-confirmation-input'>Confirm Your Password</StyledLabel>
                        <StyledInput onChange={(e) => userTyping('passwordConfirmation', e)} type="password"
                                     id='signup-password-confirmation-input'/>
                    </StyledFormControl>
                    <StyledSubmitButton type='submit' fullWidth variant='contained'
                                        color='primary'>Submit</StyledSubmitButton>
                </StyledForm>
                {
                    signUpError ? (
                        <StyledError>
                            {signUpError}
                        </StyledError>
                    ) : null
                }
                <StyledLink>
                    <Link to='/login'>Already have an account ?</Link>
                </StyledLink>
            </StyledContainer>
        </StyledMain>
    )
};

export default SignUp;