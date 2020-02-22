import React, { Component } from "react";
import NavigationBar from "../partials/navigation";
import HeadBalloon from "../partials/head";
import Says from "../partials/says";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadFeeds } from "../../redux/actions/post-comment";

class Home extends Component {
    componentDidMount() {
        this.props.loadFeeds();
    }
    render() {
        const { user } = this.props;
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    <HeadBalloon isAuthUser={true} user={user} />
                    <Says says={[]} />
                    <Link to={`/profile/${"5e4c67cdfdd6b20ea318d765"}`}>Test</Link>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    return {
        user: authentication.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadFeeds: () => {
            return dispatch(loadFeeds());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
