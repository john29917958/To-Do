import React from "react";

class ToDo extends React.Component {
    #input = null;

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text
        };
    }

    componentDidMount() {
        if (this.props.isEditing) {
            this.#input.focus();
        }
    }

    #onInputValChanged(e) {
        this.setState({
            text: e.target.value
        });
    }

    #beginEdit() {
        this.props.onEditingChange(this.props.id, true);
    }

    #applyChange() {
        this.props.onTitleChange(this.props.id, this.state.text);
        this.props.onEditingChange(this.props.id, false);
    }

    #cancelChange() {
        this.props.onEditingChange(this.props.id, false);

        this.setState({
            text: this.props.text
        });
    }

    #done(e) {
        this.props.onDoneChange(this.props.id, e.target.checked);
    }

    #handleKeyDown(e) {
        if (e.keyCode === 13) { // Handle enter key event.            
            this.#applyChange();
        } else if (e.keyCode === 27) { // Handle ESC key event.
            this.#cancelChange();
        }
    }

    render() {
        let self = this;

        if (this.#input !== null) {
            if (this.props.isEditing) {
                this.#input.focus();
            } else {
                this.#input.blur();
            }
        }

        return (
            <div className="row valign-wrapper">
                <div className="col s1">
                    <p>
                        <label>
                            <input type={"checkbox"} checked={this.props.isDone} onChange={this.#done.bind(this)} />
                            <span></span>
                        </label>
                    </p>
                </div>
                <div className="col s10">
                    <input
                        ref={
                            function (input) {
                                if (input != null) {
                                    self.#input = input;
                                }
                            }
                        }
                        id={this.props.id}
                        type={"text"}
                        value={this.state.text}
                        placeholder={"What to do..."}
                        disabled={this.props.isDone}
                        readOnly={this.props.isDone}
                        onChange={this.#onInputValChanged.bind(this)}
                        onFocus={this.#beginEdit.bind(this)}
                        onBlur={this.#applyChange.bind(this)}
                        onKeyDown={this.#handleKeyDown.bind(this)} />
                </div>
                <div className="col s1">
                    <button className="btn-flat waves-effect"
                        onClick={function () { self.props.onDelete(self.props.id); }}>
                        <i className="material-icons">
                            delete
                        </i>
                    </button>
                </div>
            </div>
        );
    }

}

export default ToDo;
