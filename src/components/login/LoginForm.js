import React, { PropTypes } from 'react';

const LoginForm = ({onSubmit, validToLogin}) => {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="usr">Username</label>
                    <input 
                        name="usr"
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input 
                        name="pwd"
                        type="password"
                        className="form-control"
                    />
                </div>
                <input
                    type="submit"
                    disabled={!validToLogin()}
                    value={"Submit"}
                    className="btn btn-primary"
                    onClick={onSubmit} />                
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    validToLogin: PropTypes.func.isRequired
};

export default LoginForm;