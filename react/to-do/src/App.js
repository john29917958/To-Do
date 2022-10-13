import './App.css';
import React from 'react';
import Navbar from './Navbar.js';
import ToDo from './ToDo.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    let toDoJson = localStorage.getItem('toDos');
    let toDos = [];
    if (toDoJson) {
      toDos = JSON.parse(toDoJson);
    }

    this.state = {
      toDos: toDos
    };
  }

  #addToDo(title) {
    if (title == null || title.length === 0) {
      console.log('title is empty');
      window.M.toast({
        'html': `<p>
        <i class="material-icons left">info_outline</i>
        <span class="right">Please input the task name</span>        
        </p>` });
      return;
    }

    title = title.trim();
    let date = new Date(),
      id = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() +
        date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() +
        date.getMilliseconds().toString(),
      toDos = this.state.toDos;

    toDos.unshift({
      id: id,
      text: title,
      isEditing: false,
      isDone: false
    });

    this.setState({
      toDos: toDos,
      toDoInputVal: ''
    });

    localStorage.setItem('toDos', JSON.stringify(toDos));
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

    localStorage.setItem('toDos', JSON.stringify(toDos));
  }

  #handleToDoEditing(id, isEditing) {
    let toDos = this.state.toDos;
    let toDo = toDos.filter(function (t) {
      return t.id === id;
    })[0];

    toDo.isEditing = isEditing;

    this.setState({
      toDos: toDos
    });

    localStorage.setItem('toDos', JSON.stringify(toDos));
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

    localStorage.setItem('toDos', JSON.stringify(toDos));
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

    localStorage.setItem('toDos', JSON.stringify(toDos));
  }

  #onToDoInputValChanged(e) {
    this.setState({
      toDoInputVal: e.target.value
    });
  }

  render() {
    let self = this;

    return (
      <div>
        <Navbar />
        <div className='navbar-fixed'>
          <nav className='white'>
            <div className='nav-wrapper'>
              <form onKeyDown={function (e) {
                console.log(e);
                if (e.key === 'Enter') {
                  e.preventDefault();

                  if (!e.repeat) {
                    self.#addToDo(self.state.toDoInputVal);
                  }
                }
              }}>
                <div className='input-field'>
                  <input
                    id='create-input'
                    type='search'
                    value={this.state.toDoInputVal}
                    placeholder='Task name'
                    autocomplete='off'
                    onChange={this.#onToDoInputValChanged.bind(this)} />
                  <label className='label-icon' for='create-input'>
                    <i className='material-icons'>
                      edit
                    </i>
                  </label>
                  <button
                    className='btn waves-effect waves-light blue white-text'
                    disabled={this.state.toDoInputVal == null || this.state.toDoInputVal.trim().length === 0}
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '10px'
                    }}
                    onClick={this.#addToDo.bind(this, this.state.toDoInputVal)}
                    type='button'
                  >Add</button>
                </div>
              </form>
            </div>
          </nav>
        </div>
        <br />
        <div className={'container ' + (this.state.toDos.length === 0 ? 'center-align' : '')}>
          {
            this.state.toDos.map(function (toDo) {
              return <ToDo
                key={toDo.id}
                id={toDo.id}
                text={toDo.text}
                isEditing={toDo.isEditing}
                isDone={toDo.isDone}
                onTitleChange={self.#handleToDoChange.bind(self)}
                onEditingChange={self.#handleToDoEditing.bind(self)}
                onDoneChange={self.#handleToDoDone.bind(self)}
                onDelete={self.#handleToDoDeletion.bind(self)} />
            })
          }
          <div className='row'>
            <div className='col s12'>
              {
                this.state.toDos.length === 0 ?
                  (<div>
                    <h4 className='blue-text hide-on-small-only'>
                      <i className='material-icons large'>done_all</i>
                      <br />
                      Wishing you a great day
                    </h4>
                    <h6 className='blue-text hide-on-med-and-up'>
                      <i className='material-icons medium'>done_all</i>
                      <br />
                      Wishing you a great day
                    </h6>
                  </div>) : ''
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
