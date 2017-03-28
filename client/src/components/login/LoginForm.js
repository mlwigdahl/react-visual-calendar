import React, { PropTypes } from 'react';

function LoginForm({onSubmit, onChange, validToLogin, name, error}) {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="usr">Username</label>
                    <input 
                        name="usr"
                        value={name}
                        type="text"
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input 
                        name="pwd"
                        type="password"
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <input
                    type="submit"
                    disabled={!validToLogin()}
                    value={"Submit"}
                    className="btn btn-primary"
                    onClick={onSubmit} />
                <p />
                <span className="app-error">{error}</span>
            </form>
        </div>
    );
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    validToLogin: PropTypes.func.isRequired,
    name: PropTypes.string,
    error: PropTypes.string,
};

export default LoginForm;