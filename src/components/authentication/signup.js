import React, { Component } from "react";
import validateSignupFields from "../../helpers/validateSignupFields";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: {
                firstname: "",
                lastname: "",
                email: "",
                nickname: "",
                password: "",
                cpassword: ""
            }
        };
    }

    handleInputChange = (e) => {
        const { id, value } = e.target;
        const input = { ...this.state.input, [id]: value };

        this.setState({
            input
        });
    };

    createUserAccount = (e) => {
        e.preventDefault();
        const fields = this.state.input;
        let checkError = validateSignupFields(fields);
        console.log(checkError);
    };

    render() {
        const { input } = this.state;
        const { firstname, lastname, email, password, cpassword, nickname } = input;
        return (
            <div>
                <form onSubmit={this.createUserAccount} noValidate>
                    <div>
                        <label htmlFor='firstname'>
                            Firstname
                            <input
                                type='text'
                                id='firstname'
                                placeholder='Firstname'
                                onChange={this.handleInputChange}
                                value={firstname}
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor='lastname'>
                            Lastname
                            <input
                                type='text'
                                id='lastname'
                                placeholder='Latname'
                                onChange={this.handleInputChange}
                                value={lastname}
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor='email'>
                            Email
                            <input
                                type='email'
                                id='email'
                                placeholder='Email'
                                onChange={this.handleInputChange}
                                value={email}
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor='nickname'>
                            Nickname
                            <input
                                type='text'
                                id='nickname'
                                placeholder='Nickname'
                                onChange={this.handleInputChange}
                                value={nickname}
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor='cpassword'>
                            Password
                            <input
                                type='password'
                                id='password'
                                placeholder='Password'
                                onChange={this.handleInputChange}
                                value={password}
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor='cpassword'>
                            Confirm Password
                            <input
                                type='password'
                                id='cpassword'
                                placeholder='Confirm Password'
                                onChange={this.handleInputChange}
                                value={cpassword}
                            />
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
