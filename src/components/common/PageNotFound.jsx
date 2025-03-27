import React from "react";

function PageNotFound() {
  return (
    <div>
      <div>
        <h1>404</h1>
        <p>
          Oops! The page you are looking for could not be found.
        </p>
        <a
          href="/"
        >
          {" "}
          Go back to Home{" "}
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;
