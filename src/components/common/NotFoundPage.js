import React from 'react';
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div>
      <h4>
        Huh? This isn't where I wanted to go! (404 Page Not Found)
      </h4>
      <img src={require("../../../assets/images/404_Confused.png")} alt="Um, I'm not sure how we got here..." />
      <Link to="/"> Go back to the main calendar page </Link>
    </div>
  );
}

export default NotFoundPage;