import React, { Component } from "react";
import { connect } from "react-redux";
import { haveASay } from "../../redux/actions/post-comment";

class HeadBalloon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postText: ""
        };
    }
    handleInputChange = (e) => {
        const { value } = e.target;
        this.setState({
            postText: value
        });
    };
    postSomething = (e) => {
        e.preventDefault();
        const { postText } = this.state;
        if (postText === "") return;
        // make post to the backend;
        this.props.postSay(postText);
    };
    render() {
        const { postText } = this.state;
        const { page, isAuthUser } = this.props;
        return (
            <div className='camp-balloon-head'>
                <div className='camp-head-top'>
                    <div className='camp-user-avatar'></div>
                    <div className='camp-user-details'>
                        <h2>Odiagbe Samson</h2>
                        <p>@samsonosaro</p>
                    </div>
                </div>
                {isAuthUser && (
                    <div className='camp-head-bottom'>
                        <form noValidate onSubmit={this.postSomething}>
                            <textarea
                                placeholder='Have a say'
                                value={postText}
                                onChange={this.handleInputChange}></textarea>
                            <button>Make post</button>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        postSay: (content) => {
            return dispatch(haveASay(content));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeadBalloon);
