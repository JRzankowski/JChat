import React, {useEffect, useState} from "react";
import ChatList from "../chatList/ChatList";
import {useHistory} from "react-router-dom";
const firebase = require("firebase");

const Dashboard = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [newChatFromVisible, setNewChatFromVisible] = useState(false);
    const [email, setEmail] = useState(false);
    const [chats, setChats] = useState([]);
    let history = useHistory();
    useEffect(()=>{
       firebase.auth().onAuthStateChanged(async usr=>{
          if(!usr)
              history.push('/login');
           else{
               await firebase
                   .firestore()
                   .collection('chats')
                   .where('users', 'array-contains', usr.email)
                   .onSnapshot(async res =>{
                       const chats = res.docs.map(doc=>doc.data());
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
        console.log(chatIndex);
    };



    return (
        <>
            <div>Dashboard</div>
            <ChatList selectChatFn={selectChat} newChatBtnFn={newChatBtnClicked} chats={chats} userEmail={email}
                      selectedChatIndex={selectedChat} history={history}/>
        </>
    )
};

export default Dashboard;