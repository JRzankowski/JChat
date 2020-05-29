import React, {useEffect, useState} from "react";
import ChatList from "../chatList/ChatList";
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import styled from "styled-components";
import ChatView from "../chatView/ChatView";

const firebase = require("firebase");

const StyledSignOutBtn = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 300px;
  border-radius: 0;
  background-color: #227092;
  height: 35px;
  box-shadow: 0 0 2px black;
  color: white;
`;

const Dashboard = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [newChatFromVisible, setNewChatFromVisible] = useState(false);
    const [email, setEmail] = useState(false);
    const [chats, setChats] = useState([]);
    let history = useHistory();
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async usr => {
            if (!usr)
                history.push('/login');
            else {
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(doc => doc.data());
                        await setEmail(usr.email);
                        await setChats(chats)
                    })
            }

        });
    });
    const newChatBtnClicked = () => {
        setNewChatFromVisible(true);
        setSelectedChat(null)
    };
    const selectChat = (chatIndex) => {
        setSelectedChat(chatIndex)
    };
    const signOut = () => {
        firebase.auth().signOut()
    };
    return (
        <>
            <ChatList selectChatFn={selectChat} newChatBtnFn={newChatBtnClicked} chats={chats} userEmail={email}
                      selectedChatIndex={selectedChat} history={history}/>
            {
                newChatFromVisible ? null : <ChatView user={email} chat={chats[selectedChat]}/>
            }
            <StyledSignOutBtn onClick={signOut}>Sign Out</StyledSignOutBtn>
        </>
    )
};

export default Dashboard;