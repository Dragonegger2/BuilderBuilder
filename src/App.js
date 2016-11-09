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
    
    this.returnBuilderObject = this.returnBuilderObject.bind(this);
    this.createBuilder = this.createBuilder.bind(this);
    
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

  createBuilder() {
    //pastedText gets passed to the 'parser'
    var splitValues = this.state.pastedText.split('\n');
    var relevantData = [];
    var className = "";
    var parentBuilderName = "";

    splitValues.forEach((element) => {
      if(element.includes("public class")) {
        className = element.trim().split(' ')[2];
        parentBuilderName = `${className}Builder`;
      }

      else if(element.includes("public") && element.includes("{")) {
        relevantData.push(element.trim());
      }
    });

    var builtCodeBody = "";
    //Rebuild relevantData with relevant builder text.
    relevantData.forEach((element, index) => {
      var lexicons = element.split(' ');
      var type = lexicons[1];
      var name = lexicons[2];

      builtCodeBody += this.returnBuilderObject(parentBuilderName, name, type) + "\n";
    });


//TODO: Need to add a component for the MeerkatAPIRequestBase
    var builtCodeHeader = `
    using System;
    using EP.PAL.BASE;
    using EP.PAL.BASE.WebService.INF;
    namespace //TODO: Namespace must be set.
    {
      //TODO: All classes require an explanation of the purpose of the request builder.
      public class ${parentBuilderName} : MeerkatAPIRequestBase<${parentBuilderName}>
      {

        // Fields to hold data
        private const string CreateTokenMethod = "${this.state.createTokenMethod}";
        internal ${className}Request RequestObject = new ${className}Request();

        /// <summary>
        /// constructor to the class
        /// </summary>
        /// <param name="ServiceURL">ServiceURL</param>
        /// <param name="Options">MessageOptions</param>
        /// <param name="Logger">IPALLogging</param>
        internal ${parentBuilderName}(string ServiceURL, MessageOptions Options, IPALLogging Logger)
            : base(Options, Logger)
        {
            EndPoint = URLHelper.CombineUri(ServiceURL, CreateTokenMethod);
        }

    `

    var builtCodeFooter = `
        /// <summary>
        /// Send the request to Meerkat         
        /// </summary>
        /// <returns>Returns an APIResponse message with the APIResponse inside it.</returns>
        public APIResponse<${className}Response> Send()
        {
            LogObj.WriteInfo("Performing Request");

            return RestClient.SendRequestSerializeDeserialize<${className}Response, ${this.state.errorMessage}>(this, true);
        }

        /// <summary>
        /// Request Data Object
        /// </summary>
        protected override object RequestDataObject
        {
            get { return RequestObject; }
            set
            {
                throw new NotImplementedException();
            }
        }
    }

}

`
    var compiledCode = builtCodeHeader + builtCodeBody + builtCodeFooter;
     this.setState({ builtCode: compiledCode});

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
      </div>
    );
  }
}

export default App;
