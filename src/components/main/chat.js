import React, { Component } from "react";
import NavigationBar from "../partials/navigation";
import "../../styles/chat/chat.css";
import { SendOutlined } from "@material-ui/icons";
import { fetchConversation, sendMessage, appendMessage } from "../../redux/actions/chats";
import { connect } from "react-redux";
import io from "socket.io-client";
import { baseUrl } from "../../helpers/api-end-points";
import { Redirect } from "react-router-dom";
import Placeholder from "../partials/placeholder";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: "",
            chat_nsp: null,
            typing: false,
            friend: {},
            friendid: ""
        };
    }

    componentDidMount() {
        const { friendid } = this.props.match.params;
        const { _id } = this.props.authuser;
        //const { friend } = this.state;
        this.setState(
            {
                friendid
            },
            () => {
                // get the conversation for this user
                this.props.fetchConversation(friendid);
            }
        );
        const chat_nsp = io.connect(`${baseUrl}/chat`);
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
                this.setState({
                    typing: false
                });
            });

            chat_nsp.on("new_message", (data) => {
                const { friend } = this.state;
                this.props.appendMessage({ ...data, sender: friend._id });
            });

            // chat_nsp.on('disconnect', () => {
            //     chat_nsp.d
            // })
        });
    }

    componentDidUpdate() {
        const { isgettingconversation } = this.props;
        if (!isgettingconversation) {
            this.chatBodyRef.scrollTop = this.chatBodyRef.scrollHeight;
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        const { chatConversation, authuser } = nextProps;

        if (typeof chatConversation.conversation !== "undefined") {
            const { conversation } = chatConversation;
            const { user1, user2 } = conversation;
            return {
                friend: authuser._id === user1._id ? user2 : user1
            };
        } else {
            return {};
        }
    }

    handleInputChange = (e) => {
        const { value } = e.target;
        const { chat_nsp, friend } = this.state;
        if (value !== "" && value.length > 0) {
            chat_nsp.emit("typing", { friend: friend._id });
        } else {
            chat_nsp.emit("done_typing", { friend: friend._id });
        }
        this.setState({
            body: value
        });
    };

    sendMessage = (e) => {
        e.preventDefault();
        const { body, friend, chat_nsp } = this.state;
        const { authuser } = this.props;
        if (body === "" || body.trimLeft() === "" || body.trimRight() === "") return;
        const data = { body, friendid: friend._id };
        const newmessage = { ...data, time: Date.now() };
        chat_nsp.emit("new_message", newmessage);
        this.setState(
            {
                body: "",
                typing: false
            },
            () => {
                chat_nsp.emit("done_typing", { friend: friend._id });
                this.chatBodyRef.scrollTop = this.chatBodyRef.scrollHeight;
            }
        );
        this.props.appendMessage({ ...newmessage, sender: authuser._id });
        this.props.sendMessage(data);
    };

    componentWillUnmount() {
        const { chat_nsp } = this.state;
        if (chat_nsp) {
            chat_nsp.disconnect();
            this.setState({
                chat_nsp: null
            });
        }
    }
    render() {
        const { body, typing, friend } = this.state;
        const { authuser, chatConversation, gettingconversation } = this.props;
        console.log("getting data, ", gettingconversation);
        const { _id } = authuser;
        const { conversation } = chatConversation;
        if (!authuser) {
            return <Redirect to='/auth/login' />;
        }
        const chatm = conversation ? (
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
                            {gettingconversation ? (
                                <React.Fragment>
                                    <div className='camp-bubble-head-user'></div>
                                    <div className='camp-chat-placeholder'>
                                        <div className='camp-name'></div>
                                        <div className='camp-username'></div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <div className='camp-bubble-head-user'></div>
                                    <div className='camp-bubble-head-user-details'>
                                        <h4>{friend.name}</h4>
                                        {typing ? (
                                            <p style={{ color: "green", fontWeight: "bolder" }}>
                                                typing...
                                            </p>
                                        ) : (
                                            <p>@{friend.nickname}</p>
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className='camp-bubble-body' ref={(ref) => (this.chatBodyRef = ref)}>
                            {gettingconversation ? (
                                <React.Fragment>
                                    <div className='left'>
                                        <div></div>
                                    </div>
                                    <div className='right'>
                                        <div></div>
                                    </div>
                                    <div className='left'>
                                        <div></div>
                                    </div>
                                    <div className='right'>
                                        <div></div>
                                    </div>
                                    <div className='right'>
                                        <div></div>
                                    </div>
                                    <div className='right'>
                                        <div></div>
                                    </div>
                                    <div className='left'>
                                        <div></div>
                                    </div>
                                    <div className='right'>
                                        <div></div>
                                    </div>
                                    <div className='right'>
                                        <div></div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                chatm
                            )}
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
    const { conversation, authentication, interactions } = state;
    return {
        chatConversation: conversation.activeBubble,
        authuser: authentication.user,
        gettingconversation: interactions.isgettingconversation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchConversation: (conversationid, friendid) => {
            return dispatch(fetchConversation(conversationid, friendid));
        },
        sendMessage: (data) => {
            return dispatch(sendMessage(data));
        },
        appendMessage: (data) => {
            return dispatch(appendMessage(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
