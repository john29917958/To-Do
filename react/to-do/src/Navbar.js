import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper blue">
                    <a href="#" className="brand-logo">
                        <i className="material-icons right">
                            format_list_bulleted
                        </i>
                    </a>
                    <ul className="right hide-on-med-and-down"></ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;