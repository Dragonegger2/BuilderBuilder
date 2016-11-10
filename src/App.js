import React, { Component } from 'react';
import './App.css';
import BaseClassComponent from "./BaseClassComponent";
import NestedClassComponent from "./NestedClassComponent";

class App extends Component {
 
  constructor(props) {
    super(props);
    
    this.state = {
      pastedText: `
      using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using ServiceStack;
using EP.PAL.Meerkat.Implementation.V1.Schemas.Common;

namespace EP.PAL.Meerkat.Implementation.V1.Schemas.Search.MultiSearch
{

	[DataContract]
	public class SearchRequest
	{
		/// <summary>
		/// The criteria for performing the search
		/// </summary>
		[DataMember(IsRequired = true)]
		public Criteria SearchCriteria { get; set; }

		/// <summary>
		/// The criteria for retrieving search results
		/// </summary>
		[DataMember(IsRequired = true)]
		public List<RetrievalCriteria> RetrievalCriteria { get; set; }

		#region Transaction Logging information

		/// <summary>
		/// For transaction logging, found here: http://confluence/display/Knowledge/Search+-+113, i.e. Basic, Citation, EdsApi.
		/// </summary>
		[DataMember(IsRequired = true)]
		public UserContext UserContext { get; set; }

		/// <summary>
		/// The user profile
		/// </summary>
		public UserProfile UserProfile { get; set; }

		/// <summary>
		/// The user machine id
		/// </summary>
		public Guid UserMachineId { get; set; }

		/// <summary>
		/// The user number
		/// </summary>
		public int UserNumber { get; set; }

		/// <summary>
		/// The named user
		/// </summary>
		public string NamedUser { get; set; }

		#endregion

		/// <summary>
		/// Flag to identify the Search Type (True - Multi Search and False - Standard Search)
		/// </summary>
		public bool IsMultiSearch { get; set; }
	}

	/// <summary>
	/// The criteria for performing the search
	/// </summary>

	[DataContract]
	public class Criteria
	{
		/// <summary>
		/// One or more search queries.
		/// </summary>
		[DataMember(IsRequired = true)]
		public List<Query> Queries { get; set; }

		/// <summary>
		/// A list of the databases to search using the short name (i.e. buh, dmp, aph...)
		/// </summary>
		[DataMember]
		public List<string> SelectedDatabases { get; set; }

		/// <summary>
		/// The search mode (e.g. "Bool", "All", "Any", or "Smart")
		/// </summary>
		[DataMember]
		public SearchMode SearchMode { get; set; }

		/// <summary>
		/// The results sort mode (e.g. "Relevance")
		/// </summary>
		[DataMember]
		public SortType Sort { get; set; }

		/// <summary>
		/// The filters to apply to the search (e.g. "FT" = "Y")
		/// </summary>
		[DataMember]
		public List<Filter> Filters { get; set; }
	}

	[DataContract]
	public class Query
	{
		/// <summary>
		/// The search term.
		/// </summary>
		[DataMember(IsRequired = true)]
		public string Term { get; set; }

		/// <summary>
		/// The search tag.
		/// </summary>
		[DataMember]
		public string FieldCode { get; set; }

		/// <summary>
		/// Operator
		/// </summary>
		[DataMember]
		public string BooleanOperator { get; set; }
	}

	/// <summary>
	/// The search mode, which flags single or multi search
	/// </summary>
	[DataContract]
	public enum SearchMode
	{
		/// <summary>
		/// Boolean/Phrase
		/// </summary>
		[EnumMember]
		Bool = 0,

		/// <summary>
		/// Find all of my search terms 
		/// </summary>
		[EnumMember]
		All = 1,

		/// <summary>
		/// Find any of my search terms 
		/// </summary>
		[EnumMember]
		Any = 2,

		/// <summary>
		/// Smart Text/Relevancy
		/// </summary>
		[EnumMember]
		Smart = 3
	}

	/// <summary>
	/// The results sort mode
	/// </summary>
	[DataContract]
	public enum SortType
	{
		/// <summary>
		/// Sort by relevance
		/// </summary>
		[EnumMember]
		Relevance = 0
	}

	/// <summary>
	/// A search filter
	/// </summary>

	[DataContract]
	public class Filter
	{
		/// <summary>
		/// The filter Id (e.g. "FT", "DT", "LX9", etc.)
		/// </summary>
		[DataMember(IsRequired = true)]
		public string Id { get; set; }

		/// <summary>
		/// The filter values.
		/// </summary>
		[DataMember(IsRequired = true)]
		public List<string> Values { get; set; }

		/// <summary>
		/// The type of filter ("Limiter", "QuickLink", etc.)
		/// </summary>
		[DataMember(IsRequired = true)]
		public FilterType Type { get; set; }
	}

	/// <summary>
	/// The filter type
	/// </summary>
	[DataContract]
	public enum FilterType
	{
		/// <summary>
		/// Limiter filter type
		/// </summary>
		[EnumMember]
		Limiter = 0,
		/// <summary>
		/// Content Type (a.k.a Quick Link) filter
		/// </summary>
		[EnumMember]
		QuickLink = 1
	}

	/// <summary>
	/// The criteria for retrieving search results
	/// </summary>
	[DataContract]
	public class RetrievalCriteria
	{
		/// <summary>
		/// ResultSetId.  This will be null on the first request and can be populated for each subsequent request for the same search.
		/// This property is used to retrieve a cached result set.
		/// </summary>
		[DataMember]
		public string Id { get; set; }

		//TODO
		//[DataMember]
		//[Required]
		//public string Type { get; set; }

		/// <summary>
		/// The index of the first result
		/// </summary>
		[DataMember(IsRequired = true)]
		public int StartResultCount { get; set; }

		/// <summary>
		/// Number of records to return for display
		/// </summary>
		[DataMember(IsRequired = true)]
		public int ResultCount { get; set; }

		/// <summary>
		/// Parser to use when transforming the search response (e.g., TemplateRecordInfo)
		/// </summary>
		[DataMember]
		public string ParserId { get; set; }

		/// <summary>
		/// Gets or sets the transform to used when transforming the search response (e.g., recordinfo-search).
		/// </summary>
		[DataMember(IsRequired = true)]
		public string TransformId { get; set; }

		/// <summary>
		/// Gets or sets the version of the transform to use when transforming the search response (e.g., v1).
		/// </summary>
		[DataMember(IsRequired = true)]
		public string Version { get; set; }

		/// <summary>
		/// Gets or sets the vertical content type to transform (e.g., Main).
		/// </summary>
		[DataMember]
		public string VerticalType { get; set; }
	}

	/// <summary>
	/// The context in which the user performed this search
	/// </summary>
	[DataContract]
	public sealed class UserContext
	{
		/// <summary>
		/// The location in the application where the user performed this search.
		/// </summary>
		[DataMember(IsRequired = true)]
		public string SearchedFrom { get; set; }

		/// <summary>
		/// The action which triggered the search request.
		/// </summary>
		[DataMember(IsRequired = true)]
		public string Action { get; set; }
	}
}
`,
      builtCode: "",
      errorMessage: "MeerkatErrorMessage",
      createTokenMethod: "authentication",
      apiRequestBaseName: "APIRequestBase"
    };

    this.changePastedText = this.changePastedText.bind(this);
    this.changeErrorMessage = this.changeErrorMessage.bind(this);
    this.changeCreateTokenMethod = this.changeCreateTokenMethod.bind(this);
    
    this.cleanString = this.cleanString.bind(this);
    this.changeAPIRequestBaseName = this.changeAPIRequestBaseName.bind(this);
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

  changeAPIRequestBaseName(event) {
    this.setState({apiRequestBaseName : event.target.value});
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
        "fieldName": splitProperties.pop(),
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
    
    return scrubbed;
  }

  createBuilder() {
    var jData = this.createJSONObject();
    var classes = [];
    
    //First class is always a base class.
    jData[0].isBaseClass = true;
    var classNames = []

    //Get all of the class names.
    jData.forEach((element) => {
      classNames.push(element.className);
			element.parentBuilder = [];
    });

    //iterate through all the classes
    jData.forEach((element) => {
      //iterage through all of the fields on the classes.
      element.fields.forEach((field) => {
        classNames.forEach((name) => {
          if(field.type.trim().indexOf(name.trim()) !== -1) {
            field.isNested = true;
						jData.forEach((addParentBuilderToElement) => {
							if(addParentBuilderToElement.className === name.trim()) 
							{
								if(field.type.toLowerCase().indexOf("list") !== -1) {
									addParentBuilderToElement.parentBuilder.push({ "name":element.className, "isList": false});
								}
								else {
									addParentBuilderToElement.parentBuilder.push({ "name":element.className, "isList": true});
								}
							}
						});
          }
        });
      });
    });

    jData.forEach((classToBeBuilt) => {
      if(classToBeBuilt.isBaseClass === true) {
        classes.push(
					<BaseClassComponent 
          	class={classToBeBuilt}
          	createErrorTokenMethod={this.state.createTokenMethod}
          	errorMessageName={this.state.errorMessage}
          	APIRequestBaseName={this.state.apiRequestBaseName}
          	key={classToBeBuilt.className}
        />);
      }
      else {
        classes.push(
          <NestedClassComponent 
            class={classToBeBuilt}
            key={classToBeBuilt.className}
            parentClass={jData[0].className}
          />
        );
      }
    });
		console.log(JSON.stringify(jData));
    this.setState({builtCode: classes})
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
          <div className='label'>API Request Base Name:</div>
            <input
              type='textbox'
              value={this.state.apiRequestBaseName}
              onChange={this.changeAPIRequestBaseName}
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