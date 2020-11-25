
import React from 'react';

function Error404() {
  return (
    <div className="wrapper">
      <div className="container p-0">
        <div className="row no-gutters">
          <div className="col-sm-12 text-center">
            <div className="iq-error position-relative mt-5">
              {/* <img
                src="/assets/intro/images/error/01.png"
                className="img-fluid iq-error-img"
                alt=""
              /> */}
              <h1 className="text-in-box">404</h1>
              <h2 className="mb-0">Oops! This Page is Not Found.</h2>
              <p>The requested page dose not exist.</p>
              <a className="btn btn-primary mt-3" href="/">
                <i className="ri-home-4-line"></i>Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;