import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='navbar-fixed'>
                <nav>
                    <div className="nav-wrapper blue">
                        <div className='container'>
                            <a className="brand-logo center"
                                style={{ userSelect: 'none', cursor: "pointer" }}
                                onClick={function () { window.location.reload(); }}>
                                <i className="material-icons">
                                    done_all
                                </i>
                            </a>
                            <ul className="right hide-on-med-and-down"></ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;