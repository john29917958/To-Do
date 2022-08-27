import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper blue">
                    <div className='container'>
                        <a className="brand-logo center"
                            style={{ userSelect: 'none', cursor: "pointer" }}
                            onClick={function () { window.location.reload(); }}>
                            <i className="material-icons">
                                format_list_bulleted
                            </i>
                        </a>
                        <ul className="right hide-on-med-and-down"></ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;