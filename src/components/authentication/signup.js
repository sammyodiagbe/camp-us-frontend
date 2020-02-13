import React, { Component } from "react";

class Signup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form>
                    <div>
                        <label for='firstname'>
                            Firstname
                            <input type='text' id='firstname' placeholder='Firstname' />
                        </label>
                    </div>

                    <div>
                        <label for='lastname'>
                            Lastname
                            <input type='text' id='lastname' placeholder='Latname' />
                        </label>
                    </div>

                    <div>
                        <label for='email'>
                            Email
                            <input type='email' id='email' placeholder='Email' />
                        </label>
                    </div>

                    <div>
                        <label for='nickname'>
                            Nickname
                            <input type='text' id='nickname' placeholder='Firstname' />
                        </label>
                    </div>

                    <div>
                        <label for='firstname'>
                            Password
                            <input type='password' id='password' placeholder='Password' />
                        </label>
                    </div>

                    <div>
                        <label for='firstname'>
                            Confirm Password
                            <input type='password' id='cpassword' placeholder='Confirm Password' />
                        </label>
                    </div>
                    <div>
                        <button type='submit'>Create Account</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;
