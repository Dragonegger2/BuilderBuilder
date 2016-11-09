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
        public ${this.props.builderName} Add${this.props.classNameMinusTheWordBuilder}()
        {
            RequestObject.${this.props.paramName} = parameterValue;
            return new ${this.props.builderName}(ServiceURL,Options, Logger);
        }
    `;

        return (  
            <div>
                ${builder}
            </div>
        );
    }
}

export default BuilderComponent