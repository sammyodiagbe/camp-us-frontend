import React, { Component } from "react";
import validateSignupFields from "../../helpers/validateSignupFields";
import { connect } from "react-redux";
import { createUserAccount } from "../../redux/actions/auth-actions";
import "../../styles/authentication/auth.css";
import { Link } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: {
                name: "",
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
        let error = false;
        // check if  fields contains an error

        for (const key in checkError) {
            if (checkError[key]) {
                error = true;
            }
        }
        if (error) {
            console.log(checkError);
            console.log("There are fields with errors");
        } else {
            let data = { ...fields };
            delete data.cpassword;
            this.props.createUserAccount(data);
        }
    };

    render() {
        const { input } = this.state;
        const { name, email, password, cpassword, nickname } = input;
        return (
            <div className='camp-auth-container'>
                <h1 className='camp-auth-title'>Create Account</h1>
                <form onSubmit={this.createUserAccount} noValidate>
                    <div>
                        <label htmlFor='name'>
                            Full Name
                            <input
                                type='text'
                                id='name'
                                placeholder='James Allen'
                                onChange={this.handleInputChange}
                                value={name}
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
                <p>
                    Already have an account <Link to='/auth/login'>Login</Link>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        createUserAccount: (data) => {
            return dispatch(createUserAccount(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
