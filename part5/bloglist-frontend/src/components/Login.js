import React from "react"
import Notification from "./Notification"
import PropTypes from "prop-types"

const Login = ({ handleLogin,
            errorMessage,
            handleUsernameChange,
            handlePasswordChange,
            username,
            password }) => {

    return (
        <form onSubmit={handleLogin}>
            <h3> Log in to application </h3>

            <Notification message={errorMessage} />

            <div>
                Username
                <input type="text" value={username} name="Username" id="username"
                        onChange={({ target }) => handleUsernameChange(target.value) } />
            </div>
            <div>
                Password
                <input type="password" value={password} name="Password" id="password"
                        onChange={({ target }) => handlePasswordChange(target.value) } />
            </div>
            <button id="login-btn">Log In</button>
        </form>
    )
}

Login.propTypes = {
            handleLogin: PropTypes.func.isRequired,
            handleUsernameChange: PropTypes.func.isRequired,
            handlePasswordChange: PropTypes.func.isRequired,
            username: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired
}

export default Login