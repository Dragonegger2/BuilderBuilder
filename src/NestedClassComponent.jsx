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

        this.generateHeader = this.generateHeader.bind(this);
        this.generateFooter = this.generateFooter.bind(this);

        this.backToNotList = this.backToNotList.bind(this);
        this.backToList = this.backToList.bind(this);
    }

    generateHeader() {
        return `        
    using System;
    using EP.PAL.BASE;
    using EP.PAL.BASE.WebService.INF;
    namespace //TODO: Namespace must be set.
    {
      //TODO: All classes require an explanation of the purpose of the request builder.
      public class ${this.props.class.className}Builder
      {
        // Fields to hold data
        private readonly object _RefClass;
        internal ${this.props.class.className}Request RequestObject = new ${this.props.class.className}Request();

        /// <summary>
        /// constructor to the class
        /// </summary>
        /// <param name="referenceClass">Class object of the parent builder.</param>
        public ${this.props.class.className}Buidler(object referenceClass)
        {
            _RefClass = referenceClass;
        }
    `

    }

    generateFooter() {
        return `
    }
}
`
    }

    /**
     * Returns the back to parent method that nested builders have. This is built from the list of parentBuilders
     */
    backToNotList(parentClass) {
        if (parentClass === null) {
            parentClass = this.props.parentClass;
        }
        return `
        //TODO: Write comments.
        public ${parentClass}Builder BackTo${parentClass}Builder()
        {
            var aRefClass = _RefClass as ${parentClass};
            if (aRefClass.RequestObject.${this.props.class.className} == null)
                aRefClass.RequestObject.${this.props.class.className} = RequestObject;
            return aRefClass;
        }
        `
    }

    backToList(parentClass) {
        if (parentClass === null) {
            parentClass = this.props.parentClass;
        }
        return `
        //TODO: Write comments.
        public ${parentClass}Builder BackTo${parentClass}Builder()
        {
            var aRefClass = _RefClass as ${parentClass};
            if (aRefClass.RequestObject.${this.props.class.className} == null) {
                aRefClass.RequestObject.${this.props.class.className} = new List<${this.props.class.className}Request>(); 
            }
            aRefClass.RequestObject.${this.props.class.className}.add(RequestObject);                            
            return aRefClass;
        }
        `
    }

    render() {
        var builders = [];
        var returnToParentMethods = [];
        if (this.props.class.parentBuilder.length === 0) {
            returnToParentMethods.push(this.backToNotList(null));
        }
        else {
            this.props.class.parentBuilder.forEach((parent) => {
                if(parent.isList) {
                    returnToParentMethods.push(this.backToList(parent.name));
                }
                else {
                    returnToParentMethods.push(this.backToNotList(parent.name));
                }
            });
        }

        
        var builders = [];
        this.props.class.fields.forEach((element) => {
            if (element.isNested === true) {
                builders.push(
                    <NestedBuilderComponent
                        className={element.fieldName}
                        fieldName={element.fieldName}
                        fieldType={element.type}
                        />
                );
            }
            else {
                builders.push(
                    <BuilderComponent
                        className={this.props.class.className}                    
                        fieldName={element.fieldName}
                        fieldType={element.type}
                        />
                );
            }

        });

        return (
            <div>
                {this.generateHeader()}
                {builders}
                {returnToParentMethods}
                {this.generateFooter()}
            </div>
        );
    }
}

export default NestedClassComponent