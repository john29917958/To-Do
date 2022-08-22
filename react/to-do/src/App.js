import './App.css';
import React from 'react';

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
      <button onClick={this.toggleState.bind(this)}>
        {"Toggle the " + this.state.isToggled + " state!"}
      </button>
    );
  }
}

export default App;
