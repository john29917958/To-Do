import './App.css';
import React from 'react';
import Navbar from './Navbar.js';
import ToDo from './ToDo.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDos: []
    };
  }

  #addToDo() {
    let date = new Date(),
      id = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() +
        date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() +
        date.getMilliseconds().toString(),
      toDos = this.state.toDos;

    toDos.push({
      id: id,
      text: ''
    });

    this.setState({
      toDos: toDos
    });
  }

  #handleToDoChange(id, text) {
    let toDos = this.state.toDos;
    let toDo = toDos.filter(function (t) {
      return t.id === id;
    })[0];

    toDo.text = text;

    this.setState({
      toDos: toDos
    });
  }

  render() {
    let self = this;

    return (
      <div>
        <Navbar />
        <br />
        <div className='container'>
          <button className='btn-floating btn-large waves-effect waves-light blue' onClick={this.#addToDo.bind(this)}>
            <i className='material-icons'>
              add
            </i>
          </button>
          <div>
            {
              this.state.toDos.map(function (toDo) {
                return <ToDo key={toDo.id} id={toDo.id} text={toDo.text} onTitleChange={self.#handleToDoChange.bind(self)} />
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
