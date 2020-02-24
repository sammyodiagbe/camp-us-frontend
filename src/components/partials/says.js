import React from "react";
import { FavoriteOutlined, ChatBubbleOutlineOutlined } from "@material-ui/icons";
import { connect } from "react-redux";
import { likeOrUnlike } from "../../redux/actions/post-comment";
import likeSound from "../../assets/audio/get-outta-here.ogg";
import { Link } from "react-router-dom";

const Says = (props) => {
    const { says, likeOrUnlike } = props;
    console.log(props);
    const renderSays = says ? (
        says.map((say, index) => {
            const { content, said_by, _id, likes, comments } = say;
            const { firstname, lastname, nickname, _id: id_of_user } = said_by;
            return (
                <div className='camp-a-say' key={index}>
                    <div className='camp-say-top'>
                        <div className='camp-say-talker'></div>
                        <div className='camp-say-talker-details'>
                            <h4>
                                <Link
                                    to={`/profile/${id_of_user}`}>{`${firstname} ${lastname}`}</Link>
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
                                            console.log("done");
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
                            <button>
                                {comments.length}{" "}
                                <ChatBubbleOutlineOutlined
                                    fontSize='small'
                                    className='camp-react'
                                />
                            </button>
                        </div>
                    </div>
                </div>
            );
        })
    ) : (
        <div>hello</div>
    );
    return <div className='camp-render-says'>{renderSays}</div>;
};
const mapDispatchToProps = (dispatch) => {
    return {
        likeOrUnlike: (postid) => {
            return dispatch(likeOrUnlike(postid));
        }
    };
};
export default connect(null, mapDispatchToProps)(Says);
