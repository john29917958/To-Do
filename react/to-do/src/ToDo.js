import React from "react";

class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            isEditing: false
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

    #handleKeyDown(e) {
        if (e.keyCode === 13) { // Handle enter key event.            
            this.#applyChange();
        } else if (e.keyCode === 27) { // Handle ESC key event.
            this.#cancelChange();
        }
    }

    render() {
        let self = this;
        let action = this.state.isEditing ? this.#applyChange.bind(this) : this.#beginEdit.bind(this);

        return (
            <div className="row">
                <div className="input-field col m5 s12">
                    <input id={this.props.id} type={"text"} value={this.state.text} placeholder={"What to do..."} disabled={!this.state.isEditing} readOnly={!this.state.isEditing} onChange={this.#onInputValChanged.bind(this)} onKeyDown={this.#handleKeyDown.bind(this)}></input>
                </div>
                <div className="col m7 s12" style={{ marginTop: "24px" }}>
                    <button className="btn waves-effect waves-light blue" style={{ marginRight: "5px" }} onClick={action}>
                        <i className="material-icons left">
                            {this.state.isEditing ? "check" : "create"}
                        </i>
                        {this.state.isEditing ? "Apply" : "Edit"}
                    </button>
                    <button className="btn-flat waves-effect" onClick={this.#cancelChange.bind(this)} disabled={!this.state.isEditing}>
                        <i className="material-icons left">
                            clear
                        </i>
                        Cancel
                    </button>
                    <button className="btn-flat waves-effect waves-red" onClick={function () { self.props.onDelete(self.props.id); }}>
                        <i className="material-icons left">
                            delete
                        </i>
                        Delete
                    </button>
                </div>
            </div>
        );
    }

}

export default ToDo;
