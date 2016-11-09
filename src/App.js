import React, { Component } from 'react';
import './App.css';

class App extends Component {
 
  constructor(props) {
    super(props);
    
    this.state = {
      responseObjectName: "",
      pastedText: "",
      builtCode: "",
      errorMessage: "",
      createTokenMethod: ""
    };

    this.changePastedText = this.changePastedText.bind(this);
    this.changeErrorMessage = this.changeErrorMessage.bind(this);
    this.changeCreateTokenMethod = this.changeCreateTokenMethod.bind(this);
    
    this.cleanString = this.cleanString.bind(this);
    this.returnBuilderObject = this.returnBuilderObject.bind(this);
    this.createBuilder = this.createBuilder.bind(this);
    this.createClassObject = this.createClassObject.bind(this);
    this.createJSONObject = this.createJSONObject.bind(this);
  }

  returnBuilderObject(parentBuilderName, paramName, paramType) {
    return `
        //TODO: All methods in a builder must have an explanation of the parameters being added.
        public ${parentBuilderName} Add${paramName}(${paramType} parameterValue)
        {
            RequestObject.${paramName} = parameterValue;
            return this;
        }
    `
  }
  
  changeCreateTokenMethod(event) {
    this.setState({createTokenMethod : event.target.value});
  }

  changeErrorMessage(event) {
    this.setState({errorMessage : event.target.value});
  }

  changePastedText(event) {
    this.setState({pastedText : event.target.value});
  }

  cleanString() {
    //Remove all get and set states.
    var cleanedString = this.state.pastedText.replace(RegExp(/{.+get.+}/g), "");

    //Remove all compiler comments.
    cleanedString = cleanedString.replace(RegExp(/\/\/\/.+\n/g), "");

    //Remove all comments
    cleanedString = cleanedString.replace(RegExp(/\/\/.+/g), "");

    //Remove all using statements..
    cleanedString = cleanedString.replace(RegExp(/using.+/g), "");

    //Drop tags.
    cleanedString = cleanedString.replace(RegExp(/\[.+/g), "");

    //Remove any regions
    cleanedString = cleanedString.replace(RegExp(/#region.+/g), "");
    cleanedString = cleanedString.replace(RegExp(/#endregion.?/g), "");

    cleanedString = cleanedString.slice(cleanedString.indexOf('{')+1, cleanedString.lastIndexOf('}')-1);    

    return cleanedString
  }
  
  createClassObject(classStringData) {
    var lexicons = classStringData.split('\n');
    var lexiconsWithoutWhiteSpace = [];

    lexicons.forEach((element, index) => {
      if(element.indexOf("public") !== -1) {
        lexiconsWithoutWhiteSpace.push(element.trim());
      }
    });
    
    var classDefinitionSplit = lexiconsWithoutWhiteSpace.shift().split(' ');

    var classData = {
      "className": classDefinitionSplit.pop(),
      "fields": []
    };

    lexiconsWithoutWhiteSpace.forEach((element) => {
      var splitProperties = element.split(' ');
      var property = {
        "propertyName": splitProperties.pop(),
        "type": splitProperties.pop()
      };

      classData.fields.push(property);
    });

    return classData;
  }

  createJSONObject() {
    var cleanedString = this.cleanString()
    var splitClass = cleanedString.split(RegExp(/\}/));
    var scrubbed = [];
    splitClass.forEach((element) => {
      if(element.indexOf("public enum") === -1) {
        if(element !== null && element !== "") {
          scrubbed.push(this.createClassObject(element.replace(RegExp(/^\s+|\s+$/g), '')));
        }
      }
    });
    this.setState({builtCode: JSON.stringify(scrubbed)});
  }
  createBuilder() {
    this.createJSONObject();  
  }


  render() {
    return (
      <div className='builder'>     
        <h1 className='header'>API PAL Builder v1.0.1</h1>
        <div className='fieldContainer'>
          <div className='label'>Error Message Name:</div>
            <input
              type='textbox'
              value={this.state.errorMessage}
              onChange={this.changeErrorMessage}
              />
        </div>
        <div className='fieldContainer'>
          <div className='label'>Create Token Method:</div>
            <input
              type='textbox'
              value={this.state.createTokenMethod}
              onChange={this.changeCreateTokenMethod}
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
          onClick={this.createBuilder}
          type='button'
          value='Generate builder class'
          />

          <div>
            <pre>
              <code className="language-csharp">
                {this.state.builtCode}
              </code>
            </pre>
          </div>
          <footer>
            Look <a href="https://github.com/dragonegger2/builderbuilder">here</a> for documentation on this project. 
          </footer>
      </div>
    );
  }
}

export default App;
