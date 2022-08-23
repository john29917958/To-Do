import React from "react";

class ToDo extends React.Component {
    #id;

    constructor(props) {
        super(props);

        let date = new Date()
        this.#id = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() +
            date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() +
            date.getMilliseconds().toString();

        this.state = {
            text: this.props.text,
            cachedText: null,
            isEditing: false
        };
    }

    #beginEdit() {
        this.setState({
            isEditing: true,
            cachedText: this.state.text
        });
    }

    #onInputValChanged(e) {
        this.setState({
            text: e.target.value
        });
    }

    #applyChange(text) {
        this.setState({
            isEditing: false,
            cachedText: null
        });
    }

    render() {
        let action = this.state.isEditing ? this.#applyChange.bind(this) : this.#beginEdit.bind(this);

        return (
            <div className="row">
                <div className="input-field col m5 s12">
                    <input id={this.#id} type={"text"} value={this.state.text} disabled={!this.state.isEditing} readOnly={!this.state.isEditing} onChange={this.#onInputValChanged.bind(this)}></input>
                    <label htmlFor={this.#id}>Task Name</label>
                </div>
                <div className="col m7 s12" style={{ marginTop: "24px" }}>
                    <button className="btn waves-effect waves-light blue" style={{ marginRight: "5px" }} onClick={action}>
                        <i className="material-icons left">
                            {this.state.isEditing ? "check" : "create"}
                        </i>
                        {this.state.isEditing ? "Apply" : "Edit"}
                    </button>
                    <button className="btn-flat waves-effect">
                        <i className="material-icons left">
                            clear
                        </i>
                        Cancel
                    </button>
                    <button className="btn-flat waves-effect waves-red">
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
