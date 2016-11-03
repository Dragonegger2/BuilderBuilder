import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="builder">
        <div>
          Response Object Name:<input
            type='textbox'
          />
        </div>
        <div>
        Response Name:<input
          type='textbox'
        />
        </div>
      </div>
    );
  }
}

export default App;
