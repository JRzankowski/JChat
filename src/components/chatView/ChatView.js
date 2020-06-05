import React, {useEffect} from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  height: calc(100vh - 100px);
  overflow: hidden;
  padding: 25px;
  margin-left: 300px;
  overflow-y: scroll;
  top: 50px;
  width: calc(100% - 300px);
  position: absolute;
  display: none;
`;
const StyledUserSentBox = styled.div`
  float: right;
  clear: both;
  padding: 20px;
  word-wrap: break-word;
  margin-top: 10px;
  background-color: #707BC4;
  color: white;
  width: 300px;
  border-radius: 10px;
`;
const StyledFriendSentBox = styled(StyledUserSentBox)`
  float: left;
`;
const StyledChatHeader = styled.div`
  width: calc(100% - 301px);
  height: 50px;
  background-color: #344195;
  position: fixed;
  margin-left: 301px;
  font-size: 18px;
  text-align: center;
  color: white;
  padding-top: 10px;
`;

const ChatView = ({user, chat}) => {
  useEffect(()=>{
    const container = document.querySelector('.chatview-container');
    if(container)
      container.scrollTo(0,container.scrollHeight)
  },[]);
    if (chat === undefined) {
        return (
            <StyledWrapper></StyledWrapper>
        )

    } else {
        return (
            <div>
              <StyledChatHeader>
                Your conversation with {chat.users.filter(usr => usr !== user)}
              </StyledChatHeader>
                <StyledWrapper className='chatview-container'>
                    {
                        chat.messages.map((msg, index) => {
                            return (
                                msg.sender === user ?
                                    <StyledUserSentBox key={index}>
                                        {msg.message}
                                    </StyledUserSentBox>
                                    :
                                    <StyledFriendSentBox key={index}>
                                        {msg.message}
                                    </StyledFriendSentBox>
                            )
                        })
                    }
                </StyledWrapper>
            </div>

        )
    }

};

export default ChatView;