import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/login" activeClassName="active">Login</Link>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
        </nav>
    );
};

Header.propTypes = {
};

export default Header;