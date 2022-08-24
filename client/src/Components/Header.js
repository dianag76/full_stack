import React from "react";
import { Link } from "react-router-dom";
//handles Header link change depending if User is signed in or not.

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticateUser;

    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
            {authUser ? (
              <ul className="header--signedin">
                <li>{`Welcome, ${authUser.firstName} ${authUser.lastName}!`}</li>
                <li>
                  <Link to="/signout">Sign Out</Link>
                </li>
              </ul>
            ) : (
              <ul className="header--signedout">
                <li>
                  <Link className="signup" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className="signin" to="/signin">
                    Sign In
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    );
  }
}
