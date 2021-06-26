import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signup from "./containers/Signup";
import Signin from "./containers/Signin";
import Home from "./containers/Home";
import { PrivateRoute } from "./components/HOC/PrivateRoute";
import { isUserLoggedIn } from "./actions";
import { useSelector, useDispatch } from "react-redux";
import Products from "./containers/Products";
import Orders from "./containers/Orders";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
