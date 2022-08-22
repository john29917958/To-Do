import './App.css';
import React from 'react';
import Navbar from './Navbar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: true
    };
  }

  toggleState() {
    this.setState({
      isToggled: !this.state.isToggled
    });
  }

  render() {
    return (
      <div>
        <Navbar/>
        <br/>
        <div className='container'>
          <button className='btn waves-effect waves-light' onClick={this.toggleState.bind(this)}>
            {"Toggle the " + this.state.isToggled + " state!"}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
