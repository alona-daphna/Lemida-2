export const formatChat = (chat) => {
    const idToUsername = {};
    chat.members.forEach(member => {
        idToUsername[member._id] = member.username;
    });
    const lastMessage = chat.message_history.slice(-1)[0];
    const { sender, text, createdAt } = lastMessage ? lastMessage : ["", "", ""];
    const username = idToUsername[sender];

    const date = lastMessage ? new Date(lastMessage.createdAt) : "";
    const hour = date ? date.getHours().toString().padStart(2, "0") : "";
    const minute = date ? date.getMinutes().toString().padStart(2, "0") : "";
    return {
        "id": chat._id,
        "name": chat.name,
        "lastMsg": lastMessage ? lastMessage.text : "",
        "senderName": username,
        "time": date ? `${hour}:${minute}` : "",
        // To change to real images
        "picture": chat.name==="Ido" ? "https://shorturl.at/dfpzV" : "",
        "createdAt": chat.createdAt,
        "lastMsgDate": date
    };
}