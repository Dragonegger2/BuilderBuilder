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
    constructor(props) {
        super(props);

        this.returnBackToParentBuilder = this.returnBackToParentBuilder.bind(this);
    }

    /**
     * Returns the back to parent method that nested builders have. This is built from the list of parentBuilders
     */
    returnBackToParentBuilder(parentClass) {
        if(parentClass === null) {
            parentClass = this.props.parentClass;
        }
        return `
        //TODO: Write comments.
        public ${parentClass}Builder BackTo${parentClass}Builder()
        {
            var aRefClass = _RefClass as ${parentClass};
            if (aRefClass.RequestObject.${this.props.className} == null)
                aRefClass.RequestObject.${this.props.className} = RequestObject;
            return aRefClass;
        }
        `
    }
    render() {
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
    }
}
`

        var builders = [];
        var returnToParentMethods = [];
        if(this.props.parentBuilders.length === 0) {
            returnToParentMethods.push(this.returnBackToParentBuilder(null));
        }
        else {
            this.props.parentBuilders.forEach((parent) => {
                returnToParentMethods.push(this.returnBackToParentBuilder(parent));
            });
        }
        
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