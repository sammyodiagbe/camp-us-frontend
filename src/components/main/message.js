import React, { Component } from "react";
import "../../styles/main/main.css";
import NavigationBar from "../partials/navigation";
import { connect } from "react-redux";
import { getConversations } from "../../redux/actions/conversations";
import Conversation from "../partials/conversation";
import "../../styles/conversation/conversation.css";
import { Redirect } from "react-router-dom";
class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.getConversations();
    }

    render() {
        const { conversations, authuser } = this.props;
        if (!authuser) {
            return <Redirect to='/auth/login' />;
        }

        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    <Conversation conversations={conversations} authuser={authuser} />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { conversation, authentication } = state;

    return {
        conversations: conversation.conversations,
        authuser: authentication.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getConversations: () => {
            return dispatch(getConversations());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
