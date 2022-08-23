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
            isEditing: true
        };
    }

    render() {
        return (
            <div className="row">
                <div className="input-field col m5 s12">
                    <input id={this.#id} type={"text"} value={this.state.text} disabled={!this.state.isEditing}></input>
                    <label htmlFor={this.#id}>Task Name</label>
                </div>
            </div>
        );
    }
}

export default ToDo;
