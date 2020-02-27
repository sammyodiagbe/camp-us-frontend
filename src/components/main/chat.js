import React, { Component } from "react";
import NavigationBar from "../partials/navigation";
import "../../styles/chat/chat.css";
import { SendOutlined } from "@material-ui/icons";
import { fetchConversation, sendMessage } from "../../redux/actions/chats";
import { connect } from "react-redux";
import io from "socket.io-client";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatfriendid: "",
            body: "",
            chat_nsp: null,
            typing: false
        };
    }

    componentDidMount() {
        const { friendid } = this.props.match.params;
        const { authuser } = this.props;
        const { _id } = authuser;
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
        const chat_nsp = io.connect("http://localhost:5000/chat");
        chat_nsp.on("connect", () => {
            this.setState({
                chat_nsp
            });
            chat_nsp.emit("user_connected", { user: _id });
            chat_nsp.on("typing", () => {
                this.setState({
                    typing: true
                });
            });

            chat_nsp.on("done_typing", () => {
                console.log("done typing");
                this.setState({
                    typing: false
                });
            });

            chat_nsp.on("new_message", (data) => {
                console.log(data);
            });
        });

        this.refs.chatBodyRef.scrollTop = this.refs.chatBodyRef.scrollHeight;
    }

    handleInputChange = (e) => {
        const { value } = e.target;
        const { chat_nsp, chatfriendid } = this.state;
        if (value !== "" && value.length > 0) {
            console.log("contains something");
            chat_nsp.emit("typing", { friend: chatfriendid });
        } else {
            console.log("does not contain anything");
            chat_nsp.emit("done_typing", { friend: chatfriendid });
        }
        this.setState({
            body: value
        });
    };

    sendMessage = (e) => {
        e.preventDefault();
        const { body, chatfriendid, chat_nsp } = this.state;
        if (body === "" || body.trimLeft() === "" || body.trimRight() === "") return;
        const data = { body, friendid: chatfriendid };
        const newmessage = { ...data, time: Date.now() };
        chat_nsp.emit("new_message", newmessage);
        this.setState(
            {
                body: ""
            },
            () => {
                this.chatBodyRef.scrollTop = this.chatBodyRef.scrollHeight;
            }
        );
        this.props.sendMessage(data);
    };

    render() {
        const { body, typing } = this.state;
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
                                {typing ? (
                                    <p style={{ color: "green" }}>typing...</p>
                                ) : (
                                    <p>@sammy</p>
                                )}
                            </div>
                        </div>
                        <div
                            className='camp-bubble-body'
                            ref={(ref) => (this.refs.chatBodyRef = ref)}>
                            {chatm}
                        </div>
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
