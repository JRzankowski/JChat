import React, {useEffect, useState} from "react";
import ChatList from "../chatList/ChatList";
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import styled from "styled-components";
import ChatView from "../chatView/ChatView";
import ChatTextBox from "../chatTextBox/ChatTextBox";

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
    const [chatIndex, setChatIndex] = useState(null);
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
                    });
            }
        });

    }, []);
    useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    }, []);

    const newChatBtnClicked = () => {
        setNewChatFromVisible(true);

        setSelectedChat(null)
    };

    const messageRead = (chatIndex) => {
        const docKey = buildDocKey(chats[chatIndex].users.filter(user => user !== email)[0]);
        if (clickedChatWhereNotSender(chatIndex)) {
            firebase.firestore().collection('chats').doc(docKey).update({
                receiverHasRead: true
            }).then(r => console.log(r))
        } else {
            console.log('user was the sender')
        }
    };
    const clickedChatWhereNotSender = (chatIndex) => chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !== email;

    const selectChat = (chatIndex) => {
        setChatIndex(chatIndex);
         setSelectedChat(chatIndex);
        messageRead(chatIndex);


    };

    const submitMessage = (message) => {
        const docKey = buildDocKey(chats[selectedChat].users.filter(user => user !== email)[0]);
        firebase.firestore().collection('chats').doc(docKey).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: email,
                message: message,
                timestamp: Date.now()
            }),
            receiverHasRead: false
        });
    };

    const buildDocKey = (friend) => [email, friend].sort().join(':');
    const signOut = () => {
        firebase.auth().signOut()
    };
    return (
        <>
            <ChatList selectChatFn={selectChat} newChatBtnFn={newChatBtnClicked} chats={chats} userEmail={email}
                      selectedChatIndex={selectedChat} history={history}/>
            {
                newChatFromVisible ? null : (
                    <>
                        <ChatView user={email} chat={chats[selectedChat]}/>

                    </>
                )
            }
            {
                selectedChat !== null && !newChatFromVisible ? (
                    <ChatTextBox chatIndex={chatIndex} messageReadFn={messageRead} submitMessageFn={submitMessage}/>
                ) : null
            }
            <StyledSignOutBtn onClick={signOut}>Sign Out</StyledSignOutBtn>
        </>
    )
};

export default Dashboard;