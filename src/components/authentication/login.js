import React, { Component } from "react";
import { connect } from "react-redux";
import { logUserIn } from "../../redux/actions/auth-actions";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: {
                username: "",
                password: ""
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

    login = (e) => {
        e.preventDefault();
        const { input: data } = this.state;
        this.props.login(data);
    };
    render() {
        const { input } = this.state;
        const { username, password } = input;
        return (
            <div>
                <form onSubmit={this.login} noValidate>
                    <div>
                        <label htmlFor='username'>
                            <Input
                                type='text'
                                placeholder='username or email'
                                id='username'
                                value={username}
                                onChange={this.handleInputChange}></Input>
                        </label>
                    </div>
                    <div>
                        <label htmlFor='password'>
                            <Input
                                type='password'
                                placeholder='Password'
                                id='password'
                                value={password}
                                onChange={this.handleInputChange}></Input>
                        </label>
                    </div>
                    <div>
                        <Button type='submit' variant='contained' color='primary'>
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            return dispatch(logUserIn(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
