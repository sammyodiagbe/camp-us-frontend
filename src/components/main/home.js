import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <Link to='/'>Home</Link>|
                <Link to='/profile/5e44d5eac7dd6f1074c2f68d'>Other Profile</Link>|
                <Link to='/profile/5e4470954e44f5240befcdd6'>Auth profile</Link>
            </div>
        );
    }
}

export default Home;
