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
    this.addToDoModalInput = React.createRef();
  }

  componentDidMount() {
    this.#addToDoModal = window.M.Modal.init(this.addToDoModal.current, {
      onOpenEnd: function () {
        this.addToDoModalInput.current.focus();
      }.bind(this),
      onCloseEnd: function () {
        this.#clearTaskName();
      }.bind(this)
    });
  }

  #handleAddToDo(e) {
    if (e.type === 'keydown' && e.key) {
      if (e.key !== 'Enter' || e.repeat) {
        return;
      }

      e.preventDefault();
    }

    this.props.addToDo(this.state.taskName.trim());
    if (!this.#isTaskNameEmpty) { // Task name is valid. To-do is added.
      this.#clearTaskName();
    }
  }

  #handleAddToDoOnSmallDevices(e) {
    this.#handleAddToDo(e);
    if (!this.#isTaskNameEmpty) { // Task name is valid. To-do is added.
      this.#addToDoModal.close();
    } else {  // Task name is invalid. To-do is not added.
      this.addToDoModalInput.current.focus();
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
                  <input placeholder='Task name' type='text' value={this.state.taskName}
                    autoComplete='off' onChange={this.#onTaskNameChanged.bind(this)}
                    ref={this.addToDoModalInput} />
                </div>
              </form>
            </div>
          </div>
          <div className='modal-footer'>
            <button href='#!' className='waves-effect waves-light btn blue' disabled={this.#isTaskNameEmpty}
              onClick={this.#handleAddToDoOnSmallDevices.bind(this)}>
              Add
            </button>
            {"\u00a0"}
            <button href='#!' className='modal-close waves-effect btn-flat' onClick={this.#clearTaskName.bind(this)}>
              Cancel
            </button>
          </div>
        </div>
        <div className='navbar-fixed hide-on-small-only'>
          <nav className='white'>
            <div className='nav-wrapper'>
              <form onKeyDown={this.#handleAddToDo.bind(this)}>
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
                    onClick={this.#handleAddToDo.bind(this)}
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
