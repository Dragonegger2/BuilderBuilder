import React, { Component } from 'react';
import BuilderComponent from './BuilderComponent';
import NestedBuilderComponent from './NestedBuilderComponent';


/**
 * Component that represents a C# class created automatically by this project.
 * 
 * className:   Comes from the schema name. Used as the primary naming schema.
 *              From this we create the general schema name which is used as the class name of the builder.
 *
 * parentClass: Parent class that this class holds a reference to.   
 * fields: Array of JSON objects that are used to generate a bunch of builder components. 
 */
class NestedClassComponent extends Component {
    
    render() {
        console.log(this.props);
        var header =  `        
    using System;
    using EP.PAL.BASE;
    using EP.PAL.BASE.WebService.INF;
    namespace //TODO: Namespace must be set.
    {
      //TODO: All classes require an explanation of the purpose of the request builder.
      public class ${this.props.className}Builder
      {
        // Fields to hold data
        private readonly object _RefClass;
        internal ${this.props.className}Request RequestObject = new ${this.props.className}Request();

        /// <summary>
        /// constructor to the class
        /// </summary>
        /// <param name="referenceClass">Class object of the parent builder.</param>
        public ${this.props.className}Buidler(object referenceClass)
        {
            _RefClass = referenceClass;
        }
    `
        var footer = 
`
        //TODO: Write comments.
        public ${this.props.parentClass}Builder BackTo${this.props.parentClass}Builder()
        {
            var aRefClass = _RefClass as ${this.props.parentClass};
            if (aRefClass.RequestObject.${this.props.className} == null)
                aRefClass.RequestObject.${this.props.className} = RequestObject;
            return aRefClass;
        }
    }
}
`

        var builders = [];
        this.props.fields.forEach((element) => {
            builders.push(
                <BuilderComponent
                     className={this.props.className}
                     fieldName={element.fieldName}
                     fieldType={element.type}
                />
            );
        });

        return (          
            <div>
                {header}
                {builders}
                {footer}
            </div>
        );
    }
}

export default NestedClassComponent