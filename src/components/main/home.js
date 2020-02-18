import React, { Component } from "react";
import NavigationBar from "../partials/navigation";
import HeadBalloon from "../partials/head";
import Says from "../partials/says";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        const { user } = this.props;
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    <HeadBalloon isAuthUser={true} user={user} />
                    <Says says={[]} />
                    <Link to={`/profile/${"5e466a65ad1938229f8a3498"}`}>Test</Link>
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
export default connect(mapStateToProps, null)(Home);
