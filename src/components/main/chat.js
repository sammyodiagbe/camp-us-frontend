import React, { Component } from "react";
import NavigationBar from "../partials/navigation";
import "../../styles/chat/chat.css";
import { SendOutlined } from "@material-ui/icons";
import { fetchConversation, sendMessage } from "../../redux/actions/chats";
import { connect } from "react-redux";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatfriendid: "",
            body: ""
        };
    }

    componentDidMount() {
        const { friendid } = this.props.match.params;
        this.setState(
            {
                chatfriendid: friendid
            },
            () => {
                // get the conversation for this user
                const { chatfriendid } = this.state;
                this.props.fetchConversation(chatfriendid);
            }
        );
    }

    handleInputChange = (e) => {
        const { value } = e.target;
        this.setState({
            body: value
        });
    };

    sendMessage = (e) => {
        e.preventDefault();
        const { body, chatfriendid } = this.state;
        if (body === "" || body.trimLeft() === "" || body.trimRight() === "") return;
        this.props.sendMessage({ body, friendid: chatfriendid });
    };

    render() {
        const { body } = this.state;
        const { authuser } = this.props;
        const { _id } = authuser;
        const chatm = this.props.chatConversation.conversation ? (
            this.props.chatConversation.conversation.messages.map((message, index) => {
                const { body, sender } = message;
                return (
                    <div
                        className={`camp-chat-balloon ${
                            sender === _id ? "camp-balloon-authuser" : "camp-balloon-friend"
                        }`}
                        key={index}>
                        <div className='camp-balloon'>
                            <p>{body}</p>
                        </div>
                    </div>
                );
            })
        ) : (
            <p>No message oo</p>
        );
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    <div className='camp-active-chat-bubble'>
                        <div className='camp-bubble-head'>
                            <div className='camp-bubble-head-user'></div>
                            <div className='camp-bubble-head-user-details'>
                                <h4>Sammy daemon</h4>
                                <p>@sammy</p>
                            </div>
                        </div>
                        <div className='camp-bubble-body'>{chatm}</div>
                        <div className='camp-bubble-leg'>
                            <form noValidate onSubmit={this.sendMessage}>
                                <textarea
                                    placeholder='Your message...'
                                    value={body}
                                    onChange={this.handleInputChange}></textarea>
                                <button>
                                    <SendOutlined fontSize='default' />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { conversation, authentication } = state;
    return {
        chatConversation: conversation.activeBubble,
        authuser: authentication.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchConversation: (friendid) => {
            return dispatch(fetchConversation(friendid));
        },
        sendMessage: (data) => {
            return dispatch(sendMessage(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
