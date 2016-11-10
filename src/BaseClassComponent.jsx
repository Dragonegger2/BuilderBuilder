import React, { Component } from 'react';
import BuilderComponent from './BuilderComponent';
import NestedBuilderComponent from './NestedBuilderComponent';


/**
 * Component that represents a C# class created automatically by this project.
 * 
 * All methods hang off of the class prop: 
 * 
 * className:   Comes from the schema name. Used as the primary naming schema.
 *              From this we create the general schema name which is used as the class name of the builder.
 * 
 * createTokenMethod: Method name of the end point being hit.
 *  
 * errorMessageName:  Name of base error message object. 
 * 
 * APIRequesetBaseName: Name of the base API request.
 * 
 * fields: Array of JSON objects that are used to generate a bunch of builder components. 
 */
class BaseClassComponent extends Component {
    
    render() {
        var header =  `        
    using System;
    using EP.PAL.BASE;
    using EP.PAL.BASE.WebService.INF;
    namespace //TODO: Namespace must be set.
    {
      //TODO: All classes require an explanation of the purpose of the request builder.
      public class ${this.props.class.className}Builder : ${this.props.APIRequestBaseName}<${this.props.class.className}Builder>
      {
        // Fields to hold data
        private const string CreateTokenMethod = "${this.props.createTokenMethod}";
        internal ${this.props.class.className}Request RequestObject = new ${this.props.class.className}Request();
        /// <summary>
        /// constructor to the class
        /// </summary>
        /// <param name="ServiceURL">ServiceURL</param>
        /// <param name="Options">MessageOptions</param>
        /// <param name="Logger">IPALLogging</param>
        internal ${this.props.class.className}Buidler(string ServiceURL, MessageOptions Options, IPALLogging Logger)
            : base(Options, Logger)
        {
            EndPoint = URLHelper.CombineUri(ServiceURL, CreateTokenMethod);
        }
    `
        var footer = 
`
        /// <summary>
        /// Send the request to the defined service.        
        /// </summary>
        /// <returns>Returns an APIResponse message with the APIResponse inside it.</returns>
        public APIResponse<${this.props.class.className}Response> Send()
        {
            LogObj.WriteInfo("Performing Request");
            return RestClient.SendRequestSerializeDeserialize<${this.props.class.className}Response, ${this.props.errorMessageName}>(this, true);
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

        var builders = [];
        this.props.class.fields.forEach((element) => {
            if(element.isNested === true) {
                builders.push(
                    <NestedBuilderComponent
                        className={this.props.class.className}
                        fieldName={element.fieldName}
                        fieldType={element.type}
                    />
                );
            }
            else {
                builders.push(
                    <BuilderComponent
                        className={this.props.className}
                        fieldName={element.fieldName}
                        fieldType={element.type}
                    />
                );
            }
            
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

export default BaseClassComponent