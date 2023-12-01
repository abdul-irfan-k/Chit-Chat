const groupMessageSocketIo = (socket) => {
    socket.on("groupMessage:newTextMessage", ({ message, groupId, senderId, chatRoomId }) => {
        // socket.emit(`group:${}`)
    });
    socket.on("groupMessage:newAudioMessage", () => { });
};
export default groupMessageSocketIo;
