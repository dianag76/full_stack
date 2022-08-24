import React, { Component } from "react";
import Data from "./Data";

const Context = React.createContext();
export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticateUser: null,
    };
  }

  render() {
    const { authenticateUser } = this.state;
    const value = {
      authenticateUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    const unhashed = password;
    if (user !== null) {
      user.password = unhashed;
      this.setState(() => {
        return {
          authenticateUser: user,
        };
      });
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticateUser: null });
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
