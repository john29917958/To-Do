import React from 'react';

class AddToDoForm extends React.Component {
  get #isTaskNameEmpty() {
    return this.state.taskName == null || this.state.taskName.trim().length === 0;
  }

  #addToDoModal;

  constructor(props) {
    super(props);

    this.state = {
      taskName: ''
    }

    this.addToDoModal = React.createRef();
    //this.addToDoModalInput = React.createRef();
  }

  componentDidMount() {
    this.#addToDoModal = window.M.Modal.init(this.addToDoModal.current, {
      onOpenStart: function () {
        console.log('onOpenStart');
      },
      onOpenEnd: function () {
        //this.addToDoModalInput.current.focus();
      },
      onCloseStart: function () {
        console.log('onCloseStart');
      },
      onCloseEnd: function () {
        this.#clearTaskName();
      }.bind(this)
    });
  }

  #onAddToDo(e) {
    if (e.type === 'keydown' && e.key) {
      if (e.key !== 'Enter' || e.repeat) {
        return;
      }

      e.preventDefault();
    }

    this.props.addToDo(this.state.taskName.trim());
    if (!this.#isTaskNameEmpty) {
      this.#clearTaskName();
      this.#addToDoModal.close();
    }    
  }

  #onTaskNameChanged(e) {
    this.setState({
      taskName: e.target.value
    });
  }

  #clearTaskName() {
    this.setState({
      taskName: ''
    });
  }

  #openAddToDoModal() {
    this.#addToDoModal.open();
  }

  render() {
    return (
      <div>
        <div className='fixed-action-btn hide-on-med-and-up'>
          <button className='btn-floating btn-large waves-effect waves-light blue' onClick={this.#openAddToDoModal.bind(this)}>
            <i className='large material-icons'>
              add
            </i>
          </button>
        </div>
        <div className='modal bottom-sheet' id="add-to-do-modal" ref={this.addToDoModal}>
          <div className='modal-content'>
            <div className='row'>
              <form className='col s12'>
                <div className='input-field col s12'>
                  <input placeholder='Task name' type='text' value={this.state.taskName} autoComplete='off' onChange={this.#onTaskNameChanged.bind(this)} />
                </div>
              </form>
            </div>
          </div>
          <div className='modal-footer'>
            <a href='#!' className='waves-effect waves-blue btn blue' onClick={this.#onAddToDo.bind(this)}>
              Add
            </a>
            <a href='#!' className='modal-close waves-effect btn-flat' onClick={this.#clearTaskName.bind(this)}>
              Cancel
            </a>
          </div>
        </div>
        <div className='navbar-fixed hide-on-small-only'>
          <nav className='white'>
            <div className='nav-wrapper'>
              <form onKeyDown={this.#onAddToDo.bind(this)}>
                <div className='input-field'>
                  <input
                    id='create-input'
                    type='search'
                    value={this.state.taskName}
                    placeholder='Task name'
                    autoComplete='off'
                    onChange={this.#onTaskNameChanged.bind(this)} />
                  <label className='label-icon' htmlFor='create-input'>
                    <i className='material-icons'>
                      edit
                    </i>
                  </label>
                  <button
                    className='btn waves-effect waves-light blue white-text'
                    disabled={this.#isTaskNameEmpty}
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '10px'
                    }}
                    onClick={this.#onAddToDo.bind(this)}
                    type='button'
                  >Add</button>
                </div>
              </form>
            </div>
          </nav>
        </div>
      </div>);
  }
}

export default AddToDoForm;
