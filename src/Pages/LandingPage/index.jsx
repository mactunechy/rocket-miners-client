import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div>
            <nav
                className="navbar navbar-light navbar-color-on-scroll fixed-top navbar-expand-lg"
                color-on-scroll="100"
                id="sectionsNav"
            >
                <div className="container">
                    <div className="navbar-translate">
                        <a
                            style={{ fontWeight: 'bold', fontSize: '30px' }}
                            className="navbar-brand"
                            href="/"
                        >
                            Rocket - <span className="text-danger">Miners</span>
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                            <span className="navbar-toggler-icon"></span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="btn btn-danger" to="signup">
                                    Join Now
                                </Link>
                            </li>
                            <li className=" nav-item">
                                <Link
                                    to="login"
                                    className=" nav-link"
                                    data-toggle="dropdown"
                                >
                                    <i className="fa fa-sign-in" /> Login
                                </Link>
                            </li>
                            {/* <li className="nav-item">
            <a className="nav-link" rel="tooltip" title="" data-placement="bottom" href="https://twitter.com/CreativeTim" target="_blank" data-original-title="Follow us on Twitter" rel="nofollow">
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" rel="tooltip" title="" data-placement="bottom" href="https://www.facebook.com/CreativeTim" target="_blank" data-original-title="Like us on Facebook" rel="nofollow">
              <i className="fa fa-facebook-square"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" rel="tooltip" title="" data-placement="bottom" href="https://www.instagram.com/CreativeTimOfficial" target="_blank" data-original-title="Follow us on Instagram" rel="nofollow">
              <i className="fa fa-instagram"></i>
            </a>
          </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
            <div
                className="page-header header-filter"
                data-parallax="true"
                style={{
                    backgroundImage: "url('../assets/img/crypto-coins.jpg')",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="title">
                                Die Rich or Die Mining Bitcoin
                            </h1>
                            <h4>
                                We mine Bitcoin using rented servers from a
                                Bitmain rig fitted with 2,500 GPU and ASCI
                                miners, and proprietary C software designed to
                                simultaneously hash all known mining
                                algorithms,with a 10% return on investment after
                                10 working days
                            </h4>
                            <br />
                            <Link
                                to="/login"
                                className="btn btn-outline-danger btn-raised btn-lg"
                            >
                                <i className="fa fa-coins"></i> Login Now
                            </Link>
                            <Link
                                to="/signup"
                                className="btn btn-danger btn-raised btn-lg"
                            >
                                <i className="fa fa-coins"></i> Invest Today
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main main-raised">
                <div className="container">
                    <div className="section text-center">
                        <div className="row">
                            <div className="col-md-8 ml-auto mr-auto">
                                <h2 className="title">
                                    Let&apos;s talk product
                                </h2>
                                <h5 className="description">
                                    We mine Bitcoin using rented servers ( from
                                    the UK) from a Bitmain rig fitted with 2,500
                                    GPU and ASCI miners, and proprietary C
                                    software designed to simultaneously hash all
                                    known mining algorithms,with a 10% return on
                                    investment after 10 working days
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="section py-0 row justify-content-center align-items-center">
                        <div className="btn-group-lg col-md-6 text-center">
                            <Link
                                to="/login"
                                className="btn btn-lg btn-outline-danger btn-round"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="btn btn-lg btn-round btn-danger"
                            >
                                Join Now
                            </Link>
                        </div>
                    </div>

                    <div className="section section-contacts">
                        <div className="row">
                            <div className="col-md-8 ml-auto mr-auto">
                                <h2 className="text-center title">
                                    Work with us
                                </h2>
                                <h4 className="text-center description">
                                    For the past few months, we have been
                                    working with close friends mining the
                                    bitcoin for ourselves and we realised we
                                    could share this technology with others and
                                    we can profit as larger group
                                </h4>
                                <h4 className="text-center text-info">
                                    For more information on how we operate
                                    please contact us via the below contact
                                    details
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer footer-default">
                <div className="container">
                    <nav className="float-left">
                        <ul>
                            <li>
                                <a href="/">Rocket - Miners</a>
                            </li>
                            <li>
                                <a
                                    href="mailto:delan@i4ria.com"
                                    className="text-lowercase"
                                >
                                    Email Us on delan@i4ria.com
                                </a>
                            </li>
                            <li>
                                <a href="phone:+263712025161">
                                    Call /Whatsapp : +263712025161
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright float-right">
                        &copy;
                        <script>
                            document.write(new Date().getFullYear())
                        </script>
                        , made with <i className="material-icons">favorite</i>{' '}
                        by{' '}
                        <a
                            href="https://www.innovqod.co.zw"
                            rel="noreferrer"
                            target="_blank"
                        >
                            Innovqod
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
