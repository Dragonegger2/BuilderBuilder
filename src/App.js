import React, { Component } from 'react';
import './App.css';

class App extends Component {
  changeContent = (e) => {
    this.setState({inputContent: e.target.value})
  } 

  constructor() {
    super();
    
    this.state = {
      responseObjectName: ""
    };

    this.changeResponseObjectName = this.changeResponseObjectName.bind(this);
    this.changeResponseName = this.changeResponseName.bind(this);
    this.changePastedText = this.changePastedText.bind(this);
  }

  changeResponseObjectName(event) {
    this.setState({responseObjectName : event.target.value});

    console.log(this.state);
  }

  changeResponseName(event) {
    this.setState({responseName : event.target.value});
    console.log(this.state);
    
  }

  changePastedText(event) {
    this.setState({pastedText : event.target.value});
    console.log(this.state);
    
  }

  render() {
    return (
      <div className='builder'>
        <div className='fieldContainer'>
          <div className='label'>Response Object Name:</div>
            <input
              type='textbox'
              value={this.state.responseObjName}
              onChange={this.changeResponseObjectName}
              />
        </div>
        <div className='fieldContainer'>
          <div className='label'>Response Name:</div>
            <input
              type='textbox'
              value={this.state.responseName}
              onChange={this.changeResponseName}
              />
        </div>
        <textarea
          className='fieldContainer'
          value={this.state.pastedText}
          rows='10'
          onChange={this.changePastedText}
          placeholder='Paste the data from JSONUtils.org here and generate simple class builders.'>
        </textarea>
        <input
          className='fieldContainer'
          onChange={this.handleChange}
          type='button'
          value='Generate builder class'
          />
      </div>
    );
  }
}

export default App;
