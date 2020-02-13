import React from "react";
import { HashRouter as BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./components/authentication/signup";

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Switch>
                    <Route exact path='/auth/signup' component={Signup} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
