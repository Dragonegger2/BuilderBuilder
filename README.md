#API PAL Builder v1.0.1

##What is PAL?
PAL stands for **P**roduct **A**bstraction **L**ayer.

##What is PAL used for? 
It is used to represent an API project/endpoint in a way that testers and developers can understand. 

##When to use this project?
This project is meant to siplify, and standardized the creation of the builders that are associated with API projects.

Currently, this project will *not* handle nested builders. Future versions of this project will be handle this use case, as we often make use of nested builders.

##How do I use this project?
This project is designed to take the schemas from an API project and generate a builder class for that schema.

###The project can be found [here](https://dragonegger2.github.io/BuilderBuilder/)

###Example Schema
```cs

using System.Runtime.Serialization;

namespace //PROJECT_NAMESPACE
{

    [DataContract]
    public class AuthenticationRequest
    {
        [DataMember(Name = "UserAuthType")]
        public AuthTypesEnum UserAuthType { get; set; }
        [DataMember(Name = "UserId")]
        public string UserId { get; set; }
        [DataMember(Name = "Password")]
        public string Password { get; set; }
    }



    public enum AuthTypesEnum
    {
        UID = 0,
        Personal = 1
    }

}
```