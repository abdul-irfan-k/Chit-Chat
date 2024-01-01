export const getSocketIp = (socket) => {
    return socket.handshake.headers["x-real-ip"] || socket.request.connection.remoteAddress || "";
};
