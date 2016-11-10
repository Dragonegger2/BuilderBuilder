import React, { Component } from 'react';

/**
 * Component that represents a C# builder setting a specific value on a request API object.   
 *  
 * builderName: This is where some fancy stuff is going to happen.
 */
class NestedBuilderComponent extends Component {
    render() {
        var builder =
        `         
        public ${this.props.builderName} Add${this.props.paramName}(${this.props.paramType} parameterValue)
        {
            RequestObject.${this.props.paramName} = parameterValue;
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

export default NestedBuilderComponent