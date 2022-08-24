import './App.css';
import React from 'react';
import Navbar from './Navbar.js';
import ToDo from './ToDo.js';

//TODO: Solve issue of key combination triggered twice resulted by componentDidMount triggered twice.
let lastTimeStamp = 0;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDos: []
    };
  }

  componentDidMount() {
    let self = this;    

    window.addEventListener('keydown', function (e) {
      if (e.repeat) {
        return;
      }

      if (e.ctrlKey && e.code === 'KeyL') {
        if (e.timeStamp === lastTimeStamp) {
          return;
        }

        lastTimeStamp = e.timeStamp;

        e.preventDefault();
        self.#addToDo();
      }
    }, true);
  }

  #addToDo() {
    let date = new Date(),
      id = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() +
        date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() +
        date.getMilliseconds().toString(),
      toDos = this.state.toDos;

    toDos.push({
      id: id,
      text: '',
      isDone: false
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

  #handleToDoDone(id, isDone) {
    let toDos = this.state.toDos;
    let toDo = toDos.filter(function (t) {
      return t.id === id;
    })[0];

    toDo.isDone = isDone;

    this.setState({
      toDos: toDos
    });
  }

  #handleToDoDeletion(id) {
    let toDos = this.state.toDos;
    let toDo = toDos.filter(function (t, index) {
      return t.id === id;
    })[0];
    let index = toDos.indexOf(toDo);
    toDos.splice(index, 1);

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
          <br />
          <br />
          <div>
            {
              this.state.toDos.map(function (toDo) {
                return <ToDo
                  key={toDo.id}
                  id={toDo.id}
                  text={toDo.text}
                  isDone={toDo.isDone}
                  onTitleChange={self.#handleToDoChange.bind(self)}
                  onDoneChange={self.#handleToDoDone.bind(self)}
                  onDelete={self.#handleToDoDeletion.bind(self)} />
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
