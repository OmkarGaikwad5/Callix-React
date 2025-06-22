import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("SOMETHING CONNECTED");

        socket.on("join-call", (path) => {
            if (!connections[path]) {
                connections[path] = [];
            }

            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            // Notify all users in the room about the new user
            connections[path].forEach(socketId => {
                io.to(socketId).emit("user-joined", socket.id, connections[path]);
            });

            // Send previous messages to the newly joined user
            if (messages[path]) {
                for (let msg of messages[path]) {
                    io.to(socket.id).emit("chat-message", msg.data, msg.sender, msg["socket-id-sender"]);
                }
            }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {
            // Find the room this user is in
            const [roomKey, found] = Object.entries(connections).reduce(
                ([room, isFound], [key, users]) => {
                    if (!isFound && users.includes(socket.id)) {
                        return [key, true];
                    }
                    return [room, isFound];
                },
                ['', false]
            );

            if (found) {
                if (!messages[roomKey]) {
                    messages[roomKey] = [];
                }

                messages[roomKey].push({
                    sender,
                    data,
                    "socket-id-sender": socket.id
                });

                // Broadcast to all users in the room
                connections[roomKey].forEach(userSocketId => {
                    io.to(userSocketId).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        socket.on("disconnect", () => {
            const disconnectTime = new Date();
            const diffTime = Math.abs(timeOnline[socket.id] - disconnectTime);

            // Remove user from connections
            for (const [roomKey, roomUsers] of Object.entries(connections)) {
                const index = roomUsers.indexOf(socket.id);
                if (index !== -1) {
                    // Notify remaining users
                    roomUsers.forEach(id => {
                        if (id !== socket.id) {
                            io.to(id).emit('user-left', socket.id);
                        }
                    });

                    // Remove the disconnected user
                    roomUsers.splice(index, 1);

                    // If room is empty, clean up connections and messages
                    if (roomUsers.length === 0) {
                        delete connections[roomKey];
                        delete messages[roomKey];
                        console.log(`Room ${roomKey} cleaned up.`);
                    }

                    break; // Stop loop after handling
                }
            }

            // Clean up user's session data
            delete timeOnline[socket.id];
        });
    });

    return io;
};
