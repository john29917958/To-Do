import React from "react";

class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            isDone: false
        };
    }

    #beginEdit() {
        this.setState({
            isEditing: true,
        });
    }

    #onInputValChanged(e) {
        this.setState({
            text: e.target.value
        });
    }

    #applyChange() {
        this.setState({
            isEditing: false
        });

        this.props.onTitleChange(this.props.id, this.state.text);
    }

    #cancelChange() {
        this.setState({
            isEditing: false,
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

        return (
            <div className="row">
                <div className="col s9">
                    <div className="input-field inline">
                        <p>
                            <label>
                                <input type={"checkbox"} checked={this.props.isDone} onChange={this.#done.bind(this)} />
                                <span></span>
                            </label>
                        </p>
                    </div>                
                    <div className="input-field inline">
                        <input
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
                </div>
                <div className="col s1">
                    <div className="input-field inline">
                        <button className="btn-flat waves-effect"
                            onClick={function () { self.props.onDelete(self.props.id); }}>
                            <i className="material-icons">
                                delete
                            </i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default ToDo;
