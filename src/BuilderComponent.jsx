import React, { Component } from 'react';

/**
 * Component that represents a C# builder setting a specific value on a request API object.   
 *  
 * builderName: This is where some fancy stuff is going to happen.
 */
class BuilderComponent extends Component {
    render() {
        var builder =
        `         
        public ${this.props.className}Builder Add${this.props.fieldName}(${this.props.fieldType} parameterValue)
        {
            RequestObject.${this.props.fieldName} = parameterValue;
            return this;
        }
    `;

        return (  
            <div>
                {builder}
            </div>
        );
    }
}

export default BuilderComponent