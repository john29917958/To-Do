'use strict';

const e = React.createElement;

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { s: true };
    }

    render() {
        let self = this;

        if (this.state.s) {
            return e(
                'button',
                {
                    onClick: function () {
                        self.setState({
                            s: false
                        });
                    }
                },
                'Toggle to ' + this.state.s
            );
        } else {
            return e(
                'button',
                {
                    onClick: function (e) {
                        self.setState({
                            s: true
                        });
                    }
                },
                'Toggle to ' + this.state.s
            );
        }
    }
}

const domContainer = document.querySelector('#todo-container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(ToDo));
