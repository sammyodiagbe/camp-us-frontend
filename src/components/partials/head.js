import React, { Component } from "react";

class HeadBalloon extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className='camp-balloon-head'>
                <div className='camp-head-top'>
                    <div className='camp-user-avatar'></div>
                    <div className='camp-user-details'>
                        <h2>Odiagbe Samson</h2>
                        <p>@samsonosaro</p>
                    </div>
                </div>
                <div className='camp-head-bottom'>
                    <textarea placeholder='Have a say'></textarea>
                </div>
            </div>
        );
    }
}

export default HeadBalloon;
