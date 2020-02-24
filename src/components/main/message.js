import React, { useEffect } from "react";
import "../../styles/main/main.css";
import NavigationBar from "../partials/navigation";
import { connect } from "react-redux";
import { getConversations } from "../../redux/actions/conversations";

const Message = ({ messages, getConversations, conversations = [] }) => {
    // getConversations();

    // const renderConversations = conversations.map((conversation) => {
    //     const { user1, user2, messages } = conversation;
    //     return null;
    // });
    return (
        <React.Fragment>
            <NavigationBar />
            <div className='camp-main-content'>
                <p>Getting users conversation</p>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { conversation } = state;
    return {
        conversations: conversation.conversations
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getConversations: () => {
            return dispatch(getConversations());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
