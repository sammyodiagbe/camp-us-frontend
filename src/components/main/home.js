import React, { Component } from "react";
import NavigationBar from "../partials/navigation";
import HeadBalloon from "../partials/head";
import Says from "../partials/says";

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    <HeadBalloon isAuthUser={true} />
                    <Says says={[]} />
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
