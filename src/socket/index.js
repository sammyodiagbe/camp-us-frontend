import IO from "socket.io-client";

const IOString = "http://localhost:5000";

const Socket = IO(IOString);

export default Socket;
