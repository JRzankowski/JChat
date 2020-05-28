import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Divider,
    Button,
    ListItemIcon
} from '@material-ui/core';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import styled from "styled-components";

const StyledMain = styled.main`
  height: calc(100% - 35px);
  position: absolute;
  left: 0;
  width: 300px;
  box-shadow: 0 0 2px black;
`;

const StyledListItem = styled(ListItem)`
  cursor: pointer;
`;

const ChatList = ({selectChatFn, newChatBtnFn, chats, userEmail, selectedChatIndex, history}) => {
    const newChat = () => {
        console.log('new chat');
    };
    const selectChat = (index) => {
        console.log(index);
    };
    if (chats.length > 0) {
        return (
            <StyledMain>
                <Button variant='contained' fullWidth onClick={newChat}>
                    button
                </Button>
                <List>
                    {
                        chats.map((chat, index) => {
                            return (
                                <div key={index}>
                                    <StyledListItem onClick={() => selectChat(index)}
                                                    selected={selectedChatIndex === index}
                                                    alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt='Remy Sharp'>{chat.users.filter(user => user !== userEmail)[0].split('')[0]}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={chat.users.filter(user => user !== userEmail)[0]}
                                                      secondary={
                                                          <>
                                                              <Typography component='span' color='textPrimary'>
                                                                  {
                                                                      chat.messages[chat.messages.length - 1].message.substring(0, 30) + ' ...'
                                                                  }
                                                              </Typography>
                                                          </>
                                                      }>

                                        </ListItemText>
                                    </StyledListItem>
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
            </StyledMain>
        )
    } else {
        return (
            <StyledMain/>
        )

    }

};

export default ChatList;