import React from "react";
import { Link } from "react-router-dom";

const Conversation = ({ authuser, conversations }) => {
    console.log(conversations);
    const renderConversations = conversations.map((conversation, index) => {
        const { messages, user1, user2 } = conversation;
        const recentMessage =
            messages[messages.length - 1].body.length > 30
                ? `${messages[messages.length - 1].body.slice(0, 30)}..............`
                : messages[messages.length - 1].body;
        const notAuthUserId = user1 === authuser._id ? user2 : user1;
        console.log(messages);
        return (
            <Link to={`/chat/${notAuthUserId}`} className='camp-a-card' key={index}>
                <div className='camp-a-card-left'></div>
                <div className='camp-a-card-right'>
                    <h4>{notAuthUserId}</h4>
                    <p>{recentMessage}</p>
                </div>
            </Link>
        );
    });

    return <React.Fragment>{renderConversations}</React.Fragment>;
};

export default Conversation;
