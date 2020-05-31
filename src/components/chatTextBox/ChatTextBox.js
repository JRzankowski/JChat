import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {TextField, Button} from "@material-ui/core";
import Send from '@material-ui/icons/Send'

const StyledChatTextBoxContainer = styled.div`
  position: absolute;
  bottom: 15px;
  left: 315px;
  overflow: auto;
  width: calc(100% - 250px);
`;
const StyledSendBtn = styled(Send)`
  color: blue;
  cursor: pointer;
  &:hover{
    color: gray;
  }
`;
const StyledTextField = styled(TextField)`
  width: calc(100% - 25px)
`;

const ChatTextBox = ({submitMessageFn}) => {
    const [chatText, setChatText] = useState('');
    const userTyping = (e) => {
        e.keyCode === 13 ? submitMessage() : setChatText(e.target.value);
    };
    const messageValid = (text) => text && text.replace(/\s/g, '').length;
    const userClickedInput = () => {
        console.log('user click');
    };
    const submitMessage = () => {
        if (messageValid(chatText)) {
            submitMessageFn(chatText);
            document.getElementById('chat-text-box').value = '';
        }
    };
    return (
        <StyledChatTextBoxContainer>
            <StyledTextField id='chat-text-box' placeholder='Type your message...' onKeyUp={(e) => userTyping(e)}
                             onFocus={userClickedInput}>

            </StyledTextField>
            <StyledSendBtn onClick={submitMessage}/>
        </StyledChatTextBoxContainer>

    )
};

export default ChatTextBox;