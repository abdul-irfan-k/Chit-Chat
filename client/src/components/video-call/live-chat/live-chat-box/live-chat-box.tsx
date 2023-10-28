import TextMessage from '@/components/messenger/chat/chat-box/text-message/text-message'
import React from 'react'

const LiveChatBox = () => {
  return (
    <div className='mt-5 h-[75vh] overflow-y-scroll'>
     <TextMessage messageContent='hi how are you' messageType='incomingMessage' time={new Date()} userImageSrc='/Asset/avatar.jpg' userName='arif' isContinuingConverstion={false} />   
     <TextMessage messageContent='hellow i am fine. i am currenttl doingg web project' messageType='outgoingMessage' time={new Date()} userImageSrc='/Asset/avatar.jpg' userName='arif' isContinuingConverstion={false} />   
     <TextMessage messageContent='hi how are you' messageType='incomingMessage' time={new Date()} userImageSrc='/Asset/avatar.jpg' userName='arif' isContinuingConverstion={false} />   
     <TextMessage messageContent='hi how are you' messageType='incomingMessage' time={new Date()} userImageSrc='/Asset/avatar.jpg' userName='arif' isContinuingConverstion={false} />   
     <TextMessage messageContent='hi how are you' messageType='incomingMessage' time={new Date()} userImageSrc='/Asset/avatar.jpg' userName='arif' isContinuingConverstion={false} />   
     <TextMessage messageContent='hi how are you' messageType='incomingMessage' time={new Date()} userImageSrc='/Asset/avatar.jpg' userName='arif' isContinuingConverstion={false} />   
     <TextMessage messageContent='hi how are you' messageType='incomingMessage' time={new Date()} userImageSrc='/Asset/avatar.jpg' userName='arif' isContinuingConverstion={false} />   
    </div>
  )
}

export default LiveChatBox