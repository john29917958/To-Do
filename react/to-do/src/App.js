import './App.css';
import React from 'react';
import Navbar from './Navbar.js';
import ToDo from './ToDo.js';

//TODO: Solve issue of key combination triggered twice resulted by componentDidMount triggered twice.
let lastTimeStamp = 0;

class App extends React.Component {
  #addBtn = null;

  constructor(props) {
    super(props);

    let toDoJson = localStorage.getItem('toDos');
    let toDos = [];
    if (toDoJson) {
      toDos = JSON.parse(toDoJson);
    }

    this.state = {
      toDos: toDos,
      addBtnState: 'default'
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
    let self = this,
      date = new Date(),
      id = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() +
        date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() +
        date.getMilliseconds().toString(),
      toDos = this.state.toDos;

    toDos.push({
      id: id,
      text: '',
      isEditing: true,
      isDone: false
    });

    this.setState({
      toDos: toDos
    });

    localStorage.setItem('toDos', JSON.stringify(toDos));

    setTimeout(function () {
      if (self.#addBtn.offsetTop + self.#addBtn.offsetHeight > window.pageYOffset + window.innerHeight) {
        self.#addBtn.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 50);
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

  #handleAddBtnMouseEvent(btnState) {
    this.setState({
      addBtnState: btnState
    });
  }

  render() {
    let self = this,
      addBtnClass;

    if (this.state.addBtnState === 'pressed') {
      addBtnClass = 'blue-text text-darken-3';
    } else if (this.state.addBtnState === 'hovered') {
      addBtnClass = 'light-blue-text';
    } else {
      addBtnClass = 'blue-text';
    }

    return (      
      <div>
        <Navbar />
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
                  (<button
                    type='button'
                    className='btn blue waves-effect waves-light'
                    onClick={self.#addToDo.bind(self)}>
                    <i className='material-icons left'>
                      add
                    </i>
                    Create your first to-do
                  </button>) :
                  (<a id="add-btn"
                    ref={function (button) {
                      if (button != null) {
                        self.#addBtn = button;
                      }
                    }}
                    className={addBtnClass}
                    onMouseOver={this.#handleAddBtnMouseEvent.bind(this, 'hovered')}
                    onMouseDown={this.#handleAddBtnMouseEvent.bind(this, 'pressed')}
                    onMouseLeave={this.#handleAddBtnMouseEvent.bind(this, 'default')}
                    onMouseUp={function (e) {
                      self.#handleAddBtnMouseEvent.call(self, 'hovered')
                      self.#addToDo.call(self);
                    }}
                    style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <i className='material-icons left'>
                      add
                    </i>
                  </a>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
