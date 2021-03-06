import React, { Component } from "react";
import { FavoriteOutlined, ChatBubbleOutlineOutlined } from "@material-ui/icons";
import { connect } from "react-redux";
import { likeOrUnlike } from "../../redux/actions/post-comment";
import likeSound from "../../assets/audio/get-outta-here.ogg";
import { Link } from "react-router-dom";

class Says extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        const { says, likeOrUnlike, isposting, isgettingsays } = this.props;
        const renderSays = says ? (
            says.map((say, index) => {
                const { content, said_by, _id, likes, comments } = say;
                const { name, nickname, _id: id_of_user } = said_by;
                return (
                    <div className='camp-a-say' key={index}>
                        <div className='camp-say-top'>
                            <div className='camp-say-talker'></div>
                            <div className='camp-say-talker-details'>
                                <h4>
                                    <Link to={`/profile/${id_of_user}`}>{`${name}`}</Link>
                                </h4>
                                <p>{`@${nickname}`}</p>
                            </div>
                            <div className='camp-say-time'>
                                <p>just now</p>
                            </div>
                        </div>
                        <div className='camp-say-bottom'>
                            <div className='camp-say-say'>
                                <p>{content}</p>
                            </div>
                            <div className='camp-say-reaction'>
                                <button
                                    onClick={() => {
                                        let sound = new Audio(likeSound);
                                        sound
                                            .play()
                                            .then(() => {
                                                sound.remove();
                                            })
                                            .catch((err) => console.log(err));
                                        likeOrUnlike(_id);
                                    }}>
                                    {likes.length}
                                    <FavoriteOutlined
                                        fontSize='small'
                                        color='secondary'
                                        className='camp-react'
                                    />
                                </button>
                                <Link to={{ pathname: `/view-post/${_id}`, say }}>
                                    {comments.length}{" "}
                                    <ChatBubbleOutlineOutlined
                                        fontSize='small'
                                        className='camp-react'
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <div>hello</div>
        );
        return (
            <div className='camp-render-says'>
                {isposting && (
                    <div className='camp-say-placeholder'>
                        <div className='camp-say-like'>
                            <div className='left'></div>
                            <div className='right'>
                                <div className='name'></div>
                                <div className='nick'></div>
                            </div>
                        </div>
                        <div className='camp-say-text'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                )}
                {isgettingsays ? (
                    <React.Fragment>
                        <div className='camp-say-placeholder'>
                            <div className='camp-say-like'>
                                <div className='left'></div>
                                <div className='right'>
                                    <div className='name'></div>
                                    <div className='nick'></div>
                                </div>
                            </div>
                            <div className='camp-say-text'>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className='camp-say-placeholder'>
                            <div className='camp-say-like'>
                                <div className='left'></div>
                                <div className='right'>
                                    <div className='name'></div>
                                    <div className='nick'></div>
                                </div>
                            </div>
                            <div className='camp-say-text'>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className='camp-say-placeholder'>
                            <div className='camp-say-like'>
                                <div className='left'></div>
                                <div className='right'>
                                    <div className='name'></div>
                                    <div className='nick'></div>
                                </div>
                            </div>
                            <div className='camp-say-text'>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    renderSays
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { interactions } = state;
    return {
        isgettingsays: interactions.isgettingsays,
        isposting: interactions.isposting
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        likeOrUnlike: (postid) => {
            return dispatch(likeOrUnlike(postid));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Says);
