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
    ListItemIcon,
    ListSubheader,
    Badge
} from '@material-ui/core';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import styled from "styled-components";

const StyledMain = styled.main`
  height: calc(100% - 35px);
  position: absolute;
  left: 0;
  width: 100%;
  box-shadow: 0 0 2px black;
  overflow: hidden;
`;

const StyledListItem = styled(ListItem)`
  cursor: pointer;
  background-color: #F0F2F5;
`;
const StyledNotificationImportant = styled(NotificationImportant)`
  color: red;
  position: absolute;
  top: 0;
  right: 5px;
`;
const StyledBadge = styled(Badge)`
  span{
    background-color: ${props => props.activeuser ? '#46AB5E' : 'lightgray'};
    border: 1px solid white;
    box-shadow: 0 0 0 1px #101731;
    vertical-align: bottom;

  }
`;
const StyledAvatar = styled(Avatar)`
  background-color: cornflowerblue;
  background-color: #${props => props.color};
  border: 1px solid #101731;
`;


const ChatList = ({selectChatFn, newChatBtnFn, chats, userEmail, selectedChatIndex, history}) => {

    const selectChat = (index) => {
        selectChatFn(index);
    };
    const userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === userEmail;
    console.log(chats.length);
    if (chats.length > 0) {
        return (
            <StyledMain>
                <List>
                    <StyledListItem user alignItems='flex-start'>
                        <ListItemAvatar>
                            <StyledBadge activeuser overlap="circle" badgeContent=" " variant="dot">
                                <StyledAvatar
                                    color='primary'
                                    numberOfChats={chats.length} alt='Remy Sharp'>{userEmail.split('')[0].toUpperCase()}
                                </StyledAvatar>
                            </StyledBadge>
                        </ListItemAvatar>
                        <ListItemText primary={userEmail} secondary='You are online'
                        />
                    </StyledListItem>
                    <ListSubheader>Active chats</ListSubheader>
                    {
                        chats.map((chat, index) => {
                            return (
                                <div key={index}>
                                    <StyledListItem onClick={() => {
                                        selectChat(index)
                                    }}
                                                    selected={selectedChatIndex === index}
                                                    alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <StyledBadge active overlap="circle" badgeContent=" " variant="dot">
                                                <StyledAvatar
                                                    color={() => Math.floor(Math.random() * 360)}
                                                    alt='Remy Sharp'>{chat.users.filter(user => user !== userEmail)[0].split('')[0].toUpperCase()}
                                                </StyledAvatar>
                                            </StyledBadge>
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
                                        {
                                            chat.receiverHasRead === false && !userIsSender(chat) ? (
                                                <ListItemIcon>
                                                    <StyledNotificationImportant/>
                                                </ListItemIcon>
                                            ) : null
                                        }
                                    </StyledListItem>
                                    <Divider/>
                                </div>
                            )
                        })
                    }
                </List>
            </StyledMain>
        )
    } else {
        return (
            <StyledMain>
                <List/>
            </StyledMain>
        )

    }

};

export default ChatList;