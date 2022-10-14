import React from 'react';

class AddToDoForm extends React.Component {
  get #isTaskNameEmpty() {
    return this.state.taskName == null || this.state.taskName.trim().length === 0;
  }

  constructor(props) {
    super(props);

    this.state = {
      taskName: ''
    }
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
      this.setState({
        taskName: ''
      });
    }
  }

  #onTaskNameChanged(e) {
    this.setState({
      taskName: e.target.value
    });
  }

  render() {
    return (<div className='navbar-fixed hide-on-small-only'>
      <nav className='white'>
        <div className='nav-wrapper'>
          <form onKeyDown={this.#onAddToDo.bind(this)}>
            <div className='input-field'>
              <input
                id='create-input'
                type='search'
                value={this.state.taskName}
                placeholder='Task name'
                autocomplete='off'
                onChange={this.#onTaskNameChanged.bind(this)} />
              <label className='label-icon' for='create-input'>
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
    </div>)
  }
}

export default AddToDoForm;
