import React, { Component } from 'react';

/**
 * Component that represents a C# builder setting a specific value on a request API object.   
 *  
 */
class NestedBuilderComponent extends Component {
    render() {
        var builder =
        `         
        //Nested Builder
        public ${this.props.className}Builder Add${this.props.fieldName}(${this.props.fieldType} parameterValue)
        {
            return new ${this.props.className}Builder(ServiceURL, Options, Logger);
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